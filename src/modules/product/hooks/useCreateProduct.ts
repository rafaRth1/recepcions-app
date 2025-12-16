import { useMutation } from '@tanstack/react-query';
import { createProductAction } from '@/core/product/actions';

export const useCreateProduct = () => {
	const createProduct = useMutation({
		mutationFn: createProductAction,
	});

	return {
		createProduct,
	};
};
