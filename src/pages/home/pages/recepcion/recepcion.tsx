import { RecepcionFood, RecepcionCream, RecepcionXtra, Ticket, Tickets, HeaderRecepcion } from './';
import { RecepcionProvider } from '@/context/recepcion-context/recepcion-provider';

// FIX: Mejorar el perfomance de este formulario

export const Recepcion = () => {
	return (
		<>
			<main className='p-4 flex justify-center'>
				<div className='max-w-[820px] w-full'>
					<RecepcionProvider>
						<HeaderRecepcion />
						<RecepcionFood />
						<RecepcionCream />
						<RecepcionXtra />
						<Ticket />
						<Tickets />
					</RecepcionProvider>
				</div>
			</main>
		</>
	);
};
