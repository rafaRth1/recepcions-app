import { memo } from 'react';
import { Ticket } from '@/core/ticket/interfaces';
import { Button } from '@heroui/react';

interface Props {
	list: {
		id: number;
		key: string;
		name: string;
		orders: Ticket[];
	};
	handleFinishTicket: (id: string) => void;
	handleOnOpenModal: (ticket: Ticket) => void;
}

export const OrdersItem = memo(({ list, handleFinishTicket, handleOnOpenModal }: Props) => {
	return (
		<div className='flex-1 min-w-[350px] max-w-[450px]'>
			<div className='bg-neutral-900 rounded-xl h-full flex flex-col'>
				<div className='px-4 py-3 border-b border-neutral-800'>
					<h2 className='text-lg font-semibold text-center'>{list.name}</h2>
					<p className='text-xs text-neutral-400 text-center mt-1'>{list.orders.length} pedidos</p>
				</div>

				<div className='flex-1 overflow-y-auto p-4 space-y-3'>
					{list.orders.length === 0 ? (
						<div className='text-center py-12'>
							<p className='text-neutral-500 text-sm'>No hay pedidos</p>
						</div>
					) : (
						list.orders.map((ticket) => (
							<div
								key={ticket._id}
								className='bg-neutral-800 rounded-xl p-4 hover:border-indigo-600 transition-all'>
								<div className='flex items-start justify-between mb-3'>
									<div className='flex-1'>
										<div className='flex items-center gap-2 mb-1'>
											<span className='text-xs font-mono text-neutral-400'>#{ticket._id?.slice(-4)}</span>
										</div>
										<h3 className='font-bold text-base capitalize mb-1'>{ticket.nameTicket}</h3>
										<p className='text-sm text-neutral-400'>{ticket.dishes.length} platos</p>
									</div>
									<div className='text-right'>
										<p className='text-xl font-bold text-orange-500'>S/{ticket.totalPrice.toFixed(2)}</p>
									</div>
								</div>

								{/* Lista de platos */}
								<div className='mb-3 space-y-2'>
									{ticket.dishes.slice(0, 3).map((dish) => (
										<div
											key={dish._id}
											className='flex justify-between items-center text-sm bg-neutral-900 rounded-lg p-2'>
											<div className='flex-1'>
												<p className='capitalize text-neutral-200'>{dish.dishFood}</p>
												<div className='flex gap-2 text-xs text-neutral-500 mt-1'>
													{dish.rice && <span>🍚 Arroz</span>}
													{dish.salad && <span>🥗 Ensalada</span>}
												</div>
											</div>
											<p className='text-neutral-400 font-medium'>S/{dish.price.toFixed(2)}</p>
										</div>
									))}
									{ticket.dishes.length > 3 && (
										<p className='text-xs text-neutral-500 text-center'>+{ticket.dishes.length - 3} más...</p>
									)}
								</div>

								{/* Bebidas */}
								{ticket.drinks && ticket.drinks.length > 0 && (
									<div className='mb-3'>
										<p className='text-xs text-neutral-500 mb-1'>Bebidas:</p>
										<div className='flex flex-wrap gap-1'>
											{ticket.drinks.map((drink) => (
												<span
													key={drink._id}
													className='text-xs bg-neutral-900 px-2 py-1 rounded-md text-neutral-300'>
													{drink.name}
												</span>
											))}
										</div>
									</div>
								)}

								{/* Excepciones */}
								{ticket.exception && (
									<div className='mb-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-2'>
										<p className='text-xs text-yellow-500'>⚠️ {ticket.exception}</p>
									</div>
								)}

								{/* Tipo de pago */}
								{ticket.paymentType && (
									<div className='mb-3'>
										<span
											className={`inline-flex items-center gap-1 text-xs px-2 py-1 rounded-md ${
												ticket.paymentType === 'YAPE'
													? 'bg-purple-500/20 text-purple-400'
													: ticket.paymentType === 'PLIN'
													? 'bg-cyan-500/20 text-cyan-400'
													: 'bg-green-500/20 text-green-400'
											}`}>
											{ticket.paymentType === 'YAPE' && '💜'}
											{ticket.paymentType === 'PLIN' && '💙'}
											{ticket.paymentType === 'EFECTIVO' && '💵'}
											{ticket.paymentType}
										</span>
									</div>
								)}

								{/* Botones de acción */}
								<div className='grid grid-cols-2 gap-2'>
									<Button
										color='primary'
										onPress={() => handleOnOpenModal(ticket)}>
										Ver detalle
									</Button>
									<Button
										color='success'
										variant='flat'
										onPress={() => handleFinishTicket(ticket._id!)}>
										Finalizar
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
});
