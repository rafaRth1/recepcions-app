import { generatePrintCustomerReceiptAction } from '@/core/printer/actions';
import { useMutation } from '@tanstack/react-query';

export const useGeneratePrintCustomerReceipt = () => {
	const generateReceipt = useMutation({
		mutationFn: generatePrintCustomerReceiptAction,
	});

	return {
		generateReceipt,
	};
};
