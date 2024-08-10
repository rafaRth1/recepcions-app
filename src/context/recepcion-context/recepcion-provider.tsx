import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { foods } from '@/data/food';
import { DishProps, FoodProps, TicketProps } from '@/types';
import { useDate } from '@/hooks';

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const RecepcionProvider = (props: Props): JSX.Element => {
	const { children } = props;
	const { date, hours } = useDate();
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
		time: '',
	});
	const [tickets, setTickets] = useState<TicketProps[]>([
		{
			key: '6ce9d1da-5afd-4325-a502-56f3337c77a9',
			name_ticket: 'Mesa 1',
			dishes: [
				{
					key: '4f5a1256-bc17-46e4-81f7-564450e7f28a',
					price: 26,
					dish_food: '12 BBQ',
					rice: true,
					salad: true,
					type: 'mesa',
				},
				{
					key: '4f5a1256-bc17-46e4-81f7-564450e7f28b',
					price: 26,
					dish_food: '12 Acevichada',
					rice: true,
					salad: true,
					type: 'mesa',
				},
			],
			creams: [
				{
					key: 'a67111c8-d7ce-401d-bfe9-9d8cda3d98bf',
					creams: ['mayonesa', 'ketchup', 'mostaza'],
				},
			],
			drinks: [
				{
					id: 'b9deac6e-3a0c-4eb4-8957-bbc2ef0f7a2d',
					key: 'chicha 1/2',
					name: 'Chicha 1/2',
					price: 3,
				},
			],
			totalPrice: 29,
			exception: 'No colocarle sal a los platos',
			time: '10/8/24 12:40 AM',
		},
		{
			key: '6ce9d1da-5afd-4325-a502-56f3337c77a8',
			name_ticket: 'Mesa 2',
			dishes: [
				{
					key: '4f5a1256-bc17-46e4-81f7-564450e7f28b',
					price: 13,
					dish_food: 'Encuentro Broaster',
					rice: true,
					salad: true,
					type: 'mesa',
				},
			],
			creams: [
				{
					key: 'a67111c8-d7ce-401d-bfe9-9d8cda3d98bz',
					creams: ['mayonesa', 'ketchup', 'mostaza', 'golf'],
				},
			],
			drinks: [
				{
					id: 'b9deac6e-3a0c-4eb4-8957-bbc2ef0f7a2e',
					key: 'chicha 1/2',
					name: 'Chicha 1/2',
					price: 3,
				},
			],
			totalPrice: 16,
			exception: '',
			time: '10/8/24 12:40 AM',
		},
	]);

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
			time: '',
		});
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
			time: '',
		});
	};

	const handleFinishTicket = () => {
		console.log(tickets);
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
			handleSubmitTicket,
			handleFinishTicket,
		}),
		[selected, resultDishes, dish, ticket, tickets]
	);

	return <RecepcionContext.Provider value={contextValue}>{children}</RecepcionContext.Provider>;
};
