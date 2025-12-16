import { AxiosError } from 'axios';
import { clientAxios } from '@/utils';
import {
	CreateProductRequest,
	PaginationResult,
	Product,
	ProductFilters,
	ProductResponse,
	UpdateProductRequest,
} from '../interfaces';
import { ApiResponse, ApiSuccessResponse, CategoryProduct } from '@/core/shared/interfaces';

/**
 * @description
 * Obtener todos los productos
 */
export const getProductsAction = async (): Promise<ApiSuccessResponse<ProductResponse>> => {
	try {
		const { data } = await clientAxios.get<ApiSuccessResponse<ProductResponse>>('/product');

		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<ProductResponse>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al obtener productos:', error);
		throw new Error('No se pudieron cargar los productos');
	}
};

/**
 * @description
 * Obtener un producto por ID
 */
export const getProductAction = async (id: string): Promise<Product> => {
	try {
		const { data } = await clientAxios.get<ApiResponse<Product>>(`/product/${id}`);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Product>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al obtener producto:', error);
		throw new Error('No se pudo cargar el producto');
	}
};

/**
 * @description
 * Crear un nuevo producto
 */
export const createProductAction = async (values: CreateProductRequest): Promise<ApiSuccessResponse<Product>> => {
	try {
		const { data } = await clientAxios.post<ApiSuccessResponse<Product>>('/product', values);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Product>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al crear producto:', error);
		throw new Error('No se pudo crear el producto correctamente');
	}
};

/**
 * @description
 * Actualizar un producto existente
 */
export const updateProductAction = async (values: UpdateProductRequest): Promise<ApiSuccessResponse<Product>> => {
	try {
		const { data } = await clientAxios.put<ApiSuccessResponse<Product>>(`/product/${values.id}`, values);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<Product>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al actualizar producto:', error);
		throw new Error('No se pudo actualizar el producto correctamente');
	}
};

/**
 * @description
 * Eliminar un producto
 */
export const deleteProductAction = async (id: string): Promise<string> => {
	try {
		const { data } = await clientAxios.delete<ApiResponse<string>>(`/product/${id}`);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<string>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al eliminar producto:', error);
		throw new Error('No se pudo eliminar el producto');
	}
};

/**
 * @description
 * Desactivar un producto
 */
export const changeInactiveProductAction = async (id: string): Promise<string> => {
	try {
		const { data } = await clientAxios.put<ApiResponse<string>>(`/product/${id}/desactive`);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<string>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al cambiar a inactivo el producto:', error);
		throw new Error('Error al cambiar a inactivo el producto');
	}
};

/**
 * @description
 * Obtener productos por categoría
 */
export const getProductsByCategoryAction = async (category: CategoryProduct | null): Promise<Product[]> => {
	try {
		const { data } = await clientAxios.get<ApiResponse<ProductResponse>>(`/product?category=${category}`);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data.products || [];
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<ProductResponse>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al obtener productos por categoría:', error);
		throw new Error('No se pudieron cargar los productos de la categoría');
	}
};

/**
 * @description
 * Obtener productos activos
 */
export const getActiveProductsAction = async (): Promise<Product[]> => {
	try {
		const { data } = await clientAxios.get<ApiResponse<ProductResponse>>(`/product?status=ACTIVE`);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data.products || [];
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<ProductResponse>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al obtener productos activos:', error);
		throw new Error('No se pudieron cargar los productos activos');
	}
};

/**
 * @description
 * Obtener productos con filtros y paginación
 */
export const getProductsWithFiltersAction = async (filters?: ProductFilters): Promise<PaginationResult> => {
	try {
		const params = new URLSearchParams();

		if (filters?.category) params.append('category', filters.category);
		if (filters?.status) params.append('status', filters.status);
		if (filters?.search) params.append('search', filters.search);
		if (filters?.page) params.append('page', filters.page.toString());
		if (filters?.limit) params.append('limit', filters.limit.toString());
		if (filters?.sortBy) params.append('sortBy', filters.sortBy);
		if (filters?.sortOrder) params.append('sortOrder', filters.sortOrder);

		const queryString = params.toString();
		const url = queryString ? `/product?${queryString}` : '/product';

		const { data } = await clientAxios.get<ApiResponse<PaginationResult>>(url);

		if (!data.ok) {
			throw new Error(data.message);
		}

		return data.data;
	} catch (error) {
		if (error instanceof AxiosError && error.response) {
			const errorData = error.response.data as ApiResponse<PaginationResult>;
			if (!errorData.ok) {
				throw new Error(errorData.message);
			}
		}
		console.error('Error al obtener productos:', error);
		throw new Error('No se pudieron cargar los productos');
	}
};
