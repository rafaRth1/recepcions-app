import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Logo from '../logo/logo';
import { IoMenuOutline } from 'react-icons/io5';

const links = [
	{
		id: 1,
		route: '/',
		name: 'Recepciones',
	},
	{
		id: 2,
		route: '/orders',
		name: 'Pedidos',
	},
	{
		id: 3,
		route: '/delivery',
		name: 'Delivery',
	},
	{
		id: 4,
		route: '/statistics',
		name: 'Estadísticas',
	},
	{
		id: 5,
		route: '/settings',
		name: 'Configuración',
	},
];

const Header = () => {
	const [active, setActive] = useState(false);

	return (
		<header className='flex p-4'>
			<div className='flex items-center flex-1'>
				<button onClick={() => setActive(!active)}>
					<IoMenuOutline
						size={30}
						className='text-neutral-100'
					/>
				</button>

				<Logo />
			</div>

			<div className='flex items-center'>
				<span className='text-neutral-100'>Rafael</span>
				{/* <figure className='w-[30px] h-[30px] rounded-full bg-neutral-700 ml-3'></figure> */}
			</div>

			<div
				className={`fixed inset-0 z-40 transition-all duration-200 w-full h-full ${
					active
						? 'translate-x-0 opacity-1 visible pointer-events-auto'
						: '-translate-x-5 opacity-0 invisible pointer-events-none'
				}`}>
				<div
					className='fixed inset-0'
					style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
					onClick={() => setActive(false)}
				/>

				<div
					className={`absolute transition-all w-[250px] left-0 top-0 h-full bg-neutral-900 ${
						active ? 'translate-x-0' : '-translate-x-[250px]'
					}`}>
					<nav className='p-5'>
						<ul>
							{links.map((link) => (
								<NavLink
									key={link.id}
									to={link.route}
									className={({ isActive }) => (isActive ? 'opacity-70 p-3 block' : 'p-3 block')}>
									{link.name}
								</NavLink>
							))}
						</ul>
					</nav>
				</div>
			</div>
		</header>
	);
};

export default Header;
