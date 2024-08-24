import { GiCardPickup, GiTable } from 'react-icons/gi';
import { GrMoney } from 'react-icons/gr';
import { MdDeliveryDining, MdRestaurantMenu } from 'react-icons/md';

export const Statistics = () => {
	return (
		<main className='p-4'>
			<div className='flex gap-3'>
				<div className='relative flex-1 p-4 bg-default-100 rounded-lg'>
					<h2 className='font-medium text-xl'>Total ganancias</h2>
					<GrMoney
						className='absolute right-3 bottom-3 text-green-500 p-2 rounded-full bg-green-200'
						size={40}
					/>
					<p className='text-neutral-400 mb-3'>Hoy día</p>
					<p className='text-xl font-semibold'>S/1000</p>
				</div>
				<div className='relative flex-1 p-4 bg-default-100 rounded-lg'>
					<h2 className='font-medium text-xl'>Total pedidos Mesa</h2>
					<GiTable
						className='absolute right-3 bottom-3 text-orange-500 p-2 rounded-full bg-orange-200'
						size={40}
					/>
					<p className='text-neutral-400 mb-3'>Hoy día</p>
					<p className='text-xl font-semibold'>32</p>
				</div>
				<div className='relative flex-1 p-4 bg-default-100 rounded-lg'>
					<h2 className='font-medium text-xl'>Total pedidos Delivery</h2>
					<MdDeliveryDining
						className='absolute right-3 bottom-3 text-sky-500 p-2 rounded-full bg-sky-200'
						size={40}
					/>
					<p className='text-neutral-400 mb-3'>Hoy día</p>
					<p className='text-xl font-semibold'>60</p>
				</div>
				<div className='relative flex-1 p-4 bg-default-100 rounded-lg'>
					<h2 className='font-medium text-xl'>Total pedidos Recojo</h2>
					<GiCardPickup
						className='absolute right-3 bottom-3 text-fuchsia-500 p-2 rounded-full bg-fuchsia-200'
						size={40}
					/>
					<p className='text-neutral-400 mb-3'>Hoy día</p>
					<p className='text-xl font-semibold'>20</p>
				</div>
				<div className='relative flex-1 p-4 bg-default-100 rounded-lg'>
					<h2 className='font-medium text-xl'>Plato más pedido</h2>
					<MdRestaurantMenu
						className='absolute right-3 bottom-3 text-rose-500 p-2 rounded-full bg-rose-200'
						size={40}
					/>
					<p className='text-neutral-400 mb-3'>Hoy día</p>
					<p className='text-xl font-semibold'>12 Acevichada</p>
				</div>
			</div>
		</main>
	);
};
