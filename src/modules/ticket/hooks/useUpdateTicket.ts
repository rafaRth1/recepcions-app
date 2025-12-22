import { useMutation } from '@tanstack/react-query';
import { updateTicketAction } from '@/core/ticket/actions';

export const useUpdateTicket = () => {
	const updateTicket = useMutation({
		mutationFn: updateTicketAction,
	});

	return {
		updateTicket,
	};
};
