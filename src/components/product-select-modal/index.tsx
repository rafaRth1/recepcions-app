import { useState } from 'react';
import {
	Button,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Select,
	SelectItem,
	Chip,
	Pagination,
} from '@heroui/react';
import { IoSearch, IoFilter, IoClose, IoFastFood, IoRestaurant, IoBeer, IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import { CategoryProduct, Status } from '@/core/shared/interfaces';
import { ProductFilters, Product } from '@/core/product/interfaces';
import { useGetProducts } from '@/modules/product/hooks/useGetProducts';
import { useDebounce } from '@/hooks/use-debounce';
import { IconType } from 'react-icons/lib';

const CATEGORIES: { value: CategoryProduct; label: string; icon: IconType }[] = [
	{ value: 'COMIDA', label: 'Comida', icon: IoRestaurant },
	{ value: 'BEBIDA', label: 'Bebida', icon: IoBeer },
];

const STATUS_OPTIONS: { value: Status; label: string }[] = [
	{ value: 'ACTIVE', label: 'Activo' },
	{ value: 'INACTIVE', label: 'Inactivo' },
];

interface ProductSelectorModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSelect: (product: Product) => void;
	defaultCategory?: CategoryProduct;
}

export const ProductSelectorModal = ({ isOpen, onClose, onSelect, defaultCategory = 'COMIDA' }: ProductSelectorModalProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<CategoryProduct | ''>(defaultCategory);
	const [selectedStatus, setSelectedStatus] = useState<Status | ''>('ACTIVE');
	const [currentPage, setCurrentPage] = useState(1);

	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	const filters: ProductFilters = {
		search: debouncedSearchQuery || undefined,
		category: selectedCategory || undefined,
		status: selectedStatus || undefined,
		page: currentPage,
		limit: 12,
		sortBy: 'createdAt',
		sortOrder: 'desc',
	};

	const { data, isLoading, isFetching } = useGetProducts(filters);

	const products = data?.products || [];
	const totalPages = data?.totalPages || 0;
	const totalProducts = data?.totalProducts || 0;

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1);
	};

	const handleCategoryChange = (value: string) => {
		setSelectedCategory(value as CategoryProduct | '');
		setCurrentPage(1);
	};

	const handleStatusChange = (value: string) => {
		setSelectedStatus(value as Status | '');
		setCurrentPage(1);
	};

	const handleClearFilters = () => {
		setSearchQuery('');
		setSelectedCategory(defaultCategory);
		setSelectedStatus('ACTIVE');
		setCurrentPage(1);
	};

	const handleSelectProduct = (product: Product) => {
		onSelect(product);
		onClose();
	};

	const getCategoryData = (category: CategoryProduct) => {
		return CATEGORIES.find((c) => c.value === category);
	};

	const hasActiveFilters = searchQuery || selectedCategory !== defaultCategory || selectedStatus !== 'ACTIVE';

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			size='5xl'
			scrollBehavior='inside'
			motionProps={{
				variants: {
					enter: {
						opacity: 1,
						transition: {
							duration: 0,
						},
					},
					exit: {
						opacity: 0,
						transition: {
							duration: 0,
						},
					},
				},
			}}
			classNames={{
				base: 'bg-neutral-900',
				backdrop: 'bg-black/80',
			}}>
			<ModalContent>
				{(onCloseModal) => (
					<>
						{/* Header */}
						<ModalHeader className='border-b border-neutral-800 px-6 py-4'>
							<div className='flex items-center justify-between w-full'>
								<div className='flex items-center gap-3'>
									<IoFastFood
										size={28}
										className='text-indigo-400'
									/>
									<div>
										<h2 className='text-xl font-bold'>Seleccionar Producto</h2>
										<p className='text-sm text-neutral-400 font-normal'>
											{isLoading ? 'Cargando...' : `${totalProducts} productos disponibles`}
										</p>
									</div>
								</div>
							</div>
						</ModalHeader>

						<ModalBody className='px-6 py-4'>
							{/* Filtros */}
							<div className='bg-neutral-800 rounded-xl p-4 mb-4'>
								<div className='flex items-center justify-between mb-3'>
									<div className='flex items-center gap-2'>
										<IoFilter
											size={18}
											className='text-neutral-400'
										/>
										<p className='text-sm font-medium text-neutral-300'>Filtros</p>
									</div>
									{hasActiveFilters && (
										<Button
											size='sm'
											variant='light'
											onPress={handleClearFilters}
											startContent={<IoClose size={16} />}>
											Limpiar
										</Button>
									)}
								</div>
								<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
									{/* Búsqueda */}
									<Input
										placeholder='Buscar producto...'
										value={searchQuery}
										onValueChange={handleSearchChange}
										startContent={
											<IoSearch
												size={18}
												className='text-neutral-400'
											/>
										}
										endContent={
											<>
												{isFetching && debouncedSearchQuery !== searchQuery && (
													<div className='animate-spin rounded-full h-4 w-4 border-b-2 border-indigo-600 mr-2'></div>
												)}
											</>
										}
										classNames={{
											inputWrapper: 'bg-neutral-900',
										}}
									/>

									{/* Categoría */}
									<Select
										placeholder='Todas las categorías'
										selectedKeys={selectedCategory ? new Set([selectedCategory]) : new Set()}
										onChange={(e) => handleCategoryChange(e.target.value)}
										classNames={{
											trigger: 'bg-neutral-900',
										}}>
										{CATEGORIES.map((cat) => (
											<SelectItem
												key={cat.value}
												startContent={<cat.icon size={18} />}>
												{cat.label}
											</SelectItem>
										))}
									</Select>

									{/* Estado */}
									<Select
										placeholder='Todos los estados'
										selectedKeys={selectedStatus ? new Set([selectedStatus]) : new Set()}
										onChange={(e) => handleStatusChange(e.target.value)}
										classNames={{
											trigger: 'bg-neutral-900',
										}}>
										{STATUS_OPTIONS.map((status) => (
											<SelectItem
												key={status.value}
												startContent={
													status.value === 'ACTIVE' ? <IoCheckmarkCircle size={18} /> : <IoCloseCircle size={18} />
												}>
												{status.label}
											</SelectItem>
										))}
									</Select>
								</div>
							</div>

							{/* Loading */}
							{isLoading && (
								<div className='bg-neutral-800 rounded-xl p-12 text-center'>
									<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
									<p className='text-neutral-400'>Cargando productos...</p>
								</div>
							)}

							{/* Empty State */}
							{!isLoading && products.length === 0 && (
								<div className='bg-neutral-800 rounded-xl p-12 text-center'>
									<IoFastFood
										size={64}
										className='mx-auto mb-4 text-neutral-600'
									/>
									<p className='text-neutral-400 mb-2'>No hay productos</p>
									<p className='text-sm text-neutral-500'>
										{hasActiveFilters ? 'Intenta con otros filtros' : 'No hay productos disponibles'}
									</p>
								</div>
							)}

							{/* Grid de productos */}
							{!isLoading && products.length > 0 && (
								<>
									<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
										{products.map((product) => {
											const categoryData = getCategoryData(product.category);
											const CategoryIcon = categoryData?.icon || IoFastFood;

											return (
												<button
													key={product._id}
													onClick={() => handleSelectProduct(product)}
													className={`bg-neutral-800 rounded-xl overflow-hidden border-2 border-transparent hover:border-indigo-600 transition-all group text-left ${
														isFetching ? 'opacity-50' : ''
													}`}>
													{/* Imagen */}
													{product.image ? (
														<div className='h-32 bg-neutral-700 overflow-hidden relative'>
															<img
																src={product.image}
																alt={product.name}
																className='w-full h-full object-cover group-hover:scale-105 transition-transform'
															/>
															<div className='absolute top-2 right-2 bg-indigo-600/95 backdrop-blur-sm px-2 py-1 rounded-lg'>
																<p className='text-sm font-bold text-white'>S/{product.price.toFixed(2)}</p>
															</div>
														</div>
													) : (
														<div className='h-32 bg-neutral-700 flex items-center justify-center relative group-hover:bg-neutral-650 transition-colors'>
															<CategoryIcon
																size={48}
																className='text-neutral-600 group-hover:text-neutral-500 transition-colors'
															/>
															<div className='absolute top-2 right-2 bg-indigo-600/95 backdrop-blur-sm px-2 py-1 rounded-lg'>
																<p className='text-sm font-bold text-white'>S/{product.price.toFixed(2)}</p>
															</div>
														</div>
													)}

													{/* Contenido */}
													<div className='p-3'>
														<h3 className='font-bold text-sm text-neutral-100 capitalize mb-2 line-clamp-1'>
															{product.name}
														</h3>
														<div className='flex gap-1 flex-wrap'>
															<Chip
																size='sm'
																variant='flat'
																startContent={<CategoryIcon size={12} />}
																className='capitalize bg-neutral-700 text-xs'>
																{categoryData?.label}
															</Chip>
															{product.status === 'ACTIVE' && (
																<Chip
																	size='sm'
																	color='success'
																	variant='flat'
																	className='text-xs'>
																	Activo
																</Chip>
															)}
														</div>
													</div>
												</button>
											);
										})}
									</div>

									{/* Paginación */}
									{totalPages > 1 && (
										<div className='flex justify-center mt-6'>
											<Pagination
												total={totalPages}
												page={currentPage}
												onChange={setCurrentPage}
												showControls
												size='sm'
												classNames={{
													cursor: 'bg-indigo-600',
												}}
											/>
										</div>
									)}
								</>
							)}
						</ModalBody>

						<ModalFooter className='border-t border-neutral-800'>
							<Button
								variant='light'
								onPress={onCloseModal}>
								Cancelar
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
