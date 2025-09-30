import { io } from 'socket.io-client';
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react";
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { useRecepcion } from '@/hooks';
// import { PDF } from '@/components';
import { columnFood, columnCream, columnDrink } from '@/data/columns';
import { TicketProps } from '@/types';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

export const Tickets = () => {
	const { tickets, setTickets, setTicket } = useRecepcion();

	const handleFinishTicket = async (ticketSelected: TicketProps) => {
		await socket.emit('handleFinishticket', ticketSelected);

		const ticketsUpdate = tickets.filter((ticket) => ticket.key !== ticketSelected.key);
		setTickets(ticketsUpdate);
	};

	const handleDeleteTicketTemporal = (ticket: TicketProps) => {
		const updateTickets = tickets.filter((ticketItem) => ticketItem.key !== ticket.key);
		setTickets(updateTickets);
	};

	return (
		<div>
			<h2 className='text-2xl text-center my-4'>Tickets</h2>

			{tickets.map((ticket) => (
				<div
					key={ticket.key}
					className='mb-3'>
					<div className='flex flex-col justify-center items-center mb-3 md:flex-row min-[663px]:gap-2 min-[663px]:justify-between'>
						<div className='flex items-center mb-2 min-[663px]:mb-0'>
							<h3 className='mr-5 capitalize'>{ticket.name_ticket}</h3>
							<h3 className='mr-5 capitalize'>
								{(ticket.type === 'table' && 'Para mesa') ||
									(ticket.type === 'delivery' && 'Para delivery') ||
									(ticket.type === 'pickup' && 'Llevar')}
							</h3>
							<p>{ticket.time}</p>
							<div className='flex-1' />
						</div>

						<div className='flex gap-2'>
							<div className='flex flex-col md:flex-row gap-2 md:flex-0'>
								{/* <Button className='bg-indigo-700 p-0'>
									<PDFDownloadLink
										className='bg-indigo-700 rounded-medium text-center w-full h-10 flex items-center'
										docume++nt={<PDF ticket={ticket} />}
										fileName='boleta.pdf'>
										{({ loading }) => {
											return loading ? <p className='flex-1'>Cargando</p> : <p className='flex-1'>Imprimir</p>;
										}}
									</PDFDownloadLink>
								</Button> */}

								<Button
									color='warning'
									onClick={() => setTicket(ticket)}>
									Editar
								</Button>
							</div>

							<div className='flex flex-col md:flex-row gap-2 md:flex-0'>
								<Button
									className=''
									color='danger'
									onClick={() => handleFinishTicket(ticket)}>
									Terminar
								</Button>

								<Button
									className='bg-red-800'
									onClick={() => handleDeleteTicketTemporal(ticket)}>
									Eliminar
								</Button>
							</div>
						</div>
					</div>

					<Table
						aria-label='Tabla ticket'
						className='mb-3'>
						<TableHeader columns={columnFood}>
							{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
						</TableHeader>
						<TableBody items={ticket.dishes}>
							{(item) => (
								<TableRow key={item.key}>
									<TableCell className='capitalize'>{item.dish_food}</TableCell>
									<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
									<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
									<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					<Table
						aria-label='Tabla creams'
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
								<TableRow key={item._id_temp}>
									<TableCell className='capitalize'>{item.name}</TableCell>
									<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>

					<p className='text-right'>Total: S/{`${ticket.total_price.toFixed(2)}`}</p>

					{ticket.exception.length > 0 && <p className='font-medium text-warning'>Excepción: {ticket.exception}</p>}
				</div>
			))}
		</div>
	);
};
