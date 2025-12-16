import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { IoReceiptOutline, IoBagCheckOutline, IoBicycleOutline, IoEllipsisHorizontal } from 'react-icons/io5';

const mainLinks = [
	{
		id: 1,
		route: '/',
		name: 'Recepciones',
		icon: IoReceiptOutline,
	},
	{
		id: 2,
		route: '/orders',
		name: 'Pedidos',
		icon: IoBagCheckOutline,
	},
	{
		id: 3,
		route: '/delivery',
		name: 'Delivery',
		icon: IoBicycleOutline,
	},
];

const moreLinks = [
	{
		id: 4,
		route: '/store',
		name: 'Almacén',
	},
	{
		id: 5,
		route: '/statistics',
		name: 'Estadísticas',
	},
];

export const Tabs = () => {
	const [activeMore, setActiveMore] = useState(false);
	const navigate = useNavigate();

	const handleMoreClick = () => {
		setActiveMore(!activeMore);
	};

	return (
		<>
			{/* Bottom Navigation Tabs */}
			<nav className='fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-neutral-800 z-50 safe-area-inset-bottom'>
				<div className='grid grid-cols-4 h-16'>
					{/* Tabs principales */}
					{mainLinks.map((link) => {
						const Icon = link.icon;
						return (
							<NavLink
								key={link.id}
								to={link.route}
								className={({ isActive }) =>
									`flex flex-col items-center justify-center gap-1 transition-colors ${
										isActive ? 'text-indigo-500' : 'text-neutral-400'
									}`
								}>
								<Icon size={24} />
								<span className='text-xs font-medium'>{link.name}</span>
							</NavLink>
						);
					})}

					{/* Tab "Más..." */}
					<button
						onClick={handleMoreClick}
						className='flex flex-col items-center justify-center gap-1 text-neutral-400 hover:text-neutral-200 transition-colors'>
						<IoEllipsisHorizontal size={24} />
						<span className='text-xs font-medium'>Más</span>
					</button>
				</div>
			</nav>

			{/* Modal "Más opciones" */}
			<div
				className={`fixed inset-0 z-40 transition-all duration-200 ${
					activeMore
						? 'translate-y-0 opacity-1 visible pointer-events-auto'
						: 'translate-y-5 opacity-0 invisible pointer-events-none'
				}`}>
				<div
					className='fixed inset-0 bg-black/50'
					onClick={() => setActiveMore(false)}
				/>

				<div
					className={`absolute bottom-0 left-0 right-0 mb-16 bg-neutral-900 rounded-t-3xl transition-all duration-300 ${
						activeMore ? 'translate-y-0' : 'translate-y-full'
					}`}>
					<div className='p-6'>
						{/* Handle bar */}
						<div className='w-12 h-1 bg-neutral-700 rounded-full mx-auto mb-6'></div>

						<h3 className='text-lg font-semibold text-neutral-100 mb-4'>Más opciones</h3>

						<div className='grid grid-cols-2 gap-3'>
							{moreLinks.map((link) => (
								<button
									key={link.id}
									onClick={() => {
										navigate(link.route);
										setActiveMore(false);
									}}
									className='bg-neutral-800 hover:bg-neutral-700 rounded-xl p-4 text-center transition-colors'>
									<p className='text-neutral-100 font-medium'>{link.name}</p>
								</button>
							))}
						</div>

						<button
							onClick={() => setActiveMore(false)}
							className='w-full mt-4 py-3 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-neutral-300 font-medium transition-colors'>
							Cerrar
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
