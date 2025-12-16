import { Button, Input, useDisclosure } from '@heroui/react';
import { v4 } from 'uuid';
import { useRecepcion } from '@/hooks';
import { IoAdd } from 'react-icons/io5';
import { Dish } from '@/core/ticket/interfaces';
import { ProductSelectorModal } from '@/components/product-select-modal';
import { Product } from '@/core/product/interfaces';

const initialValueDish: Dish = {
	key: '',
	price: 0,
	dishFood: '',
	rice: false,
	salad: true,
};

export const RecepcionFood = () => {
	const { ticket, setTicket, dish, setDish } = useRecepcion();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleSelectProduct = (product: Product) => {
		setDish({
			...dish,
			dishFood: product.name,
			price: product.price,
		});
	};

	const handleAddDishToTicket = () => {
		if (!dish.dishFood || dish.price === 0) return;
		setTicket({
			...ticket,
			dishes: [...ticket.dishes, { ...dish, key: v4() }],
			totalPrice: ticket.totalPrice + dish.price,
		});

		setDish(initialValueDish);
	};

	return (
		<div className='space-y-4'>
			{/* Input nombre/mesa */}
			<Input
				type='text'
				label='Nombre del cliente o mesa'
				placeholder='Ej: Mesa 5 o Juan Pérez'
				classNames={{
					label: 'text-sm font-medium',
				}}
				value={ticket.nameTicket}
				onValueChange={(e) => setTicket({ ...ticket, nameTicket: e })}
			/>

			{/* Input para abrir modal de búsqueda */}
			<div>
				<Input
					label='Buscar platillo'
					placeholder='Click para buscar...'
					value={dish.dishFood}
					onClick={onOpen}
					readOnly
					classNames={{
						label: 'text-sm font-medium',
						input: 'cursor-pointer',
					}}
				/>
			</div>

			{/* Mostrar platillo seleccionado */}
			{dish.dishFood && (
				<div className='bg-indigo-600/10 border border-indigo-600/30 rounded-lg p-3'>
					<div className='flex items-center justify-between'>
						<div>
							<p className='font-medium capitalize'>{dish.dishFood}</p>
							<p className='text-sm text-neutral-400'>Precio: S/ {dish.price.toFixed(2)}</p>
						</div>
						<button
							onClick={() => setDish(initialValueDish)}
							className='text-red-500 hover:text-red-400 text-sm'>
							Limpiar
						</button>
					</div>
				</div>
			)}

			{/* Opciones - TOGGLE SWITCHES */}
			<div className='grid grid-cols-2 gap-3'>
				{/* Toggle Arroz */}
				<button
					onClick={() => setDish({ ...dish, rice: !dish.rice })}
					className={`
						p-4 rounded-xl transition-all duration-200
						flex items-center justify-between border
						${dish.rice ? 'bg-indigo-600/20 border-indigo-600 text-indigo-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}
					`}>
					<span className='font-medium text-sm'>Arroz</span>
					<div
						className={`
							w-12 h-6 rounded-full relative transition-all duration-200
							${dish.rice ? 'bg-indigo-600' : 'bg-neutral-600'}
						`}>
						<div
							className={`
								absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
								${dish.rice ? 'right-1' : 'left-1'}
							`}
						/>
					</div>
				</button>

				{/* Toggle Ensalada */}
				<button
					onClick={() => setDish({ ...dish, salad: !dish.salad })}
					className={`
						p-4 rounded-xl transition-all duration-200
						flex items-center justify-between border
						${dish.salad ? 'bg-green-600/20 border-green-600 text-green-400' : 'bg-neutral-800 border-neutral-700 text-neutral-400'}
					`}>
					<span className='font-medium text-sm'>Ensalada</span>
					<div
						className={`
							w-12 h-6 rounded-full relative transition-all duration-200
							${dish.salad ? 'bg-green-600' : 'bg-neutral-600'}
						`}>
						<div
							className={`
								absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-200
								${dish.salad ? 'right-1' : 'left-1'}
							`}
						/>
					</div>
				</button>
			</div>

			{/* Botón agregar */}
			<Button
				className='bg-indigo-700 w-full'
				isDisabled={!dish.dishFood || dish.price === 0}
				onPress={handleAddDishToTicket}
				startContent={<IoAdd size={20} />}>
				Agregar Platillo
			</Button>

			{/* Modal de selección */}
			<ProductSelectorModal
				isOpen={isOpen}
				onClose={onClose}
				onSelect={handleSelectProduct}
				defaultCategory='COMIDA'
			/>
		</div>
	);
};
