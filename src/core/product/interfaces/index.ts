import { CategoryProduct, Status } from '@/core/shared/interfaces';

export interface Product {
	_id?: string;
	name: string;
	price: number;
	category: CategoryProduct;
	image?: string;
	ingredients?: string[];
	description?: string;
	status?: Status;
	tags?: string[];
	discount?: number;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CreateProductRequest extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {}

export interface UpdateProductRequest extends Omit<Product, '_id' | 'createdAt' | 'updatedAt'> {
	id: string;
}

export interface ProductResponse {
	product?: Product;
	products?: Product[];
	message?: string;
	count?: number;
}

export interface PaginationResult {
	products: Product[];
	totalProducts: number;
	totalPages: number;
	currentPage: number;
	limit: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}

export interface ProductFilters {
	category?: CategoryProduct;
	status?: Status;
	search?: string;
	page?: number;
	limit?: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
}
