import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { columns, columnCream, columnDrink } from '@/data/columns';

export const Tickets = () => {
	const { tickets, setTicket } = useRecepcion();

	return (
		<div>
			<h2 className='text-2xl text-center my-4'>Tickets</h2>

			{tickets.map((ticket) => (
				<div
					key={ticket.key}
					className='mb-3'>
					<div className='flex items-center mb-3 '>
						<h3 className='mr-5 capitalize'>{ticket.name_ticket}</h3>
						<p>{ticket.time}</p>
						<div className='flex-1' />
						<Button
							color='warning'
							onClick={() => setTicket(ticket)}>
							Editar
						</Button>
					</div>

					<Table
						aria-label='Tabla ticket'
						className='mb-3'>
						<TableHeader columns={columns}>
							{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
						</TableHeader>
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

					{ticket.exception.length > 0 && <p className='font-medium text-warning'>Excepción: {ticket.exception}</p>}
				</div>
			))}
		</div>
	);
};
