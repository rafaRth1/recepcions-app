import { useQuery } from '@tanstack/react-query';
import { getTicketAction } from '@/core/ticket/actions';

export const useGetTicket = (ticketId: string) => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['ticket', ticketId],
		queryFn: () => getTicketAction(ticketId),
		refetchOnWindowFocus: false,
		enabled: !!ticketId,
	});

	return {
		data: data?.data,
		isLoading,
		isError,
	};
};
