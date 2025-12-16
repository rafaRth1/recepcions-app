import { Button } from '@heroui/react';
import { useRecepcion } from '@/hooks';
import { IoTrash, IoReceipt } from 'react-icons/io5';
import { Creams, Drinks } from '@/core/ticket/interfaces';

export const Ticket = () => {
	const { ticket, setTicket } = useRecepcion();

	const handleDeleteDish = (itemKey: string) => {
		const [selectRemoveItem] = ticket.dishes.filter((dish) => dish.key === itemKey);
		const updateDishes = ticket.dishes.filter((dish) => dish.key !== itemKey);
		setTicket({ ...ticket, dishes: updateDishes, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	const handleDeleteCream = (item: Creams) => {
		const updateCreams = ticket.creams.filter((cream) => cream.key !== item.key);
		setTicket({ ...ticket, creams: updateCreams });
	};

	const handleDeleteDrink = (item: Drinks) => {
		const [selectRemoveItem] = ticket.drinks!.filter((drink) => drink._id === item._id);
		const updateCreams = ticket.drinks!.filter((drink) => drink._id_temp !== item._id_temp);
		setTicket({ ...ticket, drinks: updateCreams, totalPrice: ticket.totalPrice - selectRemoveItem.price });
	};

	// Si no hay items, mostrar empty state
	const hasItems = ticket.dishes.length > 0 || ticket.creams.length > 0 || (ticket.drinks && ticket.drinks.length > 0);

	return (
		<div className='mt-6'>
			<div className='flex items-center justify-between mb-4'>
				<h2 className='text-xl font-semibold text-neutral-100 flex items-center gap-2'>
					<IoReceipt size={24} />
					Pedido Actual
				</h2>

				{hasItems && (
					<div className='text-right'>
						<p className='text-xs text-neutral-400'>Total</p>
						<p className='text-2xl font-bold text-indigo-400'>S/{ticket.totalPrice.toFixed(2)}</p>
					</div>
				)}
			</div>

			{!hasItems ? (
				<div className='bg-neutral-900 rounded-xl p-8 text-center'>
					<IoReceipt
						size={48}
						className='mx-auto mb-3 text-neutral-600'
					/>
					<p className='text-neutral-400'>No hay items en el pedido</p>
					<p className='text-sm text-neutral-500 mt-1'>Agrega platillos, cremas o bebidas</p>
				</div>
			) : (
				<div>
					<div className='space-y-2'>
						{/* Platillos */}
						{ticket.dishes.map((dish) => (
							<div
								key={dish.key}
								className='bg-neutral-800 rounded-lg p-3 flex items-start gap-3'>
								<div className='flex-1'>
									<div className='flex items-start justify-between mb-1'>
										<p className='font-medium capitalize'>{dish.dishFood}</p>
										<p className='font-semibold text-indigo-400 ml-2'>S/{dish.price.toFixed(2)}</p>
									</div>
									<div className='flex gap-3 text-xs text-neutral-400'>
										<span>🍚 Arroz: {dish.rice ? 'Sí' : 'No'}</span>
										<span>🥗 Ensalada: {dish.salad ? 'Sí' : 'No'}</span>
									</div>
								</div>
								<Button
									isIconOnly
									size='sm'
									className='bg-red-900/50 hover:bg-red-900 min-w-8 h-8'
									onPress={() => handleDeleteDish(dish.key)}>
									<IoTrash
										size={16}
										className='text-red-400'
									/>
								</Button>
							</div>
						))}

						{/* Bebidas */}
						{ticket.drinks &&
							ticket.drinks.length > 0 &&
							ticket.drinks.map((drink) => (
								<div
									key={drink._id_temp}
									className='bg-neutral-800 rounded-lg p-3 flex items-center gap-3'>
									<div className='flex-1 flex items-center justify-between'>
										<p className='font-medium capitalize'>{drink.name}</p>
										<p className='font-semibold text-indigo-400 ml-2'>S/{drink.price.toFixed(2)}</p>
									</div>
									<Button
										isIconOnly
										size='sm'
										className='bg-red-900/50 hover:bg-red-900 min-w-8 h-8'
										onPress={() => handleDeleteDrink(drink)}>
										<IoTrash
											size={16}
											className='text-red-400'
										/>
									</Button>
								</div>
							))}

						{/* Cremas */}
						{ticket.creams.map((cream) => (
							<div
								key={cream.key}
								className='bg-neutral-800 rounded-lg p-3 flex items-center justify-between gap-3'>
								<div className='flex-1'>
									<p className='text-sm capitalize'>{Array.from(cream.creams).join(', ')}</p>
								</div>
								<Button
									isIconOnly
									size='sm'
									className='bg-red-900/50 hover:bg-red-900 min-w-8 h-8'
									onPress={() => handleDeleteCream(cream)}>
									<IoTrash
										size={16}
										className='text-red-400'
									/>
								</Button>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};
