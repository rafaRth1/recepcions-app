import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { CreamsProps, DishProps, Drinks } from '@/types';
import { columnCream, columnDrink, columns } from '@/data/columns';
import { IoTrash } from 'react-icons/io5';

export const Ticket = () => {
	const { ticket, setTicket } = useRecepcion();

	const handleDeleteDish = (item: DishProps) => {
		const [selectRemoveItem] = ticket.dishes.filter((dish) => dish.key === item.key);
		const updateDishes = ticket.dishes.filter((dish) => dish.key !== item.key);

		setTicket({ ...ticket, dishes: updateDishes, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	const handleDeleteCream = (item: CreamsProps) => {
		const updateCreams = ticket.creams.filter((cream) => cream.key !== item.key);

		setTicket({ ...ticket, creams: updateCreams });
	};

	const handleDeleteDrink = (item: Drinks) => {
		const [selectRemoveItem] = ticket.drinks!.filter((drink) => drink.id === item.id);
		const updateCreams = ticket.drinks!.filter((drink) => drink.key !== item.key);

		setTicket({ ...ticket, drinks: updateCreams, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	return (
		<div>
			<h2 className='text-2xl text-center my-4'>Ticket</h2>

			<Table
				aria-label='Tabla ticket'
				className='mb-3'>
				<TableHeader columns={[...columns, { key: 'action', label: 'ACTIÓN' }]}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={ticket.dishes}>
					{(item) => (
						<TableRow key={item.key}>
							<TableCell className='capitalize'>{item.dish_food}</TableCell>
							<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
							<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
							<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
							<TableCell>
								<Button
									className='bg-transparent'
									onPress={() => handleDeleteDish(item)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<Table
				aria-label='Tabla tickets'
				className='mb-3'>
				<TableHeader columns={[...columnCream, { key: 'action', label: 'ACTIÓN' }]}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={ticket.creams}>
					{(item) => (
						<TableRow key={item.key}>
							<TableCell className='capitalize'>{Array.from(item.creams).join(', ')}</TableCell>
							<TableCell>
								<Button
									className='bg-transparent'
									onPress={() => handleDeleteCream(item)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<Table
				aria-label='Table drink'
				className='mb-3'>
				<TableHeader columns={[...columnDrink, { key: 'action', label: 'ACTIÓN' }]}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={ticket.drinks}>
					{(item) => (
						<TableRow key={item.id}>
							<TableCell className='capitalize'>{item.name}</TableCell>
							<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
							<TableCell>
								<Button
									className='bg-transparent'
									onPress={() => handleDeleteDrink(item)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<p className='text-right'>Total: S/{`${ticket.totalPrice.toFixed(2)}`}</p>
		</div>
	);
};
