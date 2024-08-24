import { columnCream, columnDrink, columns } from '@/data/columns';
import { TicketProps } from '@/types';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
} from '@nextui-org/react';

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	selectTicket: TicketProps;
}

export const ModalDetailsOrder = ({ isOpen, onOpenChange, selectTicket }: Props) => {
	return (
		<>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				isDismissable={false}
				isKeyboardDismissDisabled={true}>
				<ModalContent>
					{() => (
						<>
							<ModalHeader className='flex flex-col gap-1'>{`Detalles pedido "${selectTicket.name_ticket}"`}</ModalHeader>
							<ModalBody>
								<Table
									aria-label='Tabla ticket'
									className='mb-3'>
									<TableHeader columns={columns}>
										{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
									</TableHeader>
									<TableBody items={selectTicket.dishes}>
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
											<TableRow key={item.id}>
												<TableCell className='capitalize'>{item.name}</TableCell>
												<TableCell className='capitalize'>S/{item.price.toFixed(2)}</TableCell>
											</TableRow>
										)}
									</TableBody>
								</Table>

								<p className='text-right'>Total: S/{`${selectTicket.total_price.toFixed(2)}`}</p>

								{selectTicket.exception.length > 0 && (
									<p className='font-medium text-warning text-lg first-letter:uppercase'>
										Excepción: {selectTicket.exception}
									</p>
								)}

								{selectTicket.type_payment.length > 0 && (
									<p className='font-medium text-success text-lg first-letter:uppercase'>
										Tipo de pago: {selectTicket.type_payment}
									</p>
								)}
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
