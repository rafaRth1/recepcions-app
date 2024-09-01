import { memo, useState } from 'react';
import {
	Button,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';
import { columnFood } from '@/data/columns';
import { clientAxios, pickColor } from '@/utils';
import { TicketProps } from '@/types';

interface Props {
	ticket: TicketProps;
	handleFinishDeliveryTicket: (id: string) => Promise<void>;
	handleOnOpenModal: (ticket: TicketProps) => void;
}

export const DeliveryItem = memo(({ ticket, handleFinishDeliveryTicket, handleOnOpenModal }: Props) => {
	const [color, setColor] = useState(ticket.color);

	const handleEditColorTicket = async (colorTicket: string) => {
		try {
			const { data } = await clientAxios.put(`/recepcion/store/${ticket._id}`, {
				color: colorTicket,
			});

			console.log(data);

			setColor(colorTicket);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='min-w-[420.53px] mb-5 h-fit'>
			<div className='flex items-center mb-2'>
				<h3 className='mr-5 capitalize font-bold text-lg'>{ticket.name_ticket}</h3>
				<p className='text-neutral-400 mr-3'>{ticket.time}</p>
				<div className='flex-1' />
				<Popover
					placement='bottom'
					classNames={{
						content: 'rounded-lg',
					}}>
					<PopoverTrigger>
						<Button style={{ background: color }}></Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className='flex gap-2'>
							{pickColor.map((color) => (
								<div
									onClick={() => handleEditColorTicket(color.color)}
									key={color.name}
									className='w-[40px] h-[40px] rounded-md cursor-pointer'
									style={{ background: `${color.color}` }}
								/>
							))}
						</div>
					</PopoverContent>
				</Popover>
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

			{ticket.exception.length > 0 && <p className='font-medium text-warning my-4 text-lg'>Excepción: {ticket.exception}</p>}

			<div className='flex gap-2'>
				<Button
					color='danger'
					onPress={() => handleFinishDeliveryTicket(ticket._id!)}
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
	);
});
