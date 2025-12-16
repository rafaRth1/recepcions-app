import { Dish, Ticket } from '@/core/ticket/interfaces';
import { createContext } from 'react';

export interface RecepcionContextProps {
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	dish: Dish;
	setDish: React.Dispatch<React.SetStateAction<Dish>>;
	ticket: Ticket;
	setTicket: React.Dispatch<React.SetStateAction<Ticket>>;
	tickets: Ticket[];
	setTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
	handleSubmitTicket: () => void;
}

export const RecepcionContext = createContext<RecepcionContextProps>({} as RecepcionContextProps);
