import { ApiResponse } from '@/core/shared/interfaces';
import { Ticket } from '@/core/ticket/interfaces';
import { clientAxios } from '@/utils';
import { formatDate } from '@/utils/format-date';
import { formatTime } from '@/utils/format-time';

/**
 * @description
 * Generar ticket
 */
export const generatePrintTicketAction = async (values: Ticket) => {
	try {
		const { data } = await clientAxios.post('/printer/print', values);
		return data;
	} catch (error) {
		console.error('Error al generar ticket:', error);
		throw new Error('No se pudo generar el ticket correctamente');
	}
};

/**
 * @description
 * Generar boleta para cliente
 */
export const generatePrintCustomerReceiptAction = async (ticket: Ticket) => {
	try {
		const receipt = {
			date: formatDate(ticket.createdAt) + ' ' + formatTime(ticket.createdAt),
			customerName: ticket.nameTicket,
			table: ticket.nameTicket,
			employee: ticket.user,
			items: ticket.dishes.map((dish) => ({
				quantity: 1,
				description: dish.dishFood,
				price: dish.price,
				total: dish.price,
			})),
			total: ticket.totalPrice,
		};

		console.log('Imprimible de boleta:', receipt);

		const { data } = await clientAxios.post<ApiResponse<string>>('/printer/print-receipt', receipt);
		return data;
	} catch (error) {
		console.error('Error al generar boleta:', error);
		throw new Error('No se pudo generar la boleta correctamente');
	}
};
