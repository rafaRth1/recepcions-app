import { AxiosError } from 'axios';
import { ApiResponse, ApiSuccessResponse } from '@/core/shared/interfaces';
import { clientAxios } from '@/lib/http-client';
import { CreateTicketRequest, Ticket } from '../interfaces';

/**
 * @description
 * Obtener todos los tickets
 */
export const getTicketsAction = async (): Promise<ApiSuccessResponse<Ticket[]>> => {
	try {
		const { data } = await clientAxios.get<ApiSuccessResponse<Ticket[]>>('/ticket');
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Ticket[]>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		throw new Error('No se pudieron cargar los tickets');
	}
};

/**
 * @description
 * Crear un ticket
 */
export const createTicketAction = async (values: CreateTicketRequest): Promise<ApiSuccessResponse<Ticket>> => {
	try {
		const { data } = await clientAxios.post<ApiSuccessResponse<Ticket>>('/ticket', values);
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Ticket[]>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		throw new Error('Error al crear ticket');
	}
};
