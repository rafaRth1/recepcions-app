import { useMutation } from '@tanstack/react-query';
import { updateProductAction } from '@/core/product/actions';

export const useUpdateProduct = () => {
	const updateProduct = useMutation({
		mutationFn: updateProductAction,
	});

	return {
		updateProduct,
	};
};
