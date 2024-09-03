import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { DishProps, TicketProps } from '@/types';
import { useAuthProvider, useDate, useLocalStorage } from '@/hooks';
import { initialValueTicket } from '@/data';

interface Props {
	children: JSX.Element | JSX.Element[];
}

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
	const [tickets, setTickets] = useLocalStorage<TicketProps[]>('tickets', []);

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

	const contextValue = useMemo(
		() => ({
			selected,
			setSelected,
			ticket,
			setTicket,
			tickets,
			setTickets,
			dish,
			setDish,
			handleSubmitTicket,
		}),
		[ticket, selected, dish, tickets]
	);

	return <RecepcionContext.Provider value={contextValue}>{children}</RecepcionContext.Provider>;
};
