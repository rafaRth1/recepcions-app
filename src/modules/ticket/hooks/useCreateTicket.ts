import { useMutation } from '@tanstack/react-query';
import { createTicketAction } from '@/core/ticket/actions';

export const useCreateTicket = () => {
	const createTicket = useMutation({
		mutationFn: createTicketAction,
	});

	return {
		createTicket,
	};
};
