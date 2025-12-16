import { useMemo, useState } from 'react';
import { v4 } from 'uuid';
import { RecepcionContext } from './recepcion-context';
import { useAuthProvider, useDate, useLocalStorage } from '@/hooks';
import { initialValueTicket } from '@/data';
import { Dish, Ticket } from '@/core/ticket/interfaces';
import { addToast } from '@heroui/react';

interface Props {
	children: JSX.Element | JSX.Element[];
}

const initialValueDish: Dish = {
	key: '',
	price: 0,
	dishFood: '',
	rice: false,
	salad: true,
};

export const RecepcionProvider = (props: Props): JSX.Element => {
	const { children } = props;
	const { date, hours } = useDate();
	const { auth } = useAuthProvider();
	const [selected, setSelected] = useState(['mayonesa', 'ketchup', 'mostaza']);
	const [dish, setDish] = useState<Dish>(initialValueDish);
	const [ticket, setTicket] = useState<Ticket>(initialValueTicket);
	const [tickets, setTickets] = useLocalStorage<Ticket[]>('tickets', []);

	const handleSubmitTicket = () => {
		if (ticket.nameTicket.length === 0) {
			addToast({
				description: 'El ticket debe tener un nombre',
				color: 'danger',
			});
			return;
		}

		if (ticket.key) {
			handleEditTicket();
			return;
		}

		handleAddTicket();
	};

	const handleAddTicket = () => {
		setTickets([...tickets, { ...ticket, key: v4(), time: `${date} ${hours}`, user: auth._id }]);
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
