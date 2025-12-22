import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';
import { useState, useEffect } from 'react';
import { useRecepcion } from '@/hooks';
import { Dish } from '@/core/ticket/interfaces';
import { v4 } from 'uuid';

// Cremas disponibles
const CREMAS_DISPONIBLES = [
	{ key: 'mayonesa', name: 'Mayonesa' },
	{ key: 'ketchup', name: 'Ketchup' },
	{ key: 'mostaza', name: 'Mostaza' },
	{ key: 'golf', name: 'Golf' },
	{ key: 'aceituna', name: 'Aceituna' },
	{ key: 'tartara', name: 'Tártara' },
	{ key: 'ají', name: 'Ají' },
	{ key: 'rocoto', name: 'Rocoto' },
];

interface Props {
	isOpen: boolean;
	onClose: () => void;
	dish: Dish | null;
}

export const ModalExtrasItem = ({ isOpen, onClose, dish }: Props) => {
	const { ticket, setTicket } = useRecepcion();
	const [localRice, setLocalRice] = useState(false);
	const [localSalad, setLocalSalad] = useState(false);
	const [selectedCreams, setSelectedCreams] = useState<string[]>([]);

	// Sincronizar con el dish cuando se abre el modal
	useEffect(() => {
		if (dish) {
			setLocalRice(dish.rice);
			setLocalSalad(dish.salad);
			setSelectedCreams([]);
		}
	}, [dish]);

	const handleToggleCream = (creamKey: string) => {
		if (selectedCreams.includes(creamKey)) {
			setSelectedCreams(selectedCreams.filter((key) => key !== creamKey));
		} else {
			setSelectedCreams([...selectedCreams, creamKey]);
		}
	};

	const handleSaveExtras = () => {
		if (!dish) return;

		// Actualizar el dish específico en el array de dishes
		const updatedDishes = ticket.dishes.map((d) => {
			if (d.key === dish.key) {
				return {
					...d,
					rice: localRice,
					salad: localSalad,
				};
			}
			return d;
		});

		// Si hay cremas seleccionadas, agregarlas al ticket
		let updatedCreams = ticket.creams;
		if (selectedCreams.length > 0) {
			updatedCreams = [...ticket.creams, { key: v4(), creams: selectedCreams }];
		}

		setTicket({
			...ticket,
			dishes: updatedDishes,
			creams: updatedCreams,
		});

		onClose();
	};

	const handleCancel = () => {
		// Resetear a los valores originales
		if (dish) {
			setLocalRice(dish.rice);
			setLocalSalad(dish.salad);
			setSelectedCreams([]);
		}
		onClose();
	};

	if (!dish) return null;

	return (
		<Modal
			isOpen={isOpen}
			onClose={handleCancel}
			size='md'
			scrollBehavior='inside'
			classNames={{
				base: 'bg-neutral-900',
				header: 'border-b border-neutral-800',
				body: 'py-6',
				footer: 'border-t border-neutral-800',
			}}>
			<ModalContent>
				<ModalHeader>
					<div>
						<p className='text-lg font-semibold'>Editar Extras</p>
						<p className='text-sm text-neutral-400 font-normal capitalize'>{dish.dishFood}</p>
					</div>
				</ModalHeader>

				<ModalBody>
					<div>
						<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Acompañamientos</p>

						<div className='space-y-3'>
							{/* Toggle Arroz */}
							<button
								onClick={() => setLocalRice(!localRice)}
								className={`
									w-full p-4 rounded-xl transition-all duration-200
									flex items-center justify-between border-2
									${
										localRice
											? 'bg-indigo-600/20 border-indigo-600 text-indigo-400'
											: 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
									}
								`}>
								<span className='font-medium text-sm'>🍚 Arroz</span>
								<div
									className={`
										w-12 h-6 rounded-full relative transition-all duration-200
										${localRice ? 'bg-indigo-600' : 'bg-neutral-600'}
									`}>
									<div
										className={`
											absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
											${localRice ? 'right-1' : 'left-1'}
										`}
									/>
								</div>
							</button>

							{/* Toggle Ensalada */}
							<button
								onClick={() => setLocalSalad(!localSalad)}
								className={`
									w-full p-4 rounded-xl transition-all duration-200
									flex items-center justify-between border-2
									${
										localSalad
											? 'bg-green-600/20 border-green-600 text-green-400'
											: 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-600'
									}
								`}>
								<span className='font-medium text-sm'>🥗 Ensalada</span>
								<div
									className={`
										w-12 h-6 rounded-full relative transition-all duration-200
										${localSalad ? 'bg-green-600' : 'bg-neutral-600'}
									`}>
									<div
										className={`
											absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
											${localSalad ? 'right-1' : 'left-1'}
										`}
									/>
								</div>
							</button>
						</div>

						{/* Cremas y Salsas */}
						<div className='mt-6'>
							<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Cremas y Salsas</p>

							<div className='grid grid-cols-2 gap-2'>
								{CREMAS_DISPONIBLES.map((crema) => (
									<button
										key={crema.key}
										onClick={() => handleToggleCream(crema.key)}
										className={`
											p-3 rounded-lg text-xs font-medium transition-all duration-200 capitalize
											${
												selectedCreams.includes(crema.key)
													? 'bg-indigo-600 text-white border-2 border-indigo-600'
													: 'bg-neutral-800 text-neutral-400 border-2 border-neutral-700 hover:border-neutral-600'
											}
										`}>
										{crema.name}
									</button>
								))}
							</div>
						</div>
					</div>
				</ModalBody>

				<ModalFooter className='gap-2'>
					<Button
						className='flex-1'
						variant='flat'
						onPress={handleCancel}>
						Cancelar
					</Button>

					<Button
						className='flex-1 bg-green-600'
						onPress={handleSaveExtras}>
						Guardar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
