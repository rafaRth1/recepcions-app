import { Ticket } from '@/core/ticket/interfaces';
import { formatDateTime } from '@/utils/format-date-time';
import { Modal, ModalBody, ModalContent, ModalHeader, ModalFooter, Button, Chip } from '@heroui/react';
import {
	IoCloseCircle,
	IoCreateOutline,
	IoReceiptOutline,
	IoCheckmarkDoneOutline,
	IoAlertCircleOutline,
	IoTimerOutline,
	IoCalendarOutline,
	IoCashOutline,
} from 'react-icons/io5';

interface Props {
	isOpen: boolean;
	onOpenChange: () => void;
	selectTicket: Ticket;
}

export const OrdersModal = ({ isOpen, onOpenChange, selectTicket }: Props) => {
	const totalItems = selectTicket.dishes.length + (selectTicket.drinks?.length || 0);
	const subtotalSinIGV = selectTicket.totalPrice / 1.18;
	const igv = selectTicket.totalPrice - subtotalSinIGV;

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={onOpenChange}
			size='xl'
			scrollBehavior='inside'
			classNames={{
				base: 'bg-white dark:bg-neutral-900',
				backdrop: 'bg-black/50',
			}}>
			<ModalContent>
				{(onClose) => (
					<>
						{/* Header */}
						<ModalHeader className='border-b border-neutral-200 dark:border-neutral-800 px-4 py-3'>
							<div className='flex items-center justify-between w-full'>
								<h2 className='text-lg font-semibold'>Orden #{selectTicket._id?.slice(-4)}</h2>
								<Button
									size='sm'
									className='bg-orange-600 hover:bg-orange-500 text-white font-medium'
									startContent={<IoCreateOutline size={16} />}>
									Editar
								</Button>
							</div>
						</ModalHeader>

						<ModalBody className='px-4 py-3 space-y-3'>
							{/* Badges */}
							<div className='flex items-center gap-2'>
								<Chip
									size='sm'
									variant='flat'
									className='bg-orange-100 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400'
									startContent={<IoTimerOutline size={14} />}>
									Pendiente
								</Chip>
								<Chip
									size='sm'
									variant='flat'
									className='bg-neutral-100 dark:bg-neutral-800'>
									Mesa
								</Chip>
								<span className='text-sm text-orange-600 dark:text-orange-500 font-mono ml-auto'>
									#{selectTicket._id?.slice(-4)}
								</span>
							</div>

							{/* Fecha */}
							<div className='flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400'>
								<div className='flex items-center gap-1'>
									<IoCalendarOutline size={14} />
									<span>Creada {formatDateTime(selectTicket.createdAt)}</span>
								</div>
							</div>

							{/* Mesa */}
							<div className='border-t border-neutral-200 dark:border-neutral-800 pt-3'>
								<h3 className='font-semibold text-sm mb-2 flex items-center gap-1'>
									<IoReceiptOutline size={16} />
									Mesa
								</h3>
								<div className='flex items-start justify-between text-sm'>
									<div>
										<p className='font-medium capitalize'>{selectTicket.nameTicket}</p>
										<p className='text-xs text-neutral-500'>Mesa 1</p>
									</div>
									{/* <div className='text-right text-xs text-neutral-500'>
										<p>Capacidad</p>
										<p className='font-semibold text-neutral-900 dark:text-neutral-100'>4 personas</p>
									</div> */}
								</div>
							</div>

							{/* Items */}
							<div className='border-t border-neutral-200 dark:border-neutral-800 pt-3'>
								<h3 className='font-semibold text-sm mb-2 flex items-center gap-1'>
									<IoReceiptOutline size={16} />
									Items del pedido
									<span className='text-xs font-normal text-neutral-500 ml-1'>{totalItems} items</span>
								</h3>

								<div className='space-y-2'>
									{selectTicket.dishes.map((item) => (
										<div
											key={item._id}
											className='flex items-start justify-between'>
											<div className='flex-1'>
												<p className='text-sm font-medium'>1x {item.dishFood}</p>
												<p className='text-xs text-neutral-500'>S/ {item.price.toFixed(2)} c/u</p>
											</div>
											<p className='font-bold'>S/ {item.price.toFixed(2)}</p>
										</div>
									))}

									{selectTicket.drinks?.map((item) => (
										<div
											key={item._id}
											className='flex items-start justify-between'>
											<div className='flex-1'>
												<p className='text-sm font-medium'>1x {item.name}</p>
												<p className='text-xs text-neutral-500'>S/ {item.price.toFixed(2)} c/u</p>
											</div>
											<p className='font-bold'>S/ {item.price.toFixed(2)}</p>
										</div>
									))}
								</div>
							</div>

							{/* Subtotal */}
							<div className='border-t border-neutral-200 dark:border-neutral-800 pt-3'>
								<div className='flex items-center justify-between'>
									<span className='font-semibold'>Subtotal items</span>
									<span className='font-bold text-xl text-orange-600 dark:text-orange-500'>
										S/ {selectTicket.totalPrice.toFixed(2)}
									</span>
								</div>
							</div>

							{/* Resumen */}
							<div className='border-t border-neutral-200 dark:border-neutral-800 pt-3'>
								<h3 className='font-semibold text-sm mb-2 flex items-center gap-1'>
									<IoReceiptOutline size={16} />
									Resumen del pedido
								</h3>
								<div className='space-y-1 text-sm'>
									<div className='flex items-center justify-between'>
										<span className='text-neutral-500'>Items ({totalItems})</span>
										<span className='font-medium'>S/ {selectTicket.totalPrice.toFixed(2)}</span>
									</div>
									{/* <div className='flex items-center justify-between'>
										<span className='text-neutral-500'>Subtotal (sin IGV)</span>
										<span className='font-medium'>S/ {subtotalSinIGV.toFixed(2)}</span>
									</div> */}
									{/* <div className='flex items-center justify-between'>
										<span className='text-neutral-500'>IGV (18%)</span>
										<span className='font-medium'>S/ {igv.toFixed(2)}</span>
									</div> */}
								</div>
								{/* <p className='text-xs text-neutral-400 text-center mt-2'>*Los precios incluyen IGV</p> */}
							</div>

							{/* Cremas */}
							{selectTicket.creams && selectTicket.creams.length > 0 && (
								<div className='space-y-1'>
									<h4 className='text-xs font-semibold text-neutral-500'>Cremas:</h4>
									<div className='flex flex-wrap gap-1'>
										{selectTicket.creams.map((item) =>
											Array.from(item.creams).map((cream, idx) => (
												<Chip
													key={`${item._id}-${idx}`}
													size='sm'
													variant='flat'
													className='capitalize'>
													{cream}
												</Chip>
											))
										)}
									</div>
								</div>
							)}

							{/* Observaciones */}
							{selectTicket.exception && (
								<div className='bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-lg p-2'>
									<h3 className='font-semibold text-yellow-700 dark:text-yellow-500 text-xs mb-1 flex items-center gap-1'>
										<IoAlertCircleOutline size={14} />
										Observaciones
									</h3>
									<p className='text-xs text-neutral-700 dark:text-neutral-200'>{selectTicket.exception}</p>
								</div>
							)}

							{/* Pago */}
							{selectTicket.paymentType && (
								<div className='flex items-center justify-between'>
									<span className='text-sm font-semibold'>Método de pago:</span>
									<Chip
										variant='flat'
										size='sm'
										className={`${
											selectTicket.paymentType === 'YAPE'
												? 'bg-purple-100 text-purple-600 dark:bg-purple-600/20 dark:text-purple-400'
												: selectTicket.paymentType === 'PLIN'
												? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-600/20 dark:text-cyan-400'
												: 'bg-green-100 text-green-600 dark:bg-green-600/20 dark:text-green-400'
										} font-semibold`}
										startContent={<IoCashOutline size={14} />}>
										{selectTicket.paymentType}
									</Chip>
								</div>
							)}
						</ModalBody>

						{/* Footer */}
						<ModalFooter className='border-t border-neutral-200 dark:border-neutral-800 px-4 py-3 flex-col gap-2'>
							<div className='grid grid-cols-2 gap-2 w-full'>
								<Button
									size='lg'
									className='bg-orange-600 hover:bg-orange-500 text-white font-semibold'>
									<IoCheckmarkDoneOutline size={18} />
									Confirmar orden
								</Button>
								<Button
									size='lg'
									className='bg-green-600 hover:bg-green-500 text-white font-semibold'>
									Pago
								</Button>
							</div>
							<Button
								size='md'
								variant='light'
								color='danger'
								className='w-full'
								startContent={<IoCloseCircle size={18} />}
								onPress={onClose}>
								Cancelar orden
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
