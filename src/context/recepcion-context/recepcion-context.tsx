import { DishProps, FoodProps, TicketProps } from '@/types';
import { createContext } from 'react';

export interface RecepcionContextProps {
	activeResultSearch: boolean;
	setActiveResultSearch: React.Dispatch<React.SetStateAction<boolean>>;
	selected: string[];
	setSelected: React.Dispatch<React.SetStateAction<string[]>>;
	resultDishes: FoodProps[];
	setResulDishes: React.Dispatch<React.SetStateAction<FoodProps[]>>;
	dish: DishProps;
	setDish: React.Dispatch<React.SetStateAction<DishProps>>;
	ticket: TicketProps;
	setTicket: React.Dispatch<React.SetStateAction<TicketProps>>;
	tickets: TicketProps[];
	setTickets: React.Dispatch<React.SetStateAction<TicketProps[]>>;
	handleAddDishToTicket: () => void;
	handleAddTicket: () => void;
	handleFinishTicket: () => void;
}

export const RecepcionContext = createContext<RecepcionContextProps>({} as RecepcionContextProps);
