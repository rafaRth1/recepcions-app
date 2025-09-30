import { useEffect, useState } from 'react';
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
	RadioGroup,
	Radio,
} from '@heroui/react';
import { io } from 'socket.io-client';
import { clientAxios } from '@/utils';
// import { PDF } from '@/components';
import { useAuthProvider, useRecepcion } from '@/hooks';
import { columnCream, columnDrink, columnFood } from '@/data/columns';
// import { PDFDownloadLink } from '@react-pdf/renderer';
import { TicketProps } from '@/types';

const socket = io(import.meta.env.VITE_BACKEND_URL, { transports: ['websocket', 'polling', 'flashsocket'] });

export const HeaderRecepcion = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { auth } = useAuthProvider();
	const [ticketsUser, setTickestUser] = useState<TicketProps[]>([]);
	const { ticket, setTicket } = useRecepcion();

	const handleDeleteTicket = async (id: string) => {
		const confirmUser = confirm('Estas seguro de eliminar el ticket');

		if (!confirmUser) return;

		try {
			const { data } = await clientAxios.delete(`/recepcion/store/${id}`);

			console.log(data);

			const updateTicketsUser = ticketsUser.filter((ticket) => ticket._id !== id);

			setTickestUser(updateTicketsUser);
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddNewTicket = (ticket: TicketProps[]) => {
		setTickestUser([...ticketsUser, ...ticket]);
	};

	const handleOnChangeType = (e: string) => {
		if (e === 'table' || e === 'pickup' || e === 'delivery') {
			setTicket({ ...ticket, type: e });
		}
	};

	useEffect(() => {
		socket.on('responseFinishTicket', handleAddNewTicket);
	}, [ticketsUser]);

	useEffect(() => {
		const getLists = async () => {
			const { data } = await clientAxios<TicketProps[]>(`/recepcion/store/${auth._id}`);
			setTickestUser(data);
		};

		getLists();
	}, []);

	return (
		<div className='flex flex-col justify-between mb-3'>
			<h1 className='text-neutral-100 text-2xl font-semibold mb-5'>Sección de recepciones</h1>

			<div className='mb-3'>
				<Button
					className='bg-indigo-700'
					onPress={onOpen}>
					Total tickets
				</Button>
			</div>

			<RadioGroup
				className='mb-4'
				label='Tipo de pedido'
				orientation='horizontal'
				value={ticket.type}
				onValueChange={(e) => handleOnChangeType(e)}>
				<Radio value='table'>Mesa</Radio>
				{auth._id !== '66ca1a4629083aa6f3174bf5' && <Radio value='delivery'>Delivery</Radio>}
				<Radio value='pickup'>Recojo</Radio>
			</RadioGroup>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				scrollBehavior='inside'
				motionProps={{
					variants: {
						enter: {
							y: 0,
							opacity: 1,
							transition: {
								duration: 0.3,
								ease: 'easeOut',
							},
						},
						exit: {
							y: -20,
							opacity: 0,
							transition: {
								duration: 0.2,
								ease: 'easeIn',
							},
						},
					},
				}}
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
											</div>

											<div className='mb-3'>
												{/* <PDFDownloadLink
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
															<Button className='bg-indigo-700 mr-3'>Imprimir</Button>
														);
													}}
												</PDFDownloadLink> */}

												<Button
													color='danger'
													onClick={() => handleDeleteTicket(ticket._id!)}>
													Eliminar
												</Button>
											</div>

											<Table
												aria-label='Tabla ticket'
												className='mb-3'>
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
														<TableRow key={item._id}>
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
