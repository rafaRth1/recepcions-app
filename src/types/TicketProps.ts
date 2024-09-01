import { CreamsProps } from './CreamProps';
import { DishProps } from './DishProps';
import { DrinkProps } from './DrinkProps';

export interface TicketProps {
	_id?: string;
	key: string;
	name_ticket: string;
	dishes: DishProps[];
	creams: CreamsProps[];
	drinks?: Drinks[];
	total_price: number;
	exception: string;
	time: string;
	color: string;
	type_payment: string;
	status: 'completed' | 'process';
	status_delivery: 'completed' | 'process';
	type: 'table' | 'delivery' | 'pickup';
	user: string;
}

export interface Drinks extends DrinkProps {
	_id?: string;
	_id_temp?: string;
}
