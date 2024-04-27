import Logo from '../logo/logo';
import { IoMenuOutline } from 'react-icons/io5';

const Header = () => {
	return (
		<header className='flex p-4'>
			<div className='flex items-center flex-1'>
				<button>
					<IoMenuOutline
						size={30}
						className='text-neutral-100'
					/>
				</button>

				<Logo />
			</div>

			<div className='flex items-center'>
				<span className='text-neutral-100'>Rafael</span>
				<figure className='w-[30px] h-[30px] rounded-full bg-neutral-700 ml-3'></figure>
			</div>
		</header>
	);
};

export default Header;
