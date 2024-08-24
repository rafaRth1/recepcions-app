import { Route, Routes } from 'react-router-dom';
import { HomeRouter } from './routes/home-router';
import { AuthRouter } from '@/auth/routes/auth-router';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/*'
				element={<HomeRouter />}
			/>

			<Route
				path='/auth/*'
				element={<AuthRouter />}
			/>
		</Routes>
	);
};
