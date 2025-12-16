import { Navigate, Outlet } from 'react-router-dom';
import { Header } from '@/components/';
import { useAuthProvider } from '@/hooks';
import { Spinner } from '@heroui/react';
import { Tabs } from '@/components/tabs';

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
					<Tabs />
				</>
			) : (
				<Navigate to='/auth/login' />
			)}
		</>
	);
};

export default Home;
