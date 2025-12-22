import { useRecepcion } from '@/hooks';

interface Props {
	onOpenDetalle: () => void;
}

export const PedidoResumenSticky = ({ onOpenDetalle }: Props) => {
	const { ticket } = useRecepcion();

	// Calcular cantidad total de items
	const totalItems = ticket.dishes.length + ticket.creams.length + (ticket.drinks?.length || 0);

	// Mostrar preview de los primeros items
	const getItemsPreview = () => {
		const items: string[] = [];

		// Agregar platillos
		ticket.dishes.slice(0, 3).forEach((dish) => {
			items.push(dish.dishFood);
		});

		// Si hay espacio, agregar bebidas
		if (items.length < 3 && ticket.drinks) {
			ticket.drinks.slice(0, 3 - items.length).forEach((drink) => {
				items.push(drink.name);
			});
		}

		return items;
	};

	const itemsPreview = getItemsPreview();

	return (
		<div
			onClick={onOpenDetalle}
			className='sticky top-0 z-40 bg-gradient-to-r from-green-700 to-green-600 mx-4 mb-4 rounded-xl p-3 cursor-pointer shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98]'>
			{/* Header */}
			<div className='flex items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='text-xl'>🛒</span>
					<span className='font-semibold text-white text-sm'>Pedido</span>
					<span className='bg-white/20 text-white px-2 py-0.5 rounded-full text-xs font-semibold'>
						{totalItems} {totalItems === 1 ? 'item' : 'items'}
					</span>
				</div>

				<div className='flex items-center gap-2'>
					<span className='text-xl font-bold text-white'>S/ {ticket.totalPrice.toFixed(2)}</span>
					<span className='text-white/70 text-sm'>▼</span>
				</div>
			</div>

			{/* Preview de items */}
			<div className='flex gap-2 mt-2 flex-wrap'>
				{totalItems === 0 ? (
					<span className='text-white/60 text-xs'>Toca para ver detalles</span>
				) : (
					<>
						{itemsPreview.map((item, idx) => (
							<span
								key={idx}
								className='bg-white/15 text-white px-2 py-0.5 rounded-lg text-xs capitalize truncate max-w-[120px]'>
								{item}
							</span>
						))}
						{totalItems > 3 && (
							<span className='bg-white/15 text-white px-2 py-0.5 rounded-lg text-xs'>+{totalItems - 3} más</span>
						)}
					</>
				)}
			</div>
		</div>
	);
};
