import { PDF } from '@/components';
import { columnCream, columnDrink, columns } from '@/data/columns';
import { useAuthProvider } from '@/hooks';
import { TicketProps } from '@/types';
import clientAxios from '@/utils/client-axios';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	Button,
	useDisclosure,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@nextui-org/react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { useEffect, useState } from 'react';

export const HeaderRecepcion = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { auth } = useAuthProvider();
	const [ticketsUser, setTickestUser] = useState<TicketProps[]>([]);

	const handleDeleteTicket = async (id: string) => {
		const confirmUser = confirm('Estas seguro de eliminar el ticket');

		if (!confirmUser) return;

		try {
			const { data } = await clientAxios.delete(`/recepcion/${id}`);

			console.log(data);

			const updateTicketsUser = ticketsUser.filter((ticket) => ticket._id !== id);

			setTickestUser(updateTicketsUser);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const getLists = async () => {
			const { data } = await clientAxios<TicketProps[]>(`/recepcion/${auth._id}`);
			setTickestUser(data);
		};

		getLists();
	}, []);

	return (
		<div className='flex justify-between'>
			<h1 className='text-neutral-100 text-2xl font-semibold mb-5'>Sección de recepciones</h1>
			<Button
				className='bg-indigo-700'
				onPress={onOpen}>
				Total tickets
			</Button>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior='outside'
				size='lg'>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'></ModalHeader>
							<ModalBody>
								<div>
									<h2 className='text-2xl text-center my-4'>Tickets</h2>

									{ticketsUser.map((ticket) => (
										<div
											key={ticket._id}
											className='mb-5'>
											<div className='flex items-center mb-3 '>
												<h3 className='mr-5 capitalize'>{ticket.name_ticket}</h3>
												<h3 className='mr-5 capitalize'>
													{(ticket.type === 'table' && 'Para mesa') ||
														(ticket.type === 'delivery' && 'Para delivery') ||
														(ticket.type === 'pickup' && 'Llevar')}
												</h3>
												<p>{ticket.time}</p>
												<div className='flex-1' />

												{/* <Button
													color='warning'
													onClick={() => setTicket(ticket)}>
													Editar
												</Button> */}
											</div>

											<div className='mb-3'>
												<PDFDownloadLink
													document={<PDF ticket={ticket} />}
													fileName='boleta.pdf'>
													{({ loading }) => {
														return loading ? (
															<Button
																className='bg-indigo-700 mr-3'
																disabled>
																Cargando....
															</Button>
														) : (
															<Button className='bg-indigo-700 mr-3'>Imprimir Ticket</Button>
														);
													}}
												</PDFDownloadLink>

												<Button
													color='danger'
													onClick={() => handleDeleteTicket(ticket._id!)}>
													Eliminar Ticket
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
														<TableRow key={item._id}>
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
														<TableRow key={item._id}>
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

											<p className='text-right'>Total: S/{`${ticket.total_price.toFixed(2)}`}</p>

											{ticket.exception.length > 0 && (
												<p className='font-medium text-warning'>Excepción: {ticket.exception}</p>
											)}
										</div>
									))}
								</div>
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</div>
	);
};
