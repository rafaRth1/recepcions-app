import * as Yup from 'yup';

export const createProductValidation = Yup.object({
	name: Yup.string().required('El nombre es requerido').min(3, 'Mínimo 3 caracteres'),
	price: Yup.number().required('El precio es requerido').positive('Debe ser mayor a 0'),
	category: Yup.string().required('La categoría es requerida'),
	description: Yup.string(),
	preparationTime: Yup.number().min(0, 'No puede ser negativo'),
	discount: Yup.number().min(0, 'No puede ser negativo').max(100, 'Máximo 100%'),
	image: Yup.string().url('Debe ser una URL válida'),
});
