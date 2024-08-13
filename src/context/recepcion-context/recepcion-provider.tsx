import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { DishProps, TicketProps } from '@/types';
import { useDate } from '@/hooks';
import { datatTickes } from '@/data/data-tickets';

// const socket = io('http://localhost:3000');

interface Props {
	children: JSX.Element | JSX.Element[];
}

const initialValueTicket: TicketProps = {
	key: '',
	name_ticket: '',
	dishes: [],
	creams: [],
	drinks: [],
	totalPrice: 0,
	exception: '',
	time: '',
	typePayment: '',
	status: 'process',
	type: 'table',
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
	const [selected, setSelected] = useState(['mayonesa', 'ketchup', 'mostaza']);

	const [dish, setDish] = useState<DishProps>(initialValueDish);
	const [ticket, setTicket] = useState<TicketProps>(initialValueTicket);
	const [tickets, setTickets] = useState<TicketProps[]>(datatTickes);

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
		setTickets([...tickets, { ...ticket, key: crypto.randomUUID(), time: `${date} ${hours}` }]);

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

	const handleFinishTicket = () => {
		// socket.emit('handleFinishticket', tickets);
		console.log(tickets);
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
