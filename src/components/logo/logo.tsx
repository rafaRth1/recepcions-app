import LogoApp from '@/assets/logo.png';

const Logo = () => {
	return (
		<div className='w-[30px] h-[30px] rounded-full ml-3'>
			<img
				src={LogoApp}
				alt='Logo'
			/>
		</div>
	);
};

export default Logo;
