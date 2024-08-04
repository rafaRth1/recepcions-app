import { Route, Routes } from 'react-router-dom';
import { HomeRouter } from './routes/home-router';

export const AppRouter = () => {
	return (
		<Routes>
			<Route
				path='/*'
				element={<HomeRouter />}
			/>
		</Routes>
	);
};
