import { getProductsWithFiltersAction } from '@/core/product/actions';
import { ProductFilters } from '@/core/product/interfaces';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = (filters?: ProductFilters) => {
	const { data, isLoading, error, refetch, isFetching } = useQuery({
		queryKey: ['products', filters],
		queryFn: () => getProductsWithFiltersAction(filters),
		staleTime: 1000 * 60 * 5,
	});

	return {
		data,
		isLoading,
		isFetching,
		error,
		refetch,
	};
};
