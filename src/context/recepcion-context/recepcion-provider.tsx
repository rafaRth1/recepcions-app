import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { foods } from '@/data/food';
import { DishProps, FoodProps, TicketProps } from '@/types';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const RecepcionProvider = (props: Props): JSX.Element => {
	const { children } = props;
	const [selected, setSelected] = useState(['mayonesa', 'ketchup', 'mostaza']);
	const [resultDishes, setResulDishes] = useState<FoodProps[]>(foods);
	const [dish, setDish] = useState<DishProps>({
		key: '',
		price: 0,
		dish_food: '',
		rice: false,
		salad: true,
		type: 'mesa',
	});
	const [ticket, setTicket] = useState<TicketProps>({
		key: '',
		name_ticket: '',
		dishes: [],
		creams: [],
		drinks: [],
		totalPrice: 0,
		exception: '',
	});
	const [tickets, setTickets] = useState<TicketProps[]>([]);

	const handleAddTicket = () => {
		if (ticket.name_ticket.length === 0) {
			console.log('Ingresar nombre de ticket');
			return;
		}

		setTickets([...tickets, { ...ticket, key: crypto.randomUUID() }]);

		setDish({
			key: '',
			dish_food: '',
			price: 0,
			rice: false,
			salad: true,
			type: 'mesa',
		});

		setTicket({
			key: '',
			name_ticket: '',
			dishes: [],
			creams: [],
			drinks: [],
			totalPrice: 0,
			exception: '',
		});
	};

	const handleFinishTicket = () => {
		console.log('Mandar a cocinar');
	};

	const contextValue = useMemo(
		() => ({
			selected,
			setSelected,
			resultDishes,
			setResulDishes,
			ticket,
			setTicket,
			tickets,
			dish,
			setDish,
			setTickets,
			handleAddTicket,
			handleFinishTicket,
		}),
		[selected, resultDishes, dish, ticket, tickets]
	);

	return <RecepcionContext.Provider value={contextValue}>{children}</RecepcionContext.Provider>;
};
