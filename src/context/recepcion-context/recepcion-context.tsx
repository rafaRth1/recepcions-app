import { DishProps, TicketProps } from '@/types';
import { createContext } from 'react';

export interface RecepcionContextProps {
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	dish: DishProps;
	setDish: React.Dispatch<React.SetStateAction<DishProps>>;
	ticket: TicketProps;
	setTicket: React.Dispatch<React.SetStateAction<TicketProps>>;
	tickets: TicketProps[];
	setTickets: React.Dispatch<React.SetStateAction<TicketProps[]>>;
	handleSubmitTicket: () => void;
	handleFinishTicket: () => void;
}

export const RecepcionContext = createContext<RecepcionContextProps>({} as RecepcionContextProps);
