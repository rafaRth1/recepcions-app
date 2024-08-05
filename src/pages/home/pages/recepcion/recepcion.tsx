import { RecepcionFood, RecepcionCream, RecepcionXtra, Ticket, Tickets } from './';
import { RecepcionProvider } from '@/context/recepcion-context/recepcion-provider';

export const Recepcion = () => {
	return (
		<>
			<main className='p-4'>
				<RecepcionProvider>
					<RecepcionFood />
					<RecepcionCream />
					<RecepcionXtra />
					<Ticket />
					<Tickets />
				</RecepcionProvider>
			</main>
		</>
	);
};
