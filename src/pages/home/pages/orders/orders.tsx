import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

// const socket = io('http://localhost:3000');

const columns = [
	{
		key: 'dish_food',
		label: 'NOMBRE',
	},
	{
		key: 'rice',
		label: 'ARROZ',
	},
	{
		key: 'salad',
		label: 'ENSALADA',
	},
	{
		key: 'type',
		label: 'TIPO',
	},
	{
		key: 'price',
		label: 'PRICE',
	},
];

const listOrders = [
	{
		id: 1,
		type: 'Mesa',
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

export const Orders = () => {
	return (
		<main className='p-4 h-[100dvh]'>
			<h1 className='text-xl mb-5'>Sección de pedidos</h1>

			<section className='flex justify-between'>
				{listOrders.map((list) => (
					<div
						key={list.id}
						className='flex flex-col'>
						<h2 className='text-lg px-1 py-2 mb-2 text-center rounded-md bg-neutral-900'>{list.type}</h2>

						{list.orders.map((order) => (
							<div key={order.key}>
								<p className='mb-2'>{order.name_ticket}</p>
								<Table
									aria-label='Tabla ticket'
									className='mb-3'>
									<TableHeader columns={columns}>
										{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
									</TableHeader>
									<TableBody items={order.dishes}>
										{(item) => (
											<TableRow key={item.key}>
												<TableCell className='capitalize'>{item.dish_food}</TableCell>
												<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
												<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
												<TableCell className='capitalize'>{item.type}</TableCell>
												<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>
								{order.exception.length > 0 && <p className='font-medium text-warning'>Excepción: {order.exception}</p>}
							</div>
						))}
					</div>
				))}
			</section>
		</main>
	);
};
