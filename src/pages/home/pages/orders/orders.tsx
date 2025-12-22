import { useState, useCallback, useMemo } from 'react';
import { useDisclosure, Input, Tabs, Tab, addToast, Button } from '@heroui/react';
import { initialValueTicket } from '@/data';
import { OrdersModal } from './orders-modal';
import { OrdersItem } from './orders-item';
import { Ticket } from '@/core/ticket/interfaces';
import { IoSearch } from 'react-icons/io5';
import { useGetTickets } from '@/modules/ticket/hooks/useGetTickets';
import { formatTime } from '@/utils/format-time';
import { formatDate } from '@/utils/format-date';
import { useGeneratePrintCustomerReceipt } from '@/modules/printer/hooks/useGeneratePrintCustomerReceipt';

export const Orders = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectTicket, setSelectTicket] = useState<Ticket>(initialValueTicket);
	const { data: tickets = [], isLoading } = useGetTickets();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedTab, setSelectedTab] = useState('all');

	const { generateReceipt } = useGeneratePrintCustomerReceipt();

	const lists = useMemo(() => {
		const tableTickets = tickets.filter((ticket) => ticket.type === 'TABLE' && ticket.status === 'PROCESS');
		const pickupTickets = tickets.filter((ticket) => ticket.type === 'PICKUP' && ticket.status === 'PROCESS');
		const deliveryTickets = tickets.filter((ticket) => ticket.type === 'DELIVERY' && ticket.status === 'PROCESS');

		return [
			{
				id: 1,
				key: 'TABLE',
				name: 'Mesa',
				orders: tableTickets,
			},
			{
				id: 2,
				key: 'PICKUP',
				name: 'Recojo',
				orders: pickupTickets,
			},
			{
				id: 3,
				key: 'DELIVERY',
				name: 'Delivery',
				orders: deliveryTickets,
			},
		];
	}, [tickets]);

	const handleFinishTicket = useCallback(async (id: string) => {
		// Implementar lógica de completar ticket
		console.log('Terminar ticket con ID:', id);
	}, []);

	const handlePrintReceipt = useCallback(
		async (ticket: Ticket) => {
			generateReceipt.mutate(ticket, {
				onSuccess: (response) => {
					addToast({
						description: response.message,
						color: 'success',
					});
				},
				onError: (error) => {
					addToast({
						description: error.message,
						color: 'danger',
					});
				},
			});
		},
		[generateReceipt]
	);

	const handleOnOpenModal = useCallback(
		(ticket: Ticket) => {
			setSelectTicket(ticket);
			onOpen();
		},
		[onOpen]
	);

	const stats = useMemo(() => {
		const processTickets = tickets.filter((t) => t.status === 'PROCESS');
		const completedTickets = tickets.filter((t) => t.status === 'COMPLETED');

		return {
			total: processTickets.length,
			completed: completedTickets.length,
			pending: processTickets.length,
		};
	}, [tickets]);

	const filterOrders = useCallback(
		(orders: Ticket[]) => {
			if (!searchQuery) return orders;
			return orders.filter(
				(ticket) =>
					ticket.nameTicket.toLowerCase().includes(searchQuery.toLowerCase()) ||
					ticket._id?.toLowerCase().includes(searchQuery.toLowerCase())
			);
		},
		[searchQuery]
	);

	const getFilteredLists = useCallback(() => {
		if (selectedTab === 'all') {
			return lists;
		}
		if (selectedTab === 'pending') {
			return lists;
		}
		if (selectedTab === 'completed') {
			return [];
		}
		return lists.filter((list) => list.key === selectedTab);
	}, [selectedTab, lists]);

	return (
		<main className='flex flex-col h-[calc(100dvh-72px)] md:h-[calc(100dvh-88px)]'>
			{/* Header con estadísticas */}
			<div className='p-4 space-y-4'>
				{/* Stats Cards */}
				<div className='grid grid-cols-3 gap-3'>
					<div className='bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800'>
						<p className='text-2xl font-bold text-neutral-100'>{stats.total}</p>
						<p className='text-xs text-neutral-400 mt-1'>Total</p>
					</div>
					<div className='bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800'>
						<p className='text-2xl font-bold text-green-500'>{stats.completed}</p>
						<p className='text-xs text-neutral-400 mt-1'>Completadas</p>
					</div>
					<div className='bg-neutral-900 rounded-xl p-4 text-center border border-neutral-800'>
						<p className='text-2xl font-bold text-orange-500'>{stats.pending}</p>
						<p className='text-xs text-neutral-400 mt-1'>Pendientes</p>
					</div>
				</div>

				{/* Tabs */}
				<Tabs
					selectedKey={selectedTab}
					onSelectionChange={(key) => setSelectedTab(key as string)}
					variant='underlined'
					classNames={{
						tabList: 'gap-6 w-full relative rounded-none p-0 border-b border-neutral-800',
						cursor: 'w-full bg-indigo-500',
						tab: 'max-w-fit px-0 h-12',
						tabContent: 'group-data-[selected=true]:text-indigo-500',
					}}>
					<Tab
						key='all'
						title={`Todas (${stats.total})`}
					/>
					<Tab
						key='pending'
						title={`Pendiente (${stats.pending})`}
					/>
					<Tab
						key='completed'
						title={`Completado (${stats.completed})`}
					/>
				</Tabs>

				{/* Búsqueda */}
				<Input
					placeholder='Buscar por número, mesa o cliente...'
					value={searchQuery}
					onValueChange={setSearchQuery}
					startContent={<IoSearch className='text-neutral-400' />}
					classNames={{
						input: 'text-sm',
						inputWrapper: 'bg-neutral-900 border border-neutral-800',
					}}
				/>
			</div>

			{/* Lista de órdenes */}
			<section className='overflow-hidden grow relative h-full'>
				{isLoading ? (
					<div className='flex items-center justify-center h-full'>
						<p className='text-neutral-400'>Cargando pedidos...</p>
					</div>
				) : (
					<div className='absolute inset-0 overflow-y-auto pb-20'>
						{/* Vista Desktop */}
						<div className='hidden md:flex p-4 gap-4'>
							{getFilteredLists().map((list) => (
								<OrdersItem
									key={list.id}
									list={{ ...list, orders: filterOrders(list.orders) }}
									handleOnOpenModal={handleOnOpenModal}
									handleFinishTicket={handleFinishTicket}
								/>
							))}
						</div>

						{/* Vista Mobile */}
						<div className='md:hidden'>
							{getFilteredLists().map((list) => (
								<div
									key={list.id}
									className='mb-6'>
									<h2 className='text-lg font-semibold px-4 mb-3 text-neutral-300'>{list.name}</h2>
									<div className='space-y-3 px-4'>
										{filterOrders(list.orders).length === 0 ? (
											<p className='text-center text-neutral-500 py-8'>No hay pedidos</p>
										) : (
											filterOrders(list.orders).map((ticket) => (
												<div
													key={ticket._id}
													className='bg-neutral-900 rounded-xl p-4 border border-neutral-800'>
													{/* Header: Número y Estado */}
													<div className='flex items-center justify-between mb-3'>
														<div className='flex items-center gap-2'>
															<span className='text-base font-bold text-neutral-100'>
																#{ticket._id?.slice(-4)}
															</span>
															<span className='text-xs px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded-full'>
																Mesa
															</span>
														</div>
														<span className='text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full font-medium'>
															Pendiente
														</span>
													</div>

													{/* Precio y Hora */}
													<div className='flex items-center justify-between mb-2'>
														<p className='text-2xl font-bold text-orange-500'>S/{ticket.totalPrice.toFixed(2)}</p>
														<p className='text-sm font-medium text-neutral-300'>{formatTime(ticket.createdAt)}</p>
													</div>

													{/* Mesa e Items */}
													<div className='flex items-center justify-between mb-1 text-sm text-neutral-400'>
														<span>Mesa: {ticket.nameTicket}</span>
														<span>{formatDate(ticket.createdAt)}</span>
													</div>

													<div className='text-sm text-neutral-400 mb-3'>{ticket.dishes.length} items</div>

													{/* Excepciones */}
													{ticket.exception && (
														<div className='mb-3 bg-yellow-500/10 p-2 rounded-lg'>
															<p className='text-xs text-yellow-500'>⚠️ {ticket.exception}</p>
														</div>
													)}

													{/* Botones */}
													<div className='flex gap-2'>
														<Button
															color='primary'
															onPress={() => handleOnOpenModal(ticket)}
															className='flex-1'>
															Detalle
														</Button>
														<Button
															onPress={() => handlePrintReceipt(ticket)}
															color='primary'
															className='flex-1'
															variant='flat'
															disabled={generateReceipt.isPending}>
															{generateReceipt.isPending ? '...' : 'Boleta'}
														</Button>
													</div>
												</div>
											))
										)}
									</div>
								</div>
							))}
						</div>
					</div>
				)}
			</section>

			<OrdersModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				selectTicket={selectTicket}
			/>
		</main>
	);
};
