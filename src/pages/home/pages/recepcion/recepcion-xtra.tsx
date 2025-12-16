import { memo, useState } from 'react';
import { v4 } from 'uuid';
import { Button, Textarea, Input, useDisclosure } from '@heroui/react';
import { useRecepcion } from '@/hooks';
import { initialValueTicket } from '@/data';
import { IoAdd, IoCheckmarkCircle, IoCreate } from 'react-icons/io5';
import { Product } from '@/core/product/interfaces';
import { ProductSelectorModal } from '@/components/product-select-modal';

export const RecepcionXtra = memo(() => {
	const { handleSubmitTicket, setTicket, ticket } = useRecepcion();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [selectedDrink, setSelectedDrink] = useState<{ name: string; price: number } | null>(null);

	const handleSelectDrink = (product: Product) => {
		setSelectedDrink({
			name: product.name,
			price: product.price,
		});
	};

	const handleAddDrink = () => {
		if (!selectedDrink) return;

		setTicket({
			...ticket,
			drinks: [
				...ticket.drinks!,
				{
					_id: v4(),
					key: v4(),
					name: selectedDrink.name,
					price: selectedDrink.price,
				},
			],
			totalPrice: ticket.totalPrice + selectedDrink.price,
		});

		setSelectedDrink(null);
	};

	return (
		<div className='space-y-4'>
			{/* Búsqueda de bebida */}
			<div>
				<p className='font-semibold text-neutral-400 uppercase tracking-wide mb-3 text-sm'>Bebida</p>
				<Input
					label='Elegir bebida'
					placeholder='Click para buscar...'
					value={selectedDrink?.name || ''}
					onClick={onOpen}
					readOnly
					classNames={{
						label: 'text-sm font-medium',
						input: 'cursor-pointer',
					}}
				/>

				{/* Mostrar bebida seleccionada */}
				{selectedDrink && (
					<div className='bg-indigo-600/10 border border-indigo-600/30 rounded-lg p-3 mt-3'>
						<div className='flex items-center justify-between'>
							<div>
								<p className='font-medium capitalize'>{selectedDrink.name}</p>
								<p className='text-sm text-neutral-400'>Precio: S/ {selectedDrink.price.toFixed(2)}</p>
							</div>
							<button
								onClick={() => setSelectedDrink(null)}
								className='text-red-500 hover:text-red-400 text-sm'>
								Limpiar
							</button>
						</div>
					</div>
				)}
			</div>

			<Button
				className='bg-indigo-700 w-full'
				isDisabled={!selectedDrink}
				onPress={handleAddDrink}
				startContent={<IoAdd size={20} />}>
				Agregar bebida
			</Button>

			{/* Observaciones */}
			<div>
				<p className='font-semibold text-neutral-400 uppercase tracking-wide mb-3 text-sm'>Observación</p>
				<Textarea
					label='Observaciones especiales'
					placeholder='Ej: Sin cebolla, extra picante...'
					classNames={{
						label: 'text-sm',
					}}
					value={ticket.exception}
					onValueChange={(e) => setTicket({ ...ticket, exception: e })}
				/>
			</div>

			{/* Tipo de pago */}
			<div>
				<p className='font-semibold text-neutral-400 uppercase tracking-wide mb-3 text-sm'>Tipo de Pago</p>
				<div className='grid grid-cols-3 gap-3'>
					{/* Yape */}
					<button
						type='button'
						onClick={() => setTicket({ ...ticket, paymentType: 'YAPE' })}
						className={`
							relative overflow-hidden rounded-xl p-4 transition-all duration-200 border-2
							flex flex-col items-center justify-center gap-2 min-h-[100px]
							${
								ticket.paymentType === 'YAPE'
									? 'bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/20'
									: 'bg-neutral-800 border-neutral-700 hover:border-purple-500/50'
							}
						`}>
						<div
							className={`
								text-3xl transition-colors
								${ticket.paymentType === 'YAPE' ? 'text-purple-400' : 'text-neutral-400'}
							`}>
							💜
						</div>
						<span
							className={`
								font-semibold transition-colors text-sm
								${ticket.paymentType === 'YAPE' ? 'text-purple-300' : 'text-neutral-400'}
							`}>
							Yape
						</span>
						{ticket.paymentType === 'YAPE' && (
							<div className='absolute top-2 right-2'>
								<IoCheckmarkCircle
									size={20}
									className='text-purple-400'
								/>
							</div>
						)}
					</button>

					{/* Plin */}
					<button
						type='button'
						onClick={() => setTicket({ ...ticket, paymentType: 'PLIN' })}
						className={`
							relative overflow-hidden rounded-xl p-4 transition-all duration-200 border-2
							flex flex-col items-center justify-center gap-2 min-h-[100px]
							${
								ticket.paymentType === 'PLIN'
									? 'bg-cyan-600/20 border-cyan-500 shadow-lg shadow-cyan-500/20'
									: 'bg-neutral-800 border-neutral-700 hover:border-cyan-500/50'
							}
						`}>
						<div
							className={`
								text-3xl transition-colors
								${ticket.paymentType === 'PLIN' ? 'text-cyan-400' : 'text-neutral-400'}
							`}>
							💙
						</div>
						<span
							className={`
								font-semibold transition-colors text-sm
								${ticket.paymentType === 'PLIN' ? 'text-cyan-300' : 'text-neutral-400'}
							`}>
							Plin
						</span>
						{ticket.paymentType === 'PLIN' && (
							<div className='absolute top-2 right-2'>
								<IoCheckmarkCircle
									size={20}
									className='text-cyan-400'
								/>
							</div>
						)}
					</button>

					{/* Efectivo */}
					<button
						type='button'
						onClick={() => setTicket({ ...ticket, paymentType: 'EFECTIVO' })}
						className={`
							relative overflow-hidden rounded-xl p-4 transition-all duration-200 border-2
							flex flex-col items-center justify-center gap-2 min-h-[100px]
							${
								ticket.paymentType === 'EFECTIVO'
									? 'bg-green-600/20 border-green-500 shadow-lg shadow-green-500/20'
									: 'bg-neutral-800 border-neutral-700 hover:border-green-500/50'
							}
						`}>
						<div
							className={`
								text-3xl transition-colors
								${ticket.paymentType === 'EFECTIVO' ? 'text-green-400' : 'text-neutral-400'}
							`}>
							💵
						</div>
						<span
							className={`
								font-semibold transition-colors text-sm
								${ticket.paymentType === 'EFECTIVO' ? 'text-green-300' : 'text-neutral-400'}
							`}>
							Efectivo
						</span>
						{ticket.paymentType === 'EFECTIVO' && (
							<div className='absolute top-2 right-2'>
								<IoCheckmarkCircle
									size={20}
									className='text-green-400'
								/>
							</div>
						)}
					</button>
				</div>
			</div>

			{/* Botón principal */}
			<Button
				className='w-full'
				color='success'
				size='lg'
				onPress={handleSubmitTicket}
				startContent={ticket.key ? <IoCreate size={20} /> : <IoCheckmarkCircle size={20} />}>
				{ticket.key ? 'Editar Ticket' : 'Generar Ticket'}
			</Button>

			{/* Botón dejar de editar */}
			{ticket.key && (
				<Button
					className='bg-orange-600 hover:bg-orange-500 font-semibold'
					fullWidth
					size='lg'
					onPress={() => setTicket(initialValueTicket)}>
					Dejar de editar
				</Button>
			)}

			{/* Modal de selección de bebidas */}
			<ProductSelectorModal
				isOpen={isOpen}
				onClose={onClose}
				onSelect={handleSelectDrink}
				defaultCategory='BEBIDA'
			/>
		</div>
	);
});
