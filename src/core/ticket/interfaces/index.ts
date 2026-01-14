import { DeliveryStatus, PaymentType, TicketStatus, TicketType } from '@/core/shared/interfaces';

export interface Ticket {
	_id?: string;
	key: string;
	nameTicket: string;
	dishes: Dish[];
	creams: Creams[];
	drinks?: Drinks[];
	totalPrice: number;
	exception: string;
	time: string;
	color: string;
	paymentType: PaymentType;
	status: TicketStatus;
	deliveryStatus: DeliveryStatus;
	type: TicketType;
	user: string;
	momentaryTime: string;
	createdAt: string;
	updatedAt: string;
}

export interface CreateTicketRequest {
	nameTicket: string;
	dishes: Dish[];
	creams: Creams[];
	drinks?: Drinks[];
	exception: string;
	color: string;
	status: TicketStatus;
	type: TicketType;
	paymentType?: PaymentType;
}

export interface UpdateTicketRequest extends CreateTicketRequest {
	_id: string;
}

export interface Drinks extends Drink {
	_id?: string;
}

export interface CreamProps {
	key: string;
	name: string;
}

export interface Creams {
	_id?: string;
	key: string;
	creams: string[];
}

export interface Dish extends Food {
	_id?: string;
	key: string;
	rice: boolean;
	salad: boolean;
}

export interface Drink {
	key: string;
	name: string;
	price: number;
}

export interface Food {
	key?: string;
	dishFood: string;
	price: number;
}
