import { TicketProps } from '@/types';

export const datatTickes: TicketProps[] = [
	{
		key: '6ce9d1da-5afd-4325-a502-56f3337c77a9',
		name_ticket: 'Mesa 1',
		status: 'process',
		user: '',
		_id: '',
		dishes: [
			{
				key: '4f5a1256-bc17-46e4-81f7-564450e7f28a',
				price: 26,
				dish_food: '12 BBQ',
				rice: true,
				salad: true,
			},
			{
				key: '4f5a1256-bc17-46e4-81f7-564450e7f28b',
				price: 10,
				dish_food: '1 Clasica',
				rice: true,
				salad: true,
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
		total_price: 39,
		exception: 'No colocarle sal a los platos',
		time: '10/8/24 12:40 AM',
		type_payment: 'yape',
		type: 'table',
	},
	{
		key: '6ce9d1da-5afd-4325-a502-56f3337c77a8',
		name_ticket: 'Mesa 2',
		status: 'process',
		user: '',
		_id: '',
		dishes: [
			{
				key: '4f5a1256-bc17-46e4-81f7-564450e7f28b',
				price: 13,
				dish_food: 'Encuentro Broaster',
				rice: true,
				salad: true,
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
		total_price: 16,
		exception: '',
		time: '10/8/24 12:40 AM',
		type_payment: 'paga con yape',
		type: 'table',
	},
];

export const listOrders = [
	{
		id: 1,
		type: 'Mesa',
		orders: [
			{
				key: '6ce9d1da-5afd-4325-a502-56f3337c77a1',
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
					{
						key: '4f5a1256-bc17-46e4-81f7-564450e7f28c',
						price: 13,
						dish_food: 'Pecho Broaster',
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
		],
	},
	{
		id: 2,
		type: 'Llevar',
		orders: [
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
					{
						key: '4f5a1256-bc17-46e4-81f7-564450e7f28c',
						price: 13,
						dish_food: 'Pecho Broaster',
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
				exception: 'No colocarle sal a las papas.',
				time: '10/8/24 12:40 AM',
			},
		],
	},
	{
		id: 3,
		type: 'Delivery',
		orders: [
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
					{
						key: '4f5a1256-bc17-46e4-81f7-564450e7f28c',
						price: 13,
						dish_food: 'Pecho Broaster',
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
		],
	},
];
