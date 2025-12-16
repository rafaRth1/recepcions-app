import { Button } from '@heroui/react';
import { v4 } from 'uuid';
import { useRecepcion } from '@/hooks';
import { creams } from '@/data';
import { IoAdd, IoCheckmark } from 'react-icons/io5';

export const RecepcionCream = () => {
	const { selected, setSelected, ticket, setTicket } = useRecepcion();

	const handleAddCreams = () => {
		setTicket({ ...ticket, creams: [...ticket.creams, { key: v4(), creams: selected }] });
		setSelected([]);
	};

	const handleToggleCream = (creamKey: string) => {
		if (selected.includes(creamKey)) {
			setSelected(selected.filter((key) => key !== creamKey));
		} else {
			setSelected([...selected, creamKey]);
		}
	};

	return (
		<div className='my-4'>
			<p className='font-semibold text-neutral-400 uppercase tracking-wide mb-3'>Cremas y Salsas</p>

			{/* Grid de chips */}
			<div className='grid grid-cols-3 gap-2 mb-4'>
				{creams.map((cream) => (
					<button
						key={cream.key}
						onClick={() => handleToggleCream(cream.key)}
						className={`
							relative py-3 px-3 rounded-lg font-medium text-sm transition-all duration-200
							flex items-center justify-center
							${selected.includes(cream.key) ? 'bg-indigo-600 text-white' : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'}
						`}>
						{selected.includes(cream.key) && (
							<IoCheckmark
								className='absolute top-1 right-1'
								size={14}
							/>
						)}
						<span className='capitalize'>{cream.name}</span>
					</button>
				))}
			</div>

			<Button
				className='bg-indigo-700 w-full'
				onPress={() => handleAddCreams()}
				startContent={<IoAdd size={20} />}>
				Agregar Cremas
			</Button>
		</div>
	);
};
