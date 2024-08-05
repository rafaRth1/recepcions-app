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
];

const columnCream = [
	{
		key: 'creams',
		label: 'CREMAS',
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
				className='mb-5'>
				<TableHeader columns={columns}>{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}</TableHeader>
				<TableBody items={ticket.dishes}>
					{(item) => (
						<TableRow key={item.key}>
							<TableCell className='capitalize'>{item.dish_food}</TableCell>
							<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
							<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
							<TableCell className='capitalize'>{item.type}</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>

			<Table aria-label='Tabla tickets'>
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
		</div>
	);
};
