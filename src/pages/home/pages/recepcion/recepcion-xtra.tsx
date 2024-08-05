import { useState } from 'react';
import {
	Button,
	Input,
	Radio,
	RadioGroup,
	Table,
	TableBody,
	TableCell,
	TableColumn,
	TableHeader,
	TableRow,
	Textarea,
} from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { drinks } from '@/data/drinks';
import { IoCloseOutline } from 'react-icons/io5';
import { DrinkProps } from '@/types';

export const RecepcionXtra = () => {
	const { dish, setDish, handleAddTicket, handleFinishTicket } = useRecepcion();
	const [inputDrink, setInputSearch] = useState('');
	const [resultDrinks, setResultDrins] = useState<DrinkProps[]>(drinks);
	const [active, setActive] = useState(false);

	const handleSetQuery = (e: string) => {
		setInputSearch(e);
		handleSearch(e);
	};

	const handleSearch = (e: string) => {
		const results = drinks.filter((drink) => drink && drink.key && drink.key.includes(e));
		setResultDrins(results);
	};

	return (
		<div>
			<div className='flex gap-2 mb-4'>
				<Input
					type='text'
					label='Nombre bebida'
					onFocus={() => setActive(true)}
					value={inputDrink}
					onChange={(e) => handleSetQuery(e.target.value)}
				/>

				<Button
					className='h-auto'
					variant='light'
					onPress={() => setActive(false)}>
					<IoCloseOutline size={30} />
				</Button>
			</div>

			{active && (
				<Table
					hideHeader
					aria-label='Tabla de platos'
					className='mb-4'
					classNames={{
						wrapper: 'max-h-[200px]',
					}}>
					<TableHeader>
						<TableColumn>NAME</TableColumn>
					</TableHeader>
					<TableBody>
						{resultDrinks.map((drink) => (
							<TableRow
								key={drink.key}
								// onClick={() => {
								// 	setSearch(dishItem.name), setDish({ ...dish, dish_food: dishItem.name });
								// }}
							>
								<TableCell>{drink.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}

			<Button
				className='bg-indigo-700 mb-5 w-full'
				onClick={() => console.log('agregar bebida')}>
				Agregar bebida
			</Button>

			<Textarea
				label='Excepción del pedido'
				className='mb-5'
			/>

			<RadioGroup
				className='mb-5'
				label='Tipo de pedido'
				orientation='horizontal'
				value={dish.type}
				onValueChange={(e) => setDish({ ...dish, type: e })}>
				<Radio value='mesa'>Mesa</Radio>
				<Radio value='delivery'>Delivery</Radio>
				<Radio value='recojo'>Recojo</Radio>
			</RadioGroup>

			<Button
				className='mb-5 w-full'
				color='warning'
				onClick={() => handleAddTicket()}>
				Agregar Ticket
			</Button>

			<Button
				className='w-full'
				color='danger'
				onClick={() => handleFinishTicket()}>
				Mandar a cocina tickets
			</Button>
		</div>
	);
};
