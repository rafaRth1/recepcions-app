import { Button, Checkbox, CheckboxGroup } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { creams } from '@/data/creams';

export const RecepcionCream = () => {
	const { selected, setSelected, ticket, setTicket } = useRecepcion();

	const handleAddCreams = () => {
		setTicket({ ...ticket, creams: [...ticket.creams, { key: crypto.randomUUID(), creams: selected }] });
	};

	return (
		<div>
			<CheckboxGroup
				label='Elegir cremas'
				color='warning'
				orientation='horizontal'
				className='mb-5'
				value={selected}
				onValueChange={setSelected}>
				{creams.map((cream) => (
					<Checkbox
						key={cream.key}
						value={cream.key}>
						{cream.name}
					</Checkbox>
				))}
			</CheckboxGroup>

			<Button
				className='bg-indigo-700 mb-5 w-full'
				onClick={() => handleAddCreams()}>
				Agregar cremas
			</Button>
		</div>
	);
};
