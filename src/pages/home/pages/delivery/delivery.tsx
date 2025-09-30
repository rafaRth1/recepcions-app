import { useCallback, useEffect, useState } from 'react';
import { useDisclosure } from "@heroui/react";
import { clientAxios } from '@/utils';
import { DeliveryItem } from './delivery-item';
import { DeliveryModal } from './delivery-modal';
import { TicketProps } from '@/types';
import { initialValueTicket } from '@/data';

export const Delivery = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [ticketsUser, setTickestUser] = useState<TicketProps[]>([]);
	const [selectTicket, setSelectTicket] = useState<TicketProps>(initialValueTicket);

	const handleFinishDeliveryTicket = useCallback(
		async (id: string) => {
			try {
				const { data } = await clientAxios.put(`/recepcion/store/${id}`, {
					status_delivery: 'completed',
				});

				console.log(data);

				const updateTickets = ticketsUser.filter((ticket) => ticket._id !== id);
				setTickestUser(updateTickets);
			} catch (error) {
				console.log(error);
			}
		},
		[ticketsUser]
	);

	const handleOnOpenModal = useCallback((ticket: TicketProps) => {
		setSelectTicket(ticket);
		onOpen();
	}, []);

	useEffect(() => {
		const getTickets = async () => {
			const { data } = await clientAxios.get<TicketProps[]>('/recepcion/delivery');
			setTickestUser(data);
		};

		getTickets();
	}, []);

	return (
		<main className='flex flex-col h-[calc(100dvh-72px)]'>
			<h1 className='text-xl p-4'>Sección de Delivery</h1>

			<section className='overflow-hidden grow relative h-full overflow-x-auto'>
				<div className='absolute inset-0 overflow-x-auto p-4 min-w-[908px] grid grid-cols-2 min-[1320px]:grid-cols-3 gap-4 '>
					{ticketsUser.map((ticket) => (
						<DeliveryItem
							key={ticket._id}
							ticket={ticket}
							handleFinishDeliveryTicket={handleFinishDeliveryTicket}
							handleOnOpenModal={handleOnOpenModal}
						/>
					))}
				</div>
			</section>

			<DeliveryModal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				selectTicket={selectTicket}
			/>
		</main>
	);
};
