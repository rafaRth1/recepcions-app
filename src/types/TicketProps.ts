import { CreamsProps } from './CreamProps';
import { DishProps } from './DishProps';

export interface TicketProps {
	key: string;
	name_ticket: string;
	dishes: DishProps[];
	creams: CreamsProps[];
}
