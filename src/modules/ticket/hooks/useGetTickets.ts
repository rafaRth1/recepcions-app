import { useQuery } from '@tanstack/react-query';
import { getTicketsAction } from '@/core/ticket/actions';

export const useGetTickets = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['tickets'],
		queryFn: getTicketsAction,
		refetchOnWindowFocus: false,
	});

	return {
		data: data?.data,
		isLoading,
	};
};
