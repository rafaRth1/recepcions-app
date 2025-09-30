import { memo } from 'react';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
import { columnFood } from '@/data';
import { TicketProps } from '@/types';

interface Props {
	list: {
		id: number;
		key: string;
		name: string;
		orders: TicketProps[];
	};
	handleFinishTicket: (id: string) => void;
	handleOnOpenModal: (ticket: TicketProps) => void;
}

export const OrdersItem = memo(({ list, handleFinishTicket, handleOnOpenModal }: Props) => {
	return (
		<div className='flex flex-col p-2 min-w-[420.53px]'>
			<h2 className='text-lg px-1 py-2 text-center font-semibold'>{list.name}</h2>

			{list.orders.map((ticket) => (
				<div
					className='mb-3'
					key={ticket._id}>
					<div className='flex items-center mb-2'>
						<h3 className='mr-5 capitalize font-bold text-lg'>{ticket.name_ticket}</h3>
						<p className='text-neutral-400'>{ticket.time}</p>
					</div>
					<Table
						aria-label='Tabla ticket'
						className='mb-3'
						classNames={{
							th: 'bg-transparent',
						}}>
						<TableHeader columns={columnFood}>
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
	);
});
