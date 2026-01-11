import { useMutation } from '@tanstack/react-query';
import { completeTicketAction } from '@/core/ticket/actions';

export const useCompleteTicket = () => {
	const completeTicket = useMutation({
		mutationFn: completeTicketAction,
	});

	return {
		completeTicket,
	};
};
