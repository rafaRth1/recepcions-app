export type CategoryProduct =
	| 'HAMBURGUESAS'
	| 'SALCHIPAPAS'
	| 'POLLO_BROASTER'
	| 'ALITAS'
	| 'TWISTER'
	| 'COMBO'
	| 'REFRESCOS'
	| 'FROZEN'
	| 'CREMOSOS'
	| 'BATIDOS'
	| 'JUGOS'
	| 'CLASICOS'
	| 'GASEOSAS'
	| 'PIDELO_CON_CHAUFA';
export type Status = 'ACTIVE' | 'INACTIVE';
export type TicketStatus = 'COMPLETED' | 'PROCESS' | 'CANCELLED';
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
