import { Ticket } from '@/core/ticket/interfaces';
import { columnCream, columnDrink, columnFood } from '@/data/columns';
import {
	Modal,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@heroui/react';

interface Props {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
	selectTicket: Ticket;
}

export const DeliveryModal = ({ isOpen, onOpenChange, selectTicket }: Props) => {
	return (
		<>
			<Modal>
				<Modal.Backdrop isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
					<Modal.Container>
						<Modal.Dialog>
							<Modal.Header className='flex flex-col gap-1'>{`Detalles pedido "${selectTicket.nameTicket}"`}</Modal.Header>
							<Modal.Body>
								<Table
									aria-label='Tabla ticket'
									className='mb-3'>
									<TableHeader columns={columnFood}>
										{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
									</TableHeader>
									<TableBody items={selectTicket.dishes}>
										{(item) => (
											<TableRow key={item._id}>
												<TableCell className='capitalize'>{item.dishFood}</TableCell>
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
									<TableBody items={selectTicket.creams}>
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
									<TableBody items={selectTicket.drinks}>
										{(item) => (
											<TableRow key={item._id}>
												<TableCell className='capitalize'>{item.name}</TableCell>
												<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>

								<p className='text-right'>Total: S/{`${selectTicket.totalPrice.toFixed(2)}`}</p>

								{selectTicket.exception.length > 0 && (
									<p className='font-medium text-warning text-lg first-letter:uppercase'>
										Excepción: {selectTicket.exception}
									</p>
								)}

								{selectTicket.paymentType.length > 0 && (
									<p className='font-medium text-success text-lg first-letter:uppercase'>
										Tipo de pago: {selectTicket.paymentType}
									</p>
								)}
							</Modal.Body>
						</Modal.Dialog>
					</Modal.Container>
				</Modal.Backdrop>
			</Modal>
		</>
	);
};
