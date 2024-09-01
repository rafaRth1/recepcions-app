import { Route, Routes } from 'react-router-dom';
import Home from '@/pages/home/home';
import { Store, Orders, Recepcion, Statistics, Delivery } from '@/pages/home/pages';

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

				<Route
					path='delivery'
					element={<Delivery />}
				/>

				<Route
					path='store'
					element={<Store />}
				/>

				<Route
					path='statistics'
					element={<Statistics />}
				/>

				<Route
					path='settings'
					element={<>Construyendo...</>}
				/>
			</Route>
		</Routes>
	);
};
