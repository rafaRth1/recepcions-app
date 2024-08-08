import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';

interface Props {}

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

const columnCream = [
	{
		key: 'creams',
		label: 'CREMAS',
	},
];

const columnDrink = [
	{
		key: 'name',
		label: 'BEBIDA',
	},

	{
		key: 'price',
		label: 'PRECIO',
	},
];

export const Ticket = (props: Props) => {
	const {} = props;
	const { ticket } = useRecepcion();

	return (
		<div>
			<h2 className='text-2xl text-center my-4'>Ticket</h2>

			<Table
				aria-label='Tabla ticket'
				className='mb-3'>
				<TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
				<TableBody items={ticket.dishes}>
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

			<Table
				aria-label='Tabla tickets'
				className='mb-3'>
				<TableHeader columns={columnCream}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={ticket.creams}>
					{(item) => (
						<TableRow key={item.key}>
							<TableCell className='capitalize'>{Array.from(item.creams).join(', ')}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<Table
				aria-label='Table drink'
				className='mb-3'>
				<TableHeader columns={columnDrink}>
					{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
				</TableHeader>
				<TableBody items={ticket.drinks}>
					{(item) => (
						<TableRow key={item.id}>
							<TableCell className='capitalize'>{item.name}</TableCell>
							<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<p className='text-right'>Total: S/{`${ticket.totalPrice.toFixed(2)}`}</p>
		</div>
	);
};
