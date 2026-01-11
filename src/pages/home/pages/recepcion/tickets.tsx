// import { io } from 'socket.io-client';
import { addToast, Button, Spinner } from '@heroui/react';
import { useRecepcion } from '@/hooks';
import { IoPrint, IoCreate, IoCheckmarkCircle, IoTrash, IoRestaurant, IoCar, IoBagHandle, IoAlertCircle } from 'react-icons/io5';
import { useGeneratePrintTicket } from '@/modules/printer/hooks/useGeneratePrintTicket';
import { CreateTicketRequest, Ticket } from '@/core/ticket/interfaces';
import { useCreateTicket } from '@/modules/ticket/hooks/useCreateTicket';
import { useQueryClient } from '@tanstack/react-query';
import { formatMomentaryTime } from '@/utils/format-momentary-time';

// const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

const paymentTypeSylesMap: Record<string, string> = {
	YAPE: 'bg-purple-600',
	PLIN: 'bg-green-600',
	EFECTIVO: 'bg-yellow-600',
};

export interface Props {
	setActiveTab: React.Dispatch<React.SetStateAction<"nuevo" | "pendientes">>
}

export const Tickets = ({ setActiveTab }: Props) => {
	const { tickets, setTickets, setTicket } = useRecepcion();
	const { generateTicket } = useGeneratePrintTicket();
	const { createTicket } = useCreateTicket();
	const queryClient = useQueryClient();

	const handleFinishTicket = async (ticketSelected: Ticket) => {
		// await socket.emit('handleFinishticket', ticketSelected);

		const ticket: CreateTicketRequest = {
			nameTicket: ticketSelected.nameTicket,
			dishes: ticketSelected.dishes,
			creams: ticketSelected.creams,
			drinks: ticketSelected.drinks,
			exception: ticketSelected.exception,
			color: ticketSelected.color,
			status: ticketSelected.status,
			type: ticketSelected.type,
			paymentType: ticketSelected.paymentType,
		};

		createTicket.mutate(ticket, {
			onSuccess: (response) => {
				addToast({
					description: response.message,
					color: 'success',
				});

				queryClient.invalidateQueries({ queryKey: ['tickets'] });
				const ticketsUpdate = tickets.filter((ticket) => ticket.key !== ticketSelected.key);
				setTickets(ticketsUpdate);
			},
			onError: (error) => {
				console.log('Error al crear ticket:', error);
				addToast({
					description: error.message || 'Error al crear el ticket',
					color: 'danger',
				});
			},
		});
	};

	const handleDeleteTicketTemporal = (ticket: Ticket) => {
		const confirmDelete = confirm('¿Eliminar este ticket?');

		if (!confirmDelete) {
			return;
		}

		const updateTickets = tickets.filter((ticketItem) => ticketItem.key !== ticket.key);
		setTickets(updateTickets);
	};

	const handlePrinterTicket = (ticket: Ticket) => {
		generateTicket.mutate(
			{ ...ticket, momentaryTime: formatMomentaryTime() },
			{
				onSuccess: () => {
					addToast({
						description: 'Ticket generado',
						color: 'success',
					});
				},
				onError: (error) => {
					console.error('Error al imprimir el ticket:', error);
					addToast({
						description: 'Error al enviar el ticket a la impresora',
						color: 'danger',
					});
				},
			}
		);
	};

	const handleEditTicket = (ticket: Ticket) => {
		setTicket(ticket);
		setActiveTab('nuevo');
	}

	if (tickets.length === 0) {
		return null;
	}

	return (
		<div className='mt-6'>
			<div className='flex flex-row items-center gap-3 mb-4'>
				<h2 className='text-xl font-semibold text-neutral-100'>Tickets Pendientes ({tickets.length})</h2>
				{createTicket.isPending ||
					(generateTicket.isPending && (
						<Spinner
							size='sm'
							className='text-indigo-500'
						/>
					))}
			</div>

			<div className='space-y-4'>
				{tickets.map((ticket) => (
					<div
						key={ticket.key}
						className='bg-neutral-900 rounded-xl p-4'>
						{/* Header del ticket */}
						<div className='flex items-start justify-between mb-4'>
							<div>
								<h3 className='font-semibold text-lg capitalize mb-1'>{ticket.nameTicket}</h3>
								<div className='flex items-center gap-2 text-sm text-neutral-400'>
									<span className='flex items-center gap-1'>
										{ticket.type === 'TABLE' && (
											<>
												<IoRestaurant size={14} /> Mesa
											</>
										)}
										{ticket.type === 'DELIVERY' && (
											<>
												<IoCar size={14} /> Delivery
											</>
										)}
										{ticket.type === 'PICKUP' && (
											<>
												<IoBagHandle size={14} /> Llevar
											</>
										)}
									</span>
									<span>•</span>
									<span>{ticket.time}</span>
									<div className={`${paymentTypeSylesMap[ticket.paymentType]}  text-white px-2 py-1 ml-2`}>
										{ticket.paymentType}
									</div>
								</div>
							</div>

							{/* Total destacado */}
							<div className='text-right'>
								<p className='text-xs text-neutral-400 mb-1'>Total</p>
								<p className='text-2xl font-bold text-indigo-400'>S/{ticket.totalPrice.toFixed(2)}</p>
							</div>
						</div>

						{/* Items del pedido - CARDS en lugar de tablas */}
						<div className='space-y-2 mb-4'>
							{/* Platillos */}
							{ticket.dishes.map((item) => (
								<div
									key={item.key}
									className='bg-neutral-800 rounded-lg p-3'>
									<div className='flex items-start justify-between mb-1'>
										<p className='font-medium capitalize flex-1'>{item.dishFood}</p>
										<p className='font-semibold text-indigo-400'>S/{item.price.toFixed(2)}</p>
									</div>
									<div className='flex gap-3 text-xs text-neutral-400'>
										<span>🍚 Arroz: {item.rice ? 'Sí' : 'No'}</span>
										<span>🥗 Ensalada: {item.salad ? 'Sí' : 'No'}</span>
									</div>
								</div>
							))}

							{/* Cremas */}
							{ticket.creams.map((item) => (
								<div
									key={item.key}
									className='bg-neutral-800 rounded-lg p-3'>
									<p className='text-sm text-neutral-400 mb-1'>Cremas:</p>
									<p className='text-sm capitalize'>{Array.from(item.creams).join(', ')}</p>
								</div>
							))}

							{/* Bebidas */}
							{ticket.drinks &&
								ticket.drinks.length > 0 &&
								ticket.drinks.map((item) => (
									<div
										key={item._id_temp}
										className='bg-neutral-800 rounded-lg p-3'>
										<div className='flex items-center justify-between'>
											<p className='font-medium capitalize'>{item.name}</p>
											<p className='font-semibold text-indigo-400'>S/{item.price.toFixed(2)}</p>
										</div>
									</div>
								))}
						</div>

						{/* Excepción si existe */}
						{ticket.exception && ticket.exception.length > 0 && (
							<div className='bg-yellow-900/20 border border-yellow-700/50 rounded-lg p-3 mb-4'>
								<p className='text-sm text-yellow-400 flex items-center gap-2'>
									<IoAlertCircle size={16} />
									<span className='font-medium'>Observación:</span> {ticket.exception}
								</p>
							</div>
						)}

						{/* Acciones - SIMPLIFICADAS */}
						<div className='grid grid-cols-2 gap-2'>
							<Button
								className='bg-indigo-700 w-full'
								isDisabled={createTicket.isPending || generateTicket.isPending}
								onPress={() => handlePrinterTicket(ticket)}
								startContent={<IoPrint size={18} />}>
								Imprimir
							</Button>

							<Button
								className='w-full'
								color='warning'
								isDisabled={createTicket.isPending || generateTicket.isPending}
								onPress={() =>handleEditTicket(ticket)}
								startContent={<IoCreate size={18} />}>
								Editar
							</Button>

							<Button
								className='w-full'
								color='success'
								isDisabled={createTicket.isPending || generateTicket.isPending}
								onPress={() => handleFinishTicket(ticket)}
								startContent={<IoCheckmarkCircle size={18} />}>
								Terminar
							</Button>

							<Button
								className='w-full bg-red-800'
								isDisabled={createTicket.isPending || generateTicket.isPending}
								onPress={() => handleDeleteTicketTemporal(ticket)}
								startContent={<IoTrash size={18} />}>
								Eliminar
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};
