import { useState } from 'react';
import { Input } from '@heroui/react';
import { useRecepcion } from '@/hooks';
import { Product, ProductFilters } from '@/core/product/interfaces';
import { useGetProducts } from '@/modules/product/hooks/useGetProducts';
import { useDebounce } from '@/hooks/use-debounce';
import { v4 } from 'uuid';
import { formatMomentaryTime } from '@/utils/format-momentary-time';
import { CategoryProduct } from '@/core/shared/interfaces';

// Categorías disponibles
const categories = [
	{ key: 'all', label: 'Todos', emoji: '🍽️' },
	{ key: 'COMIDA', label: 'Comidas', emoji: '🍔' },
	{ key: 'BEBIDA', label: 'Bebidas', emoji: '🥤' },
];

export const ProductGridQuick = () => {
	const { ticket, setTicket } = useRecepcion();
	const [selectedCategory, setSelectedCategory] = useState<'all' | CategoryProduct>('all');
	const [searchTerm, setSearchTerm] = useState('');

	const debouncedSearchQuery = useDebounce(searchTerm, 500);

	// Filtros para obtener productos
	const filters: ProductFilters = {
		search: debouncedSearchQuery || undefined,
		category: selectedCategory === 'all' ? undefined : selectedCategory,
		status: 'ACTIVE',
		page: 1,
		limit: 50, // Mostrar hasta 50 productos
		sortBy: 'name',
		sortOrder: 'asc',
	};

	const { data, isLoading } = useGetProducts(filters);
	const products = data?.products || [];

	const handleClickProduct = (product: Product) => {
		// Si es comida, agregar DIRECTO con valores por defecto
		if (product.category === 'COMIDA') {
			setTicket({
				...ticket,
				dishes: [
					...ticket.dishes,
					{
						key: v4(),
						dishFood: product.name,
						price: product.price,
						rice: false, // Por defecto sin arroz
						salad: true, // Por defecto con ensalada
					},
				],
				totalPrice: ticket.totalPrice + product.price,
			});
		} else if (product.category === 'BEBIDA') {
			// Si es bebida, agregar directo al ticket
			setTicket({
				...ticket,
				drinks: [
					...(ticket.drinks || []),
					{
						_id: v4(),
						key: v4(),
						name: product.name,
						price: product.price,
					},
				],
				totalPrice: ticket.totalPrice + product.price,
				momentaryTime: formatMomentaryTime(),
			});
		}
	};

	return (
		<div className='space-y-4'>
			{/* Búsqueda */}
			<Input
				type='text'
				placeholder='🔍 Buscar productos...'
				value={searchTerm}
				onValueChange={setSearchTerm}
				classNames={{
					input: 'text-sm',
					inputWrapper: 'bg-neutral-800 border-neutral-700',
				}}
			/>

			{/* Categorías - Tabs horizontales */}
			<div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
				{categories.map((cat) => (
					<button
						key={cat.key}
						onClick={() => setSelectedCategory(cat.key as 'all' | CategoryProduct)}
						className={`
							px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-all duration-200
							${selectedCategory === cat.key ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}
						`}>
						<span className='mr-1'>{cat.emoji}</span>
						{cat.label}
					</button>
				))}
			</div>

			{/* Grid de Productos - 3 COLUMNAS */}
			{isLoading ? (
				<div className='grid grid-cols-3 gap-2'>
					{[1, 2, 3, 4, 5, 6].map((i) => (
						<div
							key={i}
							className='bg-neutral-800 rounded-lg p-3 h-24 animate-pulse'></div>
					))}
				</div>
			) : products.length > 0 ? (
				<div className='grid grid-cols-3 gap-2'>
					{products.map((product) => (
						<button
							key={product._id}
							onClick={() => handleClickProduct(product)}
							className='bg-neutral-800 hover:bg-neutral-700 rounded-lg p-2 transition-all duration-200 relative border-2 border-transparent hover:border-indigo-600 active:scale-95'>
							{/* Botón + flotante */}
							<div className='absolute top-2 right-2 bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold'>
								+
							</div>

							{/* Nombre del producto */}
							<p className='font-medium text-xs capitalize mb-1 line-clamp-2 pr-6 text-left'>{product.name}</p>

							{/* Precio */}
							<p className='text-green-400 font-semibold text-sm text-left'>S/ {product.price.toFixed(0)}</p>
						</button>
					))}
				</div>
			) : (
				<div className='bg-neutral-800 rounded-lg p-6 text-center'>
					<p className='text-neutral-500 text-sm'>No hay productos</p>
				</div>
			)}
		</div>
	);
};
