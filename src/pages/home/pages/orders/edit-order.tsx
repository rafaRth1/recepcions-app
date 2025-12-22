// // src/modules/recepcion/components/edit-ticket/EditTicket.tsx
// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useDisclosure, Input, Textarea, Button, addToast, Spinner } from '@heroui/react';
// import { Dish, Ticket } from '@/core/ticket/interfaces';
// import { useQueryClient } from '@tanstack/react-query';

// // Componentes
// import { IoArrowBack, IoSaveOutline } from 'react-icons/io5';
// import { useUpdateTicket } from '@/modules/ticket/hooks/useUpdateTicket';
// import { HeaderRecepcion } from '../recepcion';
// import { PedidoResumenSticky } from '../recepcion/pedido-resumen-sticky';
// import { ProductGridQuick } from '../recepcion/product-grid-quick';
// import { ModalDetallePedido } from '../recepcion/modal-detalle-pedido';
// import { ModalExtrasItem } from '../recepcion/modal-extras-item';
// import { useGetTicket } from '@/modules/ticket/hooks/useGetTicket';

// export const EditOrder = () => {
// 	const { id } = useParams<{ id: string }>();
// 	const navigate = useNavigate();
// 	const queryClient = useQueryClient();
// 	const { data, isLoading, isError } = useGetTicket(id);
// 	const { updateTicket } = useUpdateTicket();
// 	const [ticket, setTicket] = useState<Ticket | null>(null);

// 	// Estados para modales
// 	const { isOpen: isOpenDetalle, onOpen: onOpenDetalle, onClose: onCloseDetalle } = useDisclosure();
// 	const { isOpen: isOpenExtras, onOpen: onOpenExtras, onClose: onCloseExtras } = useDisclosure();
// 	const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

// 	const handleOpenExtras = (dish: Dish) => {
// 		setSelectedDish(dish);
// 		onOpenExtras();
// 	};

// 	const handleSaveChanges = () => {
// 		if (!id) return;

// 		if (!ticket.nameTicket || ticket.nameTicket.length === 0) {
// 			addToast({
// 				description: 'El nombre del ticket es requerido',
// 				color: 'danger',
// 			});
// 			return;
// 		}

// 		if (ticket.dishes.length === 0) {
// 			addToast({
// 				description: 'Debe haber al menos un platillo',
// 				color: 'danger',
// 			});
// 			return;
// 		}

// 		// Validar tipo de pago si es Delivery o Pickup
// 		if ((ticket.type === 'DELIVERY' || ticket.type === 'PICKUP') && !ticket.paymentType) {
// 			addToast({
// 				description: 'Selecciona un tipo de pago',
// 				color: 'danger',
// 			});
// 			return;
// 		}

// 		const payload = {
// 			nameTicket: ticket.nameTicket,
// 			type: ticket.type,
// 			dishes: ticket.dishes.map((dish) => ({
// 				dishFood: dish.dishFood,
// 				price: dish.price,
// 				rice: dish.rice,
// 				salad: dish.salad,
// 			})),
// 			drinks: ticket.drinks?.map((drink) => ({
// 				name: drink.name,
// 				price: drink.price,
// 			})),
// 			creams: ticket.creams,
// 			exception: ticket.exception,
// 			paymentType: ticket.paymentType,
// 		};

// 		console.log('Payload to update ticket:', payload);

// 		// updateTicket.mutate(
// 		// 	{ ticketId: id, payload },
// 		// 	{
// 		// 		onSuccess: (response) => {
// 		// 			addToast({
// 		// 				description: 'Ticket actualizado correctamente',
// 		// 				color: 'success',
// 		// 			});
// 		// 			queryClient.invalidateQueries({ queryKey: ['tickets'] });
// 		// 			navigate('/orders');
// 		// 		},
// 		// 		onError: (error: any) => {
// 		// 			addToast({
// 		// 				description: error.message || 'Error al actualizar el ticket',
// 		// 				color: 'danger',
// 		// 			});
// 		// 		},
// 		// 	}
// 		// );
// 	};

// 	const handleCancel = () => {
// 		navigate('/orders');
// 	};

// 	useEffect(() => {
// 		if (data) {
// 			setTicket(data); // Cargar datos del hook
// 		}
// 	}, [data]);

// 	if (isLoading) {
// 		return (
// 			<div className='flex items-center justify-center h-screen'>
// 				<Spinner size='lg' />
// 			</div>
// 		);
// 	}

// 	if (!ticket) {
// 		return null;
// 	}

// 	return (
// 		<main className='pb-20'>
// 			<div className='max-w-[820px] mx-auto'>
// 				{/* Header con botones */}
// 				<div className='p-4 pb-0 space-y-4'>
// 					<div className='flex items-center justify-between'>
// 						<button
// 							onClick={handleCancel}
// 							className='flex items-center gap-2 text-neutral-400 hover:text-white transition-colors'>
// 							<IoArrowBack size={20} />
// 							<span className='font-medium'>Volver</span>
// 						</button>

// 						<h1 className='text-xl font-bold'>Editar Ticket</h1>

// 						<Button
// 							className='bg-green-600 hover:bg-green-500'
// 							isLoading={updateTicket.isPending}
// 							onPress={handleSaveChanges}
// 							startContent={<IoSaveOutline size={20} />}>
// 							Guardar
// 						</Button>
// 					</div>

// 					{/* Tipo de pedido */}
// 					<HeaderRecepcion />
// 				</div>

// 				{/* Banner Sticky */}
// 				<PedidoResumenSticky onOpenDetalle={onOpenDetalle} />

// 				<div className='px-4 space-y-6'>
// 					{/* Input nombre/mesa */}
// 					<Input
// 						type='text'
// 						label='Nombre del cliente o mesa'
// 						placeholder='Ej: Mesa 5 o Juan Pérez'
// 						classNames={{
// 							label: 'text-sm font-medium',
// 						}}
// 						value={ticket.nameTicket}
// 						onValueChange={(e) => setTicket({ ...ticket, nameTicket: e })}
// 					/>

// 					{/* Grid de productos */}
// 					<div>
// 						<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Productos</p>
// 						<ProductGridQuick />
// 					</div>

// 					{/* Observaciones */}
// 					<div>
// 						<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Observación</p>
// 						<Textarea
// 							label='Observaciones especiales'
// 							placeholder='Ej: Sin cebolla, extra picante...'
// 							classNames={{
// 								label: 'text-sm',
// 							}}
// 							value={ticket.exception}
// 							onValueChange={(e) => setTicket({ ...ticket, exception: e })}
// 						/>
// 					</div>

// 					{/* Botones de acción */}
// 					<div className='grid grid-cols-2 gap-3 pt-4'>
// 						<Button
// 							variant='flat'
// 							size='lg'
// 							onPress={handleCancel}>
// 							Cancelar
// 						</Button>
// 						<Button
// 							className='bg-green-600 hover:bg-green-500'
// 							size='lg'
// 							isLoading={updateTicket.isPending}
// 							onPress={handleSaveChanges}
// 							startContent={<IoSaveOutline size={20} />}>
// 							Guardar Cambios
// 						</Button>
// 					</div>
// 				</div>
// 			</div>

// 			{/* Modales */}
// 			<ModalDetallePedido
// 				isOpen={isOpenDetalle}
// 				onClose={onCloseDetalle}
// 				onOpenExtras={handleOpenExtras}
// 			/>

// 			<ModalExtrasItem
// 				isOpen={isOpenExtras}
// 				onClose={onCloseExtras}
// 				dish={selectedDish}
// 			/>
// 		</main>
// 	);
// };
