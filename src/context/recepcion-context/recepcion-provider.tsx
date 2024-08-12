import { useMemo, useState } from 'react';
import { RecepcionContext } from './recepcion-context';
import { DishProps, TicketProps } from '@/types';
import { useDate } from '@/hooks';

// const socket = io('http://localhost:3000');

interface Props {
	children: JSX.Element | JSX.Element[];
}

export const RecepcionProvider = (props: Props): JSX.Element => {
	const { children } = props;
	const { date, hours } = useDate();
	const [selected, setSelected] = useState(['mayonesa', 'ketchup', 'mostaza']);

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
		typePayment: '',
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
					price: 10,
					dish_food: '1 Clasica',
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
			totalPrice: 39,
			exception: 'No colocarle sal a los platos',
			time: '10/8/24 12:40 AM',
			typePayment: 'yape',
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
			typePayment: 'paga con yape',
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
			typePayment: '',
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
			typePayment: '',
		});
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
