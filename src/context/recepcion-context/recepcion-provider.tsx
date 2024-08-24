import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { DishProps, TicketProps } from '@/types';
import { useAuthProvider, useDate } from '@/hooks';
// import { datatTickes } from '@/data/data-tickets';
// import clientAxios from '@/utils/client-axios';
import { io } from 'socket.io-client';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

interface Props {
	children: JSX.Element | JSX.Element[];
}

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

const initialValueDish: DishProps = {
	key: '',
	price: 0,
	dish_food: '',
	rice: false,
	salad: true,
};

export const RecepcionProvider = (props: Props): JSX.Element => {
	const { children } = props;
	const { date, hours } = useDate();
	const { auth } = useAuthProvider();
	const [selected, setSelected] = useState(['mayonesa', 'ketchup', 'mostaza']);

	const [dish, setDish] = useState<DishProps>(initialValueDish);
	const [ticket, setTicket] = useState<TicketProps>(initialValueTicket);
	const [tickets, setTickets] = useState<TicketProps[]>([]);

	const handleSubmitTicket = () => {
		if (ticket.name_ticket.length === 0) {
			console.log('Ingresar nombre de ticket');
			return;
		}

		if (ticket.key) {
			handleEditTicket();
			return;
		}

		handleAddTicket();
	};

	const handleAddTicket = () => {
		setTickets([...tickets, { ...ticket, key: crypto.randomUUID(), time: `${date} ${hours}`, user: auth._id }]);
		setDish(initialValueDish);
		setTicket(initialValueTicket);
	};

	const handleEditTicket = () => {
		const updateTickets = tickets.map((itemTicket) => {
			if (itemTicket.key === ticket.key) {
				return (itemTicket = { ...ticket, time: `${date} ${hours}` });
			} else {
				return itemTicket;
			}
		});

		setTickets(updateTickets);
		setDish(initialValueDish);
		setTicket(initialValueTicket);
	};

	const handleFinishTicket = async () => {
		// const { data } = await clientAxios.post('/recepcion', tickets);
		socket.emit('handleFinishticket', tickets);
		setTickets([]);
	};

	const contextValue = useMemo(
		() => ({
			selected,
			setSelected,
			ticket,
			setTicket,
			tickets,
			dish,
			setDish,
			setTickets,
			handleSubmitTicket,
			handleFinishTicket,
		}),
		[selected, dish, ticket, tickets]
	);

	return <RecepcionContext.Provider value={contextValue}>{children}</RecepcionContext.Provider>;
};
