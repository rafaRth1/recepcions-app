import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, addToast } from '@heroui/react';
import { useRecepcion } from '@/hooks';
import { IoTrash, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import { Creams, Dish, Drinks } from '@/core/ticket/interfaces';
import { initialValueTicket } from '@/data';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUpdateTicket } from '@/modules/ticket/hooks/useUpdateTicket';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onOpenExtras: (dish: Dish) => void;
}

export const ModalDetallePedido = ({ isOpen, onClose, onOpenExtras }: Props) => {
	const location = useLocation();
	const navigate = useNavigate();
	const { ticket, setTicket, handleSubmitTicket } = useRecepcion();
	const { updateTicket } = useUpdateTicket();
	const queryClient = useQueryClient();

	const handleDeleteDish = (itemKey: string) => {
		const [selectRemoveItem] = ticket.dishes.filter((dish) => dish.key === itemKey);
		const updateDishes = ticket.dishes.filter((dish) => dish.key !== itemKey);
		setTicket({ ...ticket, dishes: updateDishes, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	const handleDeleteCream = (item: Creams) => {
		const updateCreams = ticket.creams.filter((cream) => cream.key !== item.key);
		setTicket({ ...ticket, creams: updateCreams });
	};

	const handleDeleteDrink = (item: Drinks) => {
		const [selectRemoveItem] = ticket.drinks!.filter((drink) => drink._id === item._id);
		const updateDrinks = ticket.drinks!.filter((drink) => drink._id_temp !== item._id_temp);
		setTicket({ ...ticket, drinks: updateDrinks, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	const handleGenerarTicket = () => {
		// Validar tipo de pago si es Delivery o Llevar
		if ((ticket.type === 'DELIVERY' || ticket.type === 'PICKUP') && !ticket.paymentType) {
			alert('⚠️ Selecciona un tipo de pago');
			return;
		}

		if (ticket._id) {
			updateTicket.mutate(
				{
					...ticket,
					_id: ticket._id,
				},
				{
					onSuccess: (response) => {
						queryClient.invalidateQueries({ queryKey: ['tickets'] });
						addToast({
							description: response.message || 'Pedido actualizado correctamente',
							color: 'success',
						});
						setTicket(initialValueTicket);
					},
					onError: (error) => {
						addToast({
							description: error.message,
							color: 'danger',
						});
					},
				}
			);

			return;
		}

		handleSubmitTicket();
		onClose();
	};

	// Estado vacío
	const hasItems = ticket.dishes.length > 0 || ticket.creams.length > 0 || (ticket.drinks && ticket.drinks.length > 0);

	// Determinar si mostrar tipo de pago
	const showPaymentType = ticket.type === 'DELIVERY' || ticket.type === 'PICKUP';

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='2xl'
			scrollBehavior='inside'
			classNames={{
				base: 'bg-neutral-900',
				header: 'border-b border-neutral-800',
				body: 'py-4',
				footer: 'border-t border-neutral-800',
			}}>
			<ModalContent>
				<ModalHeader>
					<div className='flex items-center gap-2'>
						<span className='text-xl'>📋</span>
						<span>Detalle del Pedido</span>
					</div>
				</ModalHeader>

				<ModalBody>
					{!hasItems ? (
						<div className='text-center py-8'>
							<div className='text-6xl mb-3'>🛒</div>
							<p className='text-neutral-400 font-medium'>Pedido vacío</p>
							<p className='text-sm text-neutral-500 mt-1'>Agrega productos para comenzar</p>
						</div>
					) : (
						<div className='space-y-3'>
							{/* Platillos */}
							{ticket.dishes.map((dish) => (
								<div
									key={dish.key || dish._id}
									className='bg-neutral-800 rounded-lg p-3'>
									<div className='flex items-start justify-between mb-2'>
										<p className='font-medium capitalize flex-1'>{dish.dishFood}</p>
										<p className='font-semibold text-indigo-400 ml-2'>S/ {dish.price.toFixed(2)}</p>
									</div>

									<div className='flex gap-3 text-xs text-neutral-400 mb-3'>
										<span>🍚 Arroz: {dish.rice ? 'Sí' : 'No'}</span>
										<span>🥗 Ensalada: {dish.salad ? 'Sí' : 'No'}</span>
									</div>

									<div className='flex gap-2'>
										<Button
											size='sm'
											className='bg-indigo-600 text-white flex-1'
											onPress={() => onOpenExtras(dish)}>
											⚙️ Extras
										</Button>

										<Button
											isIconOnly
											size='sm'
											className='bg-red-900/50 hover:bg-red-900'
											onPress={() => handleDeleteDish(dish.key)}>
											<IoTrash
												size={16}
												className='text-red-400'
											/>
										</Button>
									</div>
								</div>
							))}

							{/* Bebidas */}
							{ticket.drinks &&
								ticket.drinks.length > 0 &&
								ticket.drinks.map((drink) => (
									<div
										key={drink.key || drink._id}
										className='bg-neutral-800 rounded-lg p-3 flex items-center justify-between'>
										<div className='flex-1'>
											<p className='font-medium capitalize'>{drink.name}</p>
											<p className='text-sm text-indigo-400'>S/ {drink.price.toFixed(2)}</p>
										</div>

										<Button
											isIconOnly
											size='sm'
											className='bg-red-900/50 hover:bg-red-900'
											onPress={() => handleDeleteDrink(drink)}>
											<IoTrash
												size={16}
												className='text-red-400'
											/>
										</Button>
									</div>
								))}

							{/* Cremas */}
							{ticket.creams.map((cream) => (
								<div
									key={cream.key || cream._id}
									className='bg-neutral-800 rounded-lg p-3 flex items-center justify-between'>
									<div className='flex-1'>
										<p className='text-sm text-neutral-400 mb-1'>Cremas:</p>
										<p className='text-sm capitalize'>{Array.from(cream.creams).join(', ')}</p>
									</div>

									<Button
										isIconOnly
										size='sm'
										className='bg-red-900/50 hover:bg-red-900'
										onPress={() => handleDeleteCream(cream)}>
										<IoTrash
											size={16}
											className='text-red-400'
										/>
									</Button>
								</div>
							))}

							{/* Observaciones */}
							<div>
								<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Observación</p>
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
						</div>
					)}
				</ModalBody>

				<ModalFooter className='flex-col gap-3'>
					{/* Tipo de Pago - Solo si es Delivery o Llevar */}
					{showPaymentType && hasItems && (
						<div className='w-full'>
							<p className='text-sm font-semibold text-neutral-400 uppercase mb-2'>💳 Tipo de Pago</p>
							<div className='grid grid-cols-3 gap-2'>
								<button
									onClick={() => setTicket({ ...ticket, paymentType: 'YAPE' })}
									className={`
										p-3 rounded-lg border-2 transition-all duration-200
										flex flex-col items-center gap-1
										${
											ticket.paymentType === 'YAPE'
												? 'bg-purple-600/20 border-purple-500'
												: 'bg-neutral-800 border-neutral-700 hover:border-purple-500/50'
										}
									`}>
									<span className='text-2xl'>💜</span>
									<span className='text-xs font-semibold'>Yape</span>
									{ticket.paymentType === 'YAPE' && (
										<IoCheckmarkCircle
											className='text-purple-400 absolute top-1 right-1'
											size={16}
										/>
									)}
								</button>

								<button
									onClick={() => setTicket({ ...ticket, paymentType: 'PLIN' })}
									className={`
										p-3 rounded-lg border-2 transition-all duration-200
										flex flex-col items-center gap-1
										${ticket.paymentType === 'PLIN' ? 'bg-cyan-600/20 border-cyan-500' : 'bg-neutral-800 border-neutral-700 hover:border-cyan-500/50'}
									`}>
									<span className='text-2xl'>💙</span>
									<span className='text-xs font-semibold'>Plin</span>
									{ticket.paymentType === 'PLIN' && (
										<IoCheckmarkCircle
											className='text-cyan-400 absolute top-1 right-1'
											size={16}
										/>
									)}
								</button>

								<button
									onClick={() => setTicket({ ...ticket, paymentType: 'EFECTIVO' })}
									className={`
										p-3 rounded-lg border-2 transition-all duration-200
										flex flex-col items-center gap-1
										${
											ticket.paymentType === 'EFECTIVO'
												? 'bg-green-600/20 border-green-500'
												: 'bg-neutral-800 border-neutral-700 hover:border-green-500/50'
										}
									`}>
									<span className='text-2xl'>💵</span>
									<span className='text-xs font-semibold'>Efectivo</span>
									{ticket.paymentType === 'EFECTIVO' && (
										<IoCheckmarkCircle
											className='text-green-400 absolute top-1 right-1'
											size={16}
										/>
									)}
								</button>
							</div>
						</div>
					)}

					{/* Advertencia si falta tipo de pago */}
					{showPaymentType && hasItems && !ticket.paymentType && (
						<div className='w-full bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-2 flex items-center gap-2'>
							<IoAlertCircle
								className='text-yellow-400'
								size={16}
							/>
							<p className='text-xs text-yellow-400'>Selecciona un tipo de pago para continuar</p>
						</div>
					)}

					{/* Botón Generar Ticket */}
					<Button
						className='w-full'
						color={ticket._id ? 'secondary' : 'success'}
						size='lg'
						isDisabled={!hasItems}
						isLoading={updateTicket.isPending}
						onPress={handleGenerarTicket}>
						<IoCheckmarkCircle size={20} />
						{ticket._id ? 'Actualizar Pedido' : 'Generar Pedido'}
					</Button>

					{(ticket.key || ticket._id) && (
						<Button
							className='bg-orange-600 hover:bg-orange-500 font-semibold'
							fullWidth
							size='lg'
							onPress={() => {
								setTicket(initialValueTicket);
								navigate(location.pathname, { replace: true });
							}}>
							Dejar de editar
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};
