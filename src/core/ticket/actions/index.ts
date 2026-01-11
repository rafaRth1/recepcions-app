import { AxiosError } from 'axios';
import { ApiResponse, ApiSuccessResponse } from '@/core/shared/interfaces';
import { clientAxios } from '@/lib/http-client';
import { CreateTicketRequest, Ticket, UpdateTicketRequest } from '../interfaces';

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
 * Obtener un ticket
 */
export const getTicketAction = async (ticketId: string): Promise<ApiSuccessResponse<Ticket>> => {
	try {
		const { data } = await clientAxios.get<ApiSuccessResponse<Ticket>>(`/ticket/${ticketId}`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Ticket[]>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		throw new Error('No se pudo cargar el ticket');
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

/**
 * @description
 * Actualizar un ticket
 */
export const updateTicketAction = async (values: Partial<UpdateTicketRequest>): Promise<ApiSuccessResponse<Ticket>> => {
	try {
		const { data } = await clientAxios.put<ApiSuccessResponse<Ticket>>(`/ticket/${values._id}`, values);
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Ticket[]>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		throw new Error('Error al actualizar el ticket');
	}
};

/**
 * @description
 * Completar o finalizar ticket
 */
export const completeTicketAction = async (ticketId: string): Promise<ApiSuccessResponse<Ticket>> => {
	try {
		const { data } = await clientAxios.patch<ApiSuccessResponse<Ticket>>(`/ticket/${ticketId}/complete`);
		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Ticket[]>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		throw new Error('Error al finalizar el ticket');
	}
};
