import { Ticket } from '@/core/ticket/interfaces';
import { clientAxios } from '@/utils';

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
