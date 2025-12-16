import { useRecepcion } from '@/hooks';
import { IoRestaurant, IoCar, IoBagHandle } from 'react-icons/io5';
import { TicketType } from '@/core/shared/interfaces';

export const HeaderRecepcion = () => {
	const { ticket, setTicket } = useRecepcion();

	const handleOnChangeType = (type: TicketType) => {
		if (type === 'TABLE' || type === 'PICKUP' || type === 'DELIVERY') {
			setTicket({ ...ticket, type });
		}
	};

	return (
		<div className='mb-6'>
			<div className='mb-4'>
				<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Tipo de pedido</p>
				<div className='grid grid-cols-3 gap-2 bg-neutral-900 p-1 rounded-xl'>
					<button
						onClick={() => handleOnChangeType('TABLE')}
						className={`
							py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
							flex flex-col items-center justify-center gap-1
							${ticket.type === 'TABLE' ? 'bg-indigo-700 text-white' : 'text-neutral-400 hover:text-neutral-200'}
						`}>
						<IoRestaurant size={24} />
						<span>Mesa</span>
					</button>

					<button
						onClick={() => handleOnChangeType('DELIVERY')}
						className={`
								py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
								flex flex-col items-center justify-center gap-1
								${ticket.type === 'DELIVERY' ? 'bg-indigo-700 text-white' : 'text-neutral-400 hover:text-neutral-200'}
							`}>
						<IoCar size={24} />
						<span>Delivery</span>
					</button>

					<button
						onClick={() => handleOnChangeType('PICKUP')}
						className={`
							py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
							flex flex-col items-center justify-center gap-1
							${ticket.type === 'PICKUP' ? 'bg-indigo-700 text-white' : 'text-neutral-400 hover:text-neutral-200'}
						`}>
						<IoBagHandle size={24} />
						<span>Llevar</span>
					</button>
				</div>
			</div>
		</div>
	);
};
