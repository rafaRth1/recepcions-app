import { CreamsProps } from './CreamProps';
import { DishProps } from './DishProps';
import { DrinkProps } from './DrinkProps';

export interface TicketProps {
	key: string;
	name_ticket: string;
	dishes: DishProps[];
	creams: CreamsProps[];
	drinks?: Drinks[];
	totalPrice: number;
	exception: string;
	time: string;
}

interface Drinks extends DrinkProps {
	id: string;
}
