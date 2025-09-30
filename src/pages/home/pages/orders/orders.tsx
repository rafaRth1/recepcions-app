import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useDisclosure } from "@heroui/react";
import { TicketProps } from '@/types';
import { initialValueTicket } from '@/data';
import { OrdersModal } from './orders-modal';
import { OrdersItem } from './orders-item';
import { clientAxios } from '@/utils';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

export const Orders = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [selectTicket, setSelectTicket] = useState<TicketProps>(initialValueTicket);
	const [lists, setLists] = useState([
		{
			id: 1,
			key: 'table',
			name: 'Mesa',
			orders: [] as TicketProps[],
		},

		{
			id: 2,
			key: 'pickup',
			name: 'Recojo',
			orders: [] as TicketProps[],
		},

		{
			id: 3,
			key: 'delivery',
			name: 'Delivery',
			orders: [] as TicketProps[],
		},
	]);

	const handleFinishTicket = useCallback(
		async (id: string) => {
			try {
				const { data } = await clientAxios.put(`/recepcion/store/${id}`, {
					status: 'completed',
				});

				console.log(data);

				const updateList = lists.map((list) => {
					const updateTicket = list.orders.filter((ticket) => ticket._id !== id);

					return {
						...list,
						orders: [...updateTicket],
					};
				});

				setLists(updateList);
			} catch (error) {
				console.log(error);
			}
		},
		[lists]
	);

	const handleOnOpenModal = useCallback((ticket: TicketProps) => {
		setSelectTicket(ticket);
		onOpen();
	}, []);

	const handleRecieveData = (tickets: TicketProps[]) => {
		const updatedLists = lists.map((list) => {
			const matchingTicket = tickets.filter((ticket) => ticket.type === list.key);

			return {
				...list,
				orders: [...list.orders, ...matchingTicket],
			};
		});

		setLists(updatedLists);
	};

	useEffect(() => {
		socket.on('responseFinishTicket', handleRecieveData);
	}, [lists]);

	useEffect(() => {
		const getLists = async () => {
			const { data: tickets } = await clientAxios<TicketProps[]>('/recepcion');

			const updatedLists = lists.map((list) => {
				const matchingTicket = tickets.filter((ticket) => ticket.type === list.key);

				return {
					...list,
					orders: [...list.orders, ...matchingTicket],
				};
			});

			setLists(updatedLists);
		};

		getLists();
	}, []);

	return (
		<main className='flex flex-col h-[calc(100dvh-72px)]'>
			<h1 className='text-xl mb-5 p-4 font-semibold'>Sección Cocina</h1>

			<section className='overflow-hidden grow relative h-full'>
				<div className='orders-content absolute overflow-x-auto p-4 inset-0 flex justify-between'>
					{lists.map((list) => (
						<OrdersItem
							key={list.id}
							list={list}
							handleOnOpenModal={handleOnOpenModal}
							handleFinishTicket={handleFinishTicket}
						/>
					))}
				</div>
			</section>

			<OrdersModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				selectTicket={selectTicket}
			/>
		</main>
	);
};
