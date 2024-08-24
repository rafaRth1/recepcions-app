import { memo } from 'react';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { TicketProps } from '@/types';

interface Props {
	lists: {
		id: number;
		key: string;
		name: string;
		orders: TicketProps[];
	}[];
	handleFinishTicket: (id: string) => void;
	onOpen: () => void;
	handleOnOpenModal: (ticket: TicketProps) => void;
}

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
		key: 'price',
		label: 'PRICE',
	},
];

export const ContentOrder = memo(({ lists, handleFinishTicket, handleOnOpenModal }: Props) => {
	return (
		<section className='overflow-hidden grow relative h-full'>
			<div className='orders-content absolute overflow-x-auto p-4 inset-0 flex justify-between'>
				{lists.map((list) => (
					<div
						key={list.id}
						className='flex flex-col p-2 min-w-[420.53px]'>
						<h2 className='text-lg px-1 py-2 text-center font-semibold'>{list.name}</h2>

						{list.orders.map((ticket) => (
							<div
								key={ticket._id}
								className='mb-3'>
								<p className='mb-2'>{ticket.name_ticket}</p>
								<Table
									aria-label='Tabla ticket'
									className='mb-3'>
									<TableHeader columns={columns}>
										{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
									</TableHeader>
									<TableBody items={ticket.dishes}>
										{(item) => (
											<TableRow key={item._id}>
												<TableCell className='capitalize'>{item.dish_food}</TableCell>
												<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
												<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
												<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>

								{ticket.exception.length > 0 && (
									<p className='font-medium text-warning my-4 text-lg'>Excepción: {ticket.exception}</p>
								)}

								<div className='flex gap-2'>
									<Button
										color='danger'
										onPress={() => handleFinishTicket(ticket._id!)}
										className='w-full'>
										Terminar pedido
									</Button>

									<Button
										color='warning'
										onPress={() => handleOnOpenModal(ticket)}
										className='w-full'>
										Detalle pedido
									</Button>
								</div>
							</div>
						))}
					</div>
				))}
			</div>
		</section>
	);
});
