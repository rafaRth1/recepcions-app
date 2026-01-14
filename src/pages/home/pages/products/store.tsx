import { useState } from 'react';
import {
	Button,
	Input,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	Select,
	SelectItem,
	Textarea,
	Chip,
	Pagination,
	addToast,
} from '@heroui/react';
import { Formik, Form, FormikHelpers } from 'formik';
import {
	IoAdd,
	IoSearch,
	IoCreate,
	IoTrash,
	IoFastFood,
	IoFilter,
	IoClose,
	IoBeer,
	IoRestaurant,
	IoCheckmarkCircle,
	IoCloseCircle,
	IoNutrition, // Para hamburguesas
	IoSnow, // Para frozen
	IoWater, // Para jugos
	IoIceCream, // Para cremosos
} from 'react-icons/io5';
import { GiChickenLeg, GiChicken, GiFrenchFries, GiSodaCan } from 'react-icons/gi';

import { CategoryProduct, Status } from '@/core/shared/interfaces';
import { CreateProductRequest, Product, ProductFilters } from '@/core/product/interfaces';
import { useGetProducts } from '@/modules/product/hooks/useGetProducts';
import { IconType } from 'react-icons/lib';
import { createProductValidation } from '@/modules/product/validations/createProductValidation';
import { useCreateProduct } from '@/modules/product/hooks/useCreateProduct';
import { useQueryClient } from '@tanstack/react-query';
import { useUpdateProduct } from '@/modules/product/hooks/useUpdateProduct';
import { useDebounce } from '@/hooks/use-debounce';
import { useChangeInactiveProduct } from '@/modules/product/hooks/useChangeInactiveProduct';

const CATEGORIES: { value: CategoryProduct; label: string; icon: IconType }[] = [
	{ value: 'HAMBURGUESAS', label: 'Hamburguesas', icon: IoNutrition },
	{ value: 'SALCHIPAPAS', label: 'Salchipapas', icon: GiFrenchFries },
	{ value: 'POLLO_BROASTER', label: 'Pollo Broaster', icon: GiChicken },
	{ value: 'ALITAS', label: 'Alitas', icon: GiChickenLeg },
	{ value: 'TWISTER', label: 'Twister', icon: IoFastFood },
	{ value: 'COMBO', label: 'Combo', icon: IoRestaurant },
	{ value: 'REFRESCOS', label: 'Refrescos', icon: IoWater },
	{ value: 'FROZEN', label: 'Frozen', icon: IoSnow },
	{ value: 'CREMOSOS', label: 'Cremosos', icon: IoIceCream },
	{ value: 'BATIDOS', label: 'Batidos', icon: IoBeer },
	{ value: 'JUGOS', label: 'Jugos', icon: IoWater },
	{ value: 'CLASICOS', label: 'Clásicos', icon: IoRestaurant },
	{ value: 'GASEOSAS', label: 'Gaseosas', icon: GiSodaCan },
	{ value: 'PIDELO_CON_CHAUFA', label: 'Pídelo con Chaufa', icon: IoFastFood },
];

const STATUS_OPTIONS: { value: Status; label: string }[] = [
	{ value: 'ACTIVE', label: 'Activo' },
	{ value: 'INACTIVE', label: 'Inactivo' },
];

// Valores iniciales para Formik
const initialValues: CreateProductRequest = {
	name: '',
	price: 0,
	category: 'HAMBURGUESAS',
	description: '',
	ingredients: [],
	tags: [],
	discount: 0,
	image: '',
};

export const Store = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<CategoryProduct | ''>('');
	const [selectedStatus, setSelectedStatus] = useState<Status | ''>('');
	const [currentPage, setCurrentPage] = useState(1);
	const [editingProduct, setEditingProduct] = useState<Product | null>(null);
	const { createProduct } = useCreateProduct();
	const { updateProduct } = useUpdateProduct();
	const { changeInactiveProduct } = useChangeInactiveProduct();
	const queryClient = useQueryClient();

	// Aplicar debounce al searchQuery
	const debouncedSearchQuery = useDebounce(searchQuery, 500);

	// Construir filtros con el valor debounced
	const filters: ProductFilters = {
		search: debouncedSearchQuery || undefined,
		category: selectedCategory || undefined,
		status: selectedStatus || undefined,
		page: currentPage,
		limit: 10,
		sortBy: 'createdAt',
		sortOrder: 'desc',
	};

	// Obtener productos con filtros
	const { data, isLoading, isFetching } = useGetProducts(filters);

	const products = data?.products || [];
	const totalPages = data?.totalPages || 0;
	const totalProducts = data?.totalProducts || 0;

	const handleSearchChange = (value: string) => {
		setSearchQuery(value);
		setCurrentPage(1); // Resetear a página 1 cuando se busca
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
		setSelectedCategory('');
		setSelectedStatus('');
		setCurrentPage(1);
	};

	const handleOpenModal = (product?: Product) => {
		setEditingProduct(product || null);
		onOpen();
	};

	const handleSubmitForm = async (values: Product, helpers: FormikHelpers<Product>) => {
		if (editingProduct) {
			if (!editingProduct._id) {
				addToast({
					description: 'Error: El producto a editar no tiene ID.',
					color: 'danger',
				});

				return;
			}

			updateProduct.mutate(
				{
					...values,
					id: editingProduct._id,
				},
				{
					onSuccess: (response) => {
						console.log('response', response);
						addToast({
							description: response.message,
							color: 'success',
						});

						queryClient.invalidateQueries({ queryKey: ['products'] });
						onOpenChange();
						helpers.resetForm();
					},
					onError: (error) => {
						console.log('error', error);
						addToast({
							description: error.message,
							color: 'danger',
						});
					},
				}
			);
		} else {
			createProduct.mutate(values, {
				onSuccess: (response) => {
					console.log('response', response);
					addToast({
						description: response.message,
						color: 'success',
					});

					queryClient.invalidateQueries({ queryKey: ['products'] });
					onOpenChange();
					helpers.resetForm();
				},
				onError: (error) => {
					console.log('error', error);
					addToast({
						description: error.message,
						color: 'danger',
					});
				},
			});
		}
	};

	const handleDeleteProduct = async (id: string) => {
		const confirmDelete = confirm('¿Eliminar este producto?');
		if (!confirmDelete) {
			return;
		}

		changeInactiveProduct.mutate(id, {
			onSuccess: (message) => {
				addToast({
					description: message,
					color: 'success',
				});

				queryClient.invalidateQueries({ queryKey: ['products'] });
			},
			onError: (error) => {
				addToast({
					description: error.message,
					color: 'danger',
				});
			},
		});
	};

	const getCategoryData = (category: CategoryProduct) => {
		return CATEGORIES.find((c) => c.value === category);
	};

	const hasActiveFilters = searchQuery || selectedCategory || selectedStatus;

	return (
		<main className='p-4 max-w-7xl mx-auto pb-20'>
			{/* Header */}
			<div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6'>
				<div>
					<h1 className='text-2xl font-semibold text-neutral-100 flex items-center gap-2 mb-1'>
						<IoFastFood size={28} />
						Gestión de Productos
					</h1>
					<p className='text-sm text-neutral-400'>{isLoading ? 'Cargando...' : `${totalProducts} productos encontrados`}</p>
				</div>
				<Button
					className='bg-indigo-700 font-semibold'
					size='lg'
					onPress={() => handleOpenModal()}
					startContent={<IoAdd size={20} />}>
					Nuevo Producto
				</Button>
			</div>

			{/* Filtros */}
			<div className='bg-neutral-900 rounded-xl p-4 mb-6'>
				<div className='flex items-center justify-between mb-3'>
					<div className='flex items-center gap-2'>
						<IoFilter
							size={18}
							className='text-neutral-400'
						/>
						<p className='text-sm font-medium text-neutral-400'>Filtros</p>
					</div>
					{hasActiveFilters && (
						<Button
							size='sm'
							variant='light'
							onPress={handleClearFilters}
							startContent={<IoClose size={16} />}>
							Limpiar filtros
						</Button>
					)}
				</div>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
					{/* Búsqueda con indicador de búsqueda activa */}
					<div className='relative'>
						<Input
							placeholder='Buscar producto...'
							aria-label='Buscar'
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
									{searchQuery && (
										<button onClick={() => handleSearchChange('')}>
											<IoClose
												size={18}
												className='text-neutral-400 hover:text-neutral-200'
											/>
										</button>
									)}
								</>
							}
							classNames={{
								input: 'text-base',
							}}
						/>
					</div>

					{/* Categoría */}
					<Select
						placeholder='Todas las categorías'
						aria-label='Seleccionar una categoria'
						selectedKeys={selectedCategory ? new Set([selectedCategory]) : new Set()}
						onChange={(e) => handleCategoryChange(e.target.value)}
						classNames={{
							trigger: 'bg-neutral-800',
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
						aria-label='Seleccionar una estado'
						selectedKeys={selectedStatus ? new Set([selectedStatus]) : new Set()}
						onChange={(e) => handleStatusChange(e.target.value)}
						classNames={{
							trigger: 'bg-neutral-800',
						}}>
						{STATUS_OPTIONS.map((status) => (
							<SelectItem
								key={status.value}
								startContent={status.value === 'ACTIVE' ? <IoCheckmarkCircle size={18} /> : <IoCloseCircle size={18} />}>
								{status.label}
							</SelectItem>
						))}
					</Select>
				</div>
			</div>

			{/* Loading State */}
			{isLoading && (
				<div className='bg-neutral-900 rounded-xl p-12 text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4'></div>
					<p className='text-neutral-400'>Cargando productos...</p>
				</div>
			)}

			{/* Lista de productos en Cards */}
			{!isLoading && products.length === 0 ? (
				<div className='bg-neutral-900 rounded-xl p-12 text-center'>
					<IoFastFood
						size={64}
						className='mx-auto mb-4 text-neutral-600'
					/>
					<p className='text-neutral-400 mb-2'>No hay productos</p>
					<p className='text-sm text-neutral-500'>
						{hasActiveFilters ? 'Intenta con otros filtros' : 'Crea tu primer producto'}
					</p>
				</div>
			) : (
				!isLoading && (
					<>
						<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-stretch'>
							{products.map((product) => {
								const categoryData = getCategoryData(product.category);
								const CategoryIcon = categoryData?.icon || IoFastFood;

								return (
									<div
										key={product._id}
										className={`bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 group flex flex-col h-full ${
											isFetching ? 'opacity-50' : ''
										}`}>
										{/* Imagen */}
										{/* {product.image ? (
											<div className='h-48 bg-neutral-800 overflow-hidden relative flex-shrink-0'>
												<img
													src={product.image}
													alt={product.name}
													className='w-full h-full object-cover'
												/>
												<div className='absolute top-3 right-3 bg-indigo-600/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg'>
													<p className='text-lg font-bold text-white'>S/{product.price.toFixed(2)}</p>
												</div>
												{product.discount && product.discount > 0 && (
													<div className='absolute top-3 left-3 bg-green-500/95 backdrop-blur-sm px-2 py-1 rounded-lg'>
														<p className='text-xs font-bold text-white'>-{product.discount}%</p>
													</div>
												)}
											</div>
										) : (
											<div className='h-48 bg-neutral-800 flex items-center justify-center relative group-hover:bg-neutral-750 transition-colors flex-shrink-0'>
												<CategoryIcon
													size={72}
													className='text-neutral-600 group-hover:text-neutral-500 transition-colors'
												/>
												<div className='absolute top-3 right-3 bg-indigo-600/95 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg'>
													<p className='text-lg font-bold text-white'>S/{product.price.toFixed(2)}</p>
												</div>
												{product.discount && product.discount > 0 ? (
													<div className='absolute top-3 left-3 bg-green-500/95 backdrop-blur-sm px-2 py-1 rounded-lg'>
														<p className='text-xs font-bold text-white'>-{product.discount}%</p>
													</div>
												) : null}
											</div>
										)} */}

										{/* Contenido */}
										<div className='p-4 flex flex-col flex-grow'>
											{/* Título y badges */}
											<div className='mb-3'>
												<h3 className='font-bold text-lg text-neutral-100 capitalize mb-2 line-clamp-1 min-h-[28px]'>
													{product.name}
												</h3>
												<div className='flex gap-2 flex-wrap'>
													<Chip
														size='sm'
														variant='flat'
														startContent={<CategoryIcon size={14} />}
														className='capitalize bg-neutral-800'>
														{categoryData?.label}
													</Chip>
													<Chip
														size='sm'
														color={product.status === 'ACTIVE' ? 'success' : 'default'}
														variant='flat'
														startContent={
															product.status === 'ACTIVE' ? (
																<IoCheckmarkCircle size={14} />
															) : (
																<IoCloseCircle size={14} />
															)
														}>
														{product.status === 'ACTIVE' ? 'Activo' : 'Inactivo'}
													</Chip>
												</div>
											</div>

											{/* Descripción */}
											<div className='mb-3 flex-grow'>
												{product.description ? (
													<p className='text-sm text-neutral-400 line-clamp-2'>{product.description}</p>
												) : (
													<p className='text-sm text-neutral-500 italic'>Sin descripción</p>
												)}
											</div>

											{/* Acciones */}
											<div className='grid grid-cols-2 gap-2 mt-auto'>
												<Button
													size='sm'
													className='bg-indigo-700 hover:bg-indigo-600 font-medium'
													onPress={() => handleOpenModal(product)}
													startContent={<IoCreate size={16} />}>
													Editar
												</Button>
												<Button
													size='sm'
													color='danger'
													variant='flat'
													onPress={() => handleDeleteProduct(product._id!)}
													startContent={<IoTrash size={16} />}>
													Eliminar
												</Button>
											</div>
										</div>
									</div>
								);
							})}
						</div>

						{/* Paginación */}
						{totalPages > 1 && (
							<div className='flex justify-center mt-8'>
								<Pagination
									total={totalPages}
									page={currentPage}
									onChange={setCurrentPage}
									showControls
									classNames={{
										cursor: 'bg-indigo-600',
									}}
								/>
							</div>
						)}
					</>
				)
			)}

			{/* Modal Crear/Editar con Formik */}
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				size='2xl'
				disableAnimation
				scrollBehavior='inside'>
				<ModalContent>
					{(onClose) => (
						<Formik
							initialValues={editingProduct || initialValues}
							validationSchema={createProductValidation}
							onSubmit={handleSubmitForm}
							enableReinitialize>
							{({ values, errors, touched, setFieldValue }) => (
								<Form>
									<ModalHeader>
										<h2 className='text-xl flex items-center gap-2'>
											<IoFastFood size={24} />
											{editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
										</h2>
									</ModalHeader>
									<ModalBody>
										<div className='space-y-4'>
											{/* Nombre */}
											<div>
												<Input
													label='Nombre del producto'
													placeholder='Ej: Pollo a la Brasa'
													value={values.name}
													onValueChange={(value) => setFieldValue('name', value)}
													isRequired
													isInvalid={touched.name && !!errors.name}
													classNames={{ label: 'text-sm font-medium' }}
													errorMessage={errors.name}
												/>
											</div>

											{/* Precio y Categoría */}
											<div className='grid grid-cols-2 gap-3'>
												<div>
													<Input
														type='number'
														label='Precio (S/)'
														placeholder='0.00'
														value={values.price.toString()}
														onValueChange={(value) => setFieldValue('price', parseFloat(value) || 0)}
														isRequired
														isInvalid={touched.price && !!errors.price}
														startContent={<span className='text-neutral-400'>S/</span>}
														classNames={{ label: 'text-sm font-medium' }}
														errorMessage={errors.price}
													/>
												</div>

												<div>
													<Select
														label='Categoría'
														selectedKeys={new Set([values.category])}
														onChange={(e) => setFieldValue('category', e.target.value)}
														isRequired
														isInvalid={touched.category && !!errors.category}
														classNames={{ label: 'text-sm font-medium' }}
														errorMessage={errors.category}>
														{CATEGORIES.map((cat) => (
															<SelectItem
																key={cat.value}
																startContent={<cat.icon size={18} />}>
																{cat.label}
															</SelectItem>
														))}
													</Select>
												</div>
											</div>

											{/* Descripción */}
											<div>
												<Textarea
													label='Descripción'
													placeholder='Descripción del producto...'
													value={values.description}
													onValueChange={(value) => setFieldValue('description', value)}
													classNames={{ label: 'text-sm font-medium' }}
													errorMessage={errors.description}
												/>
											</div>

											{/* Calorías y Descuento */}
											{/* <div className='grid grid-cols-1 gap-3'>
												<div>
													<Input
														type='number'
														label='Descuento (%)'
														placeholder='0'
														value={values.discount?.toString() || ''}
														onValueChange={(value) => setFieldValue('discount', parseInt(value) || 0)}
														isInvalid={touched.discount && !!errors.discount}
														endContent={<span className='text-neutral-400'>%</span>}
														classNames={{ label: 'text-sm font-medium' }}
													/>
													<ErrorMessage
														name='discount'
														component='div'
														className='text-xs text-red-500 mt-1'
													/>
												</div>
											</div> */}

											{/* URL Imagen */}
											{/* <div>
												<Input
													label='URL de imagen'
													placeholder='https://...'
													value={values.image}
													onValueChange={(value) => setFieldValue('image', value)}
													isInvalid={touched.image && !!errors.image}
													startContent={
														<IoImage
															size={18}
															className='text-neutral-400'
														/>
													}
													classNames={{ label: 'text-sm font-medium' }}
												/>
												<ErrorMessage
													name='image'
													component='div'
													className='text-xs text-red-500 mt-1'
												/>
											</div> */}
										</div>
									</ModalBody>
									<ModalFooter>
										<Button
											variant='light'
											onPress={onClose}>
											Cancelar
										</Button>
										<Button
											type='submit'
											className='bg-indigo-700'
											isLoading={createProduct.isPending || updateProduct.isPending}>
											{editingProduct ? 'Actualizar' : 'Crear'} Producto
										</Button>
									</ModalFooter>
								</Form>
							)}
						</Formik>
					)}
				</ModalContent>
			</Modal>
		</main>
	);
};
