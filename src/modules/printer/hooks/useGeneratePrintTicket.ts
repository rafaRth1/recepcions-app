import { generatePrintTicketAction } from '@/core/printer/actions';
import { useMutation } from '@tanstack/react-query';

export const useGeneratePrintTicket = () => {
	const generateTicket = useMutation({
		mutationFn: generatePrintTicketAction,
	});

	return {
		generateTicket,
	};
};
