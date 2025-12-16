export type CategoryProduct = 'BEBIDA' | 'COMIDA';
export type Status = 'ACTIVE' | 'INACTIVE';
export type TicketStatus = 'COMPLETED' | 'PROCESS';
export type TicketType = 'TABLE' | 'DELIVERY' | 'PICKUP';
export type DeliveryStatus = 'COMPLETED' | 'PROCESS';
export type PaymentType = 'YAPE' | 'PLIN' | 'EFECTIVO';

export interface ApiSuccessResponse<T> {
	ok: true;
	message: string;
	data: T;
}

export interface ApiErrorResponse {
	ok: false;
	message: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;
