import { useState } from 'react';
import { Button, Checkbox, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { IoCloseOutline } from 'react-icons/io5';
import { foods } from '@/data/food';

export const RecepcionFood = () => {
	const { ticket, setTicket, resultDishes, dish, setDish, setResulDishes } = useRecepcion();

	const [inputSearch, setInputSearch] = useState('');
	const [active, setActive] = useState(false);

	const handleSetQuery = (e: string) => {
		setInputSearch(e);
		handleSearch(e);
	};

	const handleSearch = (e: string) => {
		const results = foods.filter((food) => food && food.key && food.key.includes(e));
		setResulDishes(results);
	};

	const handleAddDishToTicket = () => {
		setTicket({
			...ticket,
			dishes: [...ticket.dishes, { ...dish, key: crypto.randomUUID() }],
			totalPrice: ticket.totalPrice + dish.price,
		});

		setInputSearch('');
	};

	return (
		<div>
			<h1 className='text-neutral-100 text-xl font-semibold mb-5'>Sección de recepciones</h1>

			<Input
				type='text'
				label='Ingresar nombre o mesa'
				className='mb-5'
				classNames={{
					input: 'uppercase',
				}}
				value={ticket.name_ticket}
				onValueChange={(e) => setTicket({ ...ticket, name_ticket: e })}
			/>

			<div className='relative'>
				<div className='flex gap-2'>
					<Input
						type='text'
						label='Elegir Comida'
						className=''
						classNames={{
							input: '',
						}}
						value={inputSearch}
						onFocus={() => setActive(true)}
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
						className='mt-5'
						classNames={{
							wrapper: 'max-h-[200px]',
						}}>
						<TableHeader>
							<TableColumn>NAME</TableColumn>
						</TableHeader>
						<TableBody>
							{resultDishes.map((dishItem) => (
								<TableRow
									key={dishItem.key}
									onClick={() => {
										setInputSearch(dishItem.dish_food),
											setDish({ ...dish, dish_food: dishItem.dish_food, price: dishItem.price });
									}}>
									<TableCell>{dishItem.dish_food}</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				)}
			</div>

			<div className='flex flex-col mb-5'>
				<div className='mt-4'>
					<div className='flex flex-col'>
						<p className='text-neutral-400 mb-3'>Con arroz:</p>

						<div>
							<Checkbox
								className='mr-4'
								isSelected={dish.rice}
								onValueChange={() => setDish({ ...dish, rice: true })}>
								Si
							</Checkbox>

							<Checkbox
								isSelected={dish.rice ? false : true}
								onValueChange={() => setDish({ ...dish, rice: false })}>
								No
							</Checkbox>
						</div>
					</div>
				</div>

				<div className='mt-4'>
					<div className='flex flex-col'>
						<p className='text-neutral-400 mb-3'>Con ensalada:</p>

						<div>
							<Checkbox
								className='mr-4'
								isSelected={dish.salad}
								onValueChange={() => setDish({ ...dish, salad: true })}>
								Si
							</Checkbox>

							<Checkbox
								isSelected={dish.salad ? false : true}
								onValueChange={() => setDish({ ...dish, salad: false })}>
								No
							</Checkbox>
						</div>
					</div>
				</div>
			</div>

			<Button
				className='bg-indigo-700 mb-5 w-full'
				onClick={() => handleAddDishToTicket()}>
				Agregar plato
			</Button>
		</div>
	);
};
