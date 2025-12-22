import { PaymentType } from '@/core/shared/interfaces';
import { Ticket } from '@/core/ticket/interfaces';

export const initialValueTicket: Ticket = {
	_id: '',
	key: '',
	nameTicket: '',
	dishes: [],
	creams: [],
	drinks: [],
	totalPrice: 0,
	exception: '',
	time: '',
	paymentType: '' as PaymentType,
	color: '',
	status: 'PROCESS',
	deliveryStatus: 'PROCESS',
	momentaryTime: '',
	type: 'TABLE',
	user: '',
	createdAt: '',
	updatedAt: '',
};
