import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import { Orders, Recepcion } from '@/pages/home/pages';

export const HomeRouter = () => {
	return (
		<Routes>
			<Route
				path='/'
				element={<Home />}>
				<Route
					index
					element={<Recepcion />}
				/>

				<Route
					path='orders'
					element={<Orders />}
				/>
			</Route>
		</Routes>
	);
};
