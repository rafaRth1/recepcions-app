import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '@/components/';
import { useAuthProvider } from '@/hooks';
import { Spinner } from '@nextui-org/react';

const Home = () => {
	const { auth, loading } = useAuthProvider();

	if (loading)
		return (
			<>
				<Spinner className='h-[100dvh] w-full' />
			</>
		);

	return (
		<>
			{auth._id ? (
				<>
					<Header />
					<Outlet />
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};

export default Home;
