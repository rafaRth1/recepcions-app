import { useMutation } from '@tanstack/react-query';
import { changeInactiveProductAction } from '@/core/product/actions';

export const useChangeInactiveProduct = () => {
	const changeInactiveProduct = useMutation({
		mutationFn: changeInactiveProductAction,
	});

	return {
		changeInactiveProduct,
	};
};
