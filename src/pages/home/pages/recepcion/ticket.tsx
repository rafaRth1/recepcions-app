import { Button } from "@heroui/react";
import { useRecepcion } from '@/hooks';
import { columnCream, columnDrink, columnFood } from '@/data/columns';
import { CreamsProps, Drinks } from '@/types';
import { IoTrash } from 'react-icons/io5';

export const Ticket = () => {
	const { ticket, setTicket } = useRecepcion();

	const handleDeleteDish = (itemKey: string) => {
		const [selectRemoveItem] = ticket.dishes.filter((dish) => dish.key === itemKey);
		const updateDishes = ticket.dishes.filter((dish) => dish.key !== itemKey);
		setTicket({ ...ticket, dishes: updateDishes, total_price: ticket.total_price - selectRemoveItem.price });
	};

	const handleDeleteCream = (item: CreamsProps) => {
		const updateCreams = ticket.creams.filter((cream) => cream.key !== item.key);

		setTicket({ ...ticket, creams: updateCreams });
	};

	const handleDeleteDrink = (item: Drinks) => {
		const [selectRemoveItem] = ticket.drinks!.filter((drink) => drink._id === item._id);
		const updateCreams = ticket.drinks!.filter((drink) => drink._id_temp !== item._id_temp);

		setTicket({ ...ticket, drinks: updateCreams, total_price: ticket.total_price - selectRemoveItem.price });
	};

	return (
		<div>
			<h2 className='text-2xl text-center my-4'>Ticket</h2>

			<table className='table-auto w-full'>
				<thead className='w-full'>
					<tr className=''>
						{[...columnFood, { key: 'action', label: 'ACCION' }].map((column) => (
							<th
								key={column.key}
								className='text-xs font-semibold text-foreground-500 text-start px-3 h-10 bg-default-100 first:rounded-l-lg last:rounded-r-lg '>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{ticket.dishes.map((dish) => (
						<tr key={dish.key}>
							<td
								style={{ width: `40%` }}
								className='text-sm px-3 py-2'>
								{dish.dish_food}
							</td>
							<td className='text-sm px-3 py-2 flex-1 text-start'>{dish.rice ? 'Si' : 'No'}</td>
							<td className='text-sm px-3 py-2 flex-1 text-start'>{dish.salad ? 'Si' : 'No'}</td>
							<td className='text-sm px-3 py-2 flex-1 text-start'>S/{dish.price.toFixed(2)}</td>
							<td>
								<Button
									className='bg-transparent'
									onClick={() => handleDeleteDish(dish.key)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<table className='table-auto w-full mt-5'>
				<thead className='w-full'>
					<tr className=''>
						{[...columnCream, { key: 'action', label: 'ACCION' }].map((column) => (
							<th
								key={column.key}
								className={`text-xs font-semibold  text-foreground-500 text-start px-3 h-10 bg-default-100 first:rounded-l-lg last:rounded-r-lg ${
									column.key === 'creams' && 'w-full'
								}`}>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{ticket.creams.map((cream) => (
						<tr key={cream.key}>
							<td
								style={{ width: `40%` }}
								className='text-sm px-3 py-2 capitalize'>
								{Array.from(cream.creams).join(', ')}
							</td>

							<td>
								<Button
									className='bg-transparent'
									onClick={() => handleDeleteCream(cream)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<table className='table-auto w-full mt-5'>
				<thead className='w-full'>
					<tr>
						{[...columnDrink, { key: 'action', label: 'ACCION' }].map((column) => (
							<th
								key={column.key}
								className='text-xs font-semibold text-foreground-500 text-start px-3 h-10 bg-default-100 first:rounded-l-lg last:rounded-r-lg '>
								{column.label}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{ticket.drinks!.map((drink) => (
						<tr key={drink._id_temp}>
							<td
								style={{ width: `40%` }}
								className='text-sm px-3 py-2'>
								{drink.name}
							</td>
							<td className='text-sm px-3 py-2 flex-1 text-start'>S/{drink.price.toFixed(2)}</td>
							<td>
								<Button
									className='bg-transparent'
									onClick={() => handleDeleteDrink(drink)}>
									<IoTrash
										className='text-rose-700'
										size={20}
									/>
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<p className='text-right mt-3'>Total: S/{`${ticket.total_price.toFixed(2)}`}</p>
		</div>
	);
};
