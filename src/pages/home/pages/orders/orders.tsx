import { useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { useDisclosure } from '@nextui-org/react';
import { ModalDetailsOrder } from './modal-details-order';
import { ContentOrder } from './content-order';
import { TicketProps } from '@/types';
import clientAxios from '@/utils/client-axios';
// import clientAxios from '@/utils/client-axios';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

const initialValueTicket: TicketProps = {
	key: '',
	name_ticket: '',
	dishes: [],
	creams: [],
	drinks: [],
	total_price: 0,
	exception: '',
	time: '',
	type_payment: '',
	status: 'process',
	type: 'table',
	user: '',
};

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
			key: 'delivery',
			name: 'Delivery',
			orders: [] as TicketProps[],
		},
		{
			id: 3,
			key: 'pickup',
			name: 'Recojo',
			orders: [] as TicketProps[],
		},
	]);

	const handleFinishTicket = useCallback(async (id: string) => {
		try {
			const { data } = await clientAxios.put(`/recepcion/${id}`);

			console.log(data);

			const updateList = lists.map((list) => {
				const updateTicket = list.orders.filter((ticket) => ticket._id !== id);

				return {
					...list,
					orders: updateTicket,
				};
			});

			setLists(updateList);
		} catch (error) {
			console.log(error);
		}
	}, []);

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
				const matchingTicket = tickets.filter((ticket) => ticket.type === list.key && ticket.status === 'process');

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
		<main className='flex flex-col h-[calc(100dvh-65px)]'>
			<h1 className='text-xl mb-5 p-4 font-semibold'>Sección Cocina</h1>

			<ContentOrder
				lists={lists}
				onOpen={onOpen}
				handleFinishTicket={handleFinishTicket}
				handleOnOpenModal={handleOnOpenModal}
			/>

			<ModalDetailsOrder
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				selectTicket={selectTicket}
			/>
		</main>
	);
};
