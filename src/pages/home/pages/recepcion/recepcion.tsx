import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDisclosure, Input, Tabs, Tab } from '@heroui/react';
import { RecepcionProvider } from '@/context/recepcion-context/recepcion-provider';
import { useRecepcion } from '@/hooks';
import { Dish } from '@/core/ticket/interfaces';
import { IoAddCircle, IoReceipt } from 'react-icons/io5';

// Componentes nuevos
import { PedidoResumenSticky } from './pedido-resumen-sticky';
import { ModalDetallePedido } from './modal-detalle-pedido';
import { ModalExtrasItem } from './modal-extras-item';
import { ProductGridQuick } from './product-grid-quick';

// Componentes existentes que mantenemos
import { HeaderRecepcion } from './header-recepcion';
import { Tickets } from './tickets';

// Componente interno que usa el contexto
const RecepcionContent = () => {
	const { ticket, setTicket, tickets } = useRecepcion();
	const location = useLocation();
	const editingTicket = location.state?.editingTicket;

	// Estados para los modales
	const { isOpen: isOpenDetalle, onOpen: onOpenDetalle, onClose: onCloseDetalle } = useDisclosure();
	const { isOpen: isOpenExtras, onOpen: onOpenExtras, onClose: onCloseExtras } = useDisclosure();
	const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

	// Estado para tabs
	const [activeTab, setActiveTab] = useState<'nuevo' | 'pendientes'>('nuevo');

	// Función para abrir modal de extras de un platillo
	const handleOpenExtras = (dish: Dish) => {
		setSelectedDish(dish);
		onOpenExtras();
	};

	useEffect(() => {
		if (editingTicket) {
			setTicket({
				...editingTicket,
				key: editingTicket?._id,
			});
		}
	}, [editingTicket, setTicket]);

	return (
		<>
			<main className='pb-20'>
				<div className='max-w-[820px] mx-auto'>
					{/* Header - Tipo de pedido */}
					<div className='p-4 pb-0'>
						<HeaderRecepcion />
					</div>

					{/* Tabs - Nuevo Pedido / Pendientes */}
					<div className='px-4 mb-4'>
						<Tabs
							selectedKey={activeTab}
							onSelectionChange={(key) => setActiveTab(key as 'nuevo' | 'pendientes')}
							classNames={{
								base: 'w-full',
								tabList: 'bg-neutral-900 p-1 rounded-xl',
								tab: 'px-6 py-3',
								cursor: 'bg-indigo-700',
								tabContent: 'group-data-[selected=true]:text-white',
							}}>
							<Tab
								key='nuevo'
								title={
									<div className='flex items-center gap-2'>
										<IoAddCircle size={18} />
										<span>Nuevo Pedido</span>
									</div>
								}
							/>
							<Tab
								key='pendientes'
								title={
									<div className='flex items-center gap-2 relative'>
										<IoReceipt size={18} />
										<span>Pendientes</span>
										{tickets.length > 0 && (
											<span className='ml-1 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full'>
												{tickets.length}
											</span>
										)}
									</div>
								}
							/>
						</Tabs>
					</div>

					{/* Contenido según tab activa */}
					{activeTab === 'nuevo' ? (
						<>
							{/* Banner Sticky con Resumen */}
							<PedidoResumenSticky onOpenDetalle={onOpenDetalle} />

							<div className='px-4 space-y-6'>
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

								{/* Grid de productos para agregar rápido */}
								<div>
									<p className='text-xs font-semibold text-neutral-400 uppercase tracking-wide mb-3'>
										Agregar Productos
									</p>
									<ProductGridQuick />
								</div>
							</div>
						</>
					) : (
						<div className='px-4'>
							{/* Vista de Tickets Pendientes */}
							<Tickets setActiveTab={setActiveTab} />
						</div>
					)}
				</div>
			</main>

			{/* Modal Detalle del Pedido */}
			<ModalDetallePedido
				isOpen={isOpenDetalle}
				onClose={onCloseDetalle}
				onOpenExtras={handleOpenExtras}
			/>

			{/* Modal Extras de Item */}
			<ModalExtrasItem
				isOpen={isOpenExtras}
				onClose={onCloseExtras}
				dish={selectedDish}
			/>
		</>
	);
};

// Componente principal que provee el contexto
export const Recepcion = () => {
	return (
		<RecepcionProvider>
			<RecepcionContent />
		</RecepcionProvider>
	);
};
