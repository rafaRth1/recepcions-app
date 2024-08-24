import { useState } from 'react';
import { Button, Checkbox, Input, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useRecepcion } from '@/hooks';
import { InputSearch } from '@/components/input-search/input-search';
import { foods } from '@/data/food';
import { DishProps, FoodProps } from '@/types';

const initialValueDish: DishProps = {
	key: '',
	price: 0,
	dish_food: '',
	rice: false,
	salad: true,
};

export const RecepcionFood = () => {
	const { ticket, setTicket, dish, setDish } = useRecepcion();
	const [inputSearch, setInputSearch] = useState('');
	const [resultDishes, setResulDishes] = useState<FoodProps[]>(foods);

	const handleSetQuery = (value: string) => {
		if (value.length === 0) setDish(initialValueDish);

		setInputSearch(value);
		handleSearch(value);
	};

	const handleSearch = (e: string) => {
		const results = foods.filter((food) => food && food.key && food.key.includes(e));
		setResulDishes(results);
	};

	const handleAddDishToTicket = () => {
		if (inputSearch.length === 0) return;

		setTicket({
			...ticket,
			dishes: [...ticket.dishes, { ...dish, key: crypto.randomUUID() }],
			total_price: ticket.total_price + dish.price,
		});

		setInputSearch('');
	};

	return (
		<div>
			<Input
				type='text'
				label='Ingresar nombre o mesa'
				className='mb-4'
				classNames={{
					input: 'uppercase',
				}}
				value={ticket.name_ticket}
				onValueChange={(e) => setTicket({ ...ticket, name_ticket: e })}
			/>

			<div className='relative mb-4'>
				<InputSearch
					value={inputSearch}
					handleOnchange={handleSetQuery}
					label='Elegir comida'>
					<Table
						hideHeader
						aria-label='Tabla de platos'
						className='mt-4'
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
				</InputSearch>
			</div>

			<div className='flex flex-col mb-4'>
				<div className='mb-4'>
					<div className='flex flex-col'>
						<p className='text-neutral-400 mb-4'>Con arroz:</p>

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

				<div className='mb-4'>
					<div className='flex flex-col'>
						<p className='text-neutral-400 mb-4'>Con ensalada:</p>

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
				className='bg-indigo-700 mb-4 w-full'
				onClick={() => handleAddDishToTicket()}>
				Agregar plato
			</Button>
		</div>
	);
};

// export const RecepcionFood = () => {
// 	const { setDish } = useRecepcion();

// 	const [valuesFood, setValuesFood] = useState({
// 		name_ticket: '',
// 		dish: {
// 			dish_food: '',
// 			price: 0,
// 		} as FoodProps,
// 		rice: false,
// 		salad: true,
// 	});
// 	const [resultDishes, setResulDishes] = useState<FoodProps[]>(foods);
// 	const [active, setActive] = useState(false);

// 	const handleSetQuery = (e: string) => {
// 		setValuesFood({ ...valuesFood, dish: { ...valuesFood.dish, dish_food: e } });
// 		handleSearch(e);
// 	};

// 	const handleSearch = (e: string) => {
// 		const results = foods.filter((food) => food && food.key && food.key.includes(e));
// 		setResulDishes(results);
// 	};

// 	const handleAddDishToTicket = () => {
// 		console.log(valuesFood);

// 		// setTicket({
// 		// 	...ticket,
// 		// 	dishes: [...ticket.dishes, { ...dish, key: crypto.randomUUID() }],
// 		// 	totalPrice: ticket.totalPrice + dish.price,
// 		// });

// 		// setValuesFood({
// 		// 	name_ticket: '',
// 		// 	dish_food: '',
// 		// 	rice: false,
// 		// 	salad: true,
// 		// });
// 	};

// 	return (
// 		<div>
// 			<h1 className='text-neutral-100 text-xl font-semibold mb-5'>Sección de recepciones</h1>

// 			<Input
// 				type='text'
// 				label='Ingresar nombre o mesa'
// 				className='mb-4'
// 				classNames={{
// 					input: 'uppercase',
// 				}}
// 				value={valuesFood.name_ticket}
// 				onValueChange={(e) => setValuesFood({ ...valuesFood, name_ticket: e })}
// 			/>

// 			<div className='relative mb-4'>
// 				<div className='flex gap-2'>
// 					<Input
// 						type='text'
// 						label='Elegir Comida'
// 						className=''
// 						value={valuesFood.dish.dish_food}
// 						onFocus={() => setActive(true)}
// 						onValueChange={(e) => handleSetQuery(e)}
// 					/>

// 					<Button
// 						className='h-auto'
// 						variant='light'
// 						onPress={() => setActive(false)}>
// 						<IoCloseOutline size={30} />
// 					</Button>
// 				</div>

// 				{active && (
// 					<Table
// 						hideHeader
// 						aria-label='Tabla de platos'
// 						className='mt-4'
// 						classNames={{
// 							wrapper: 'max-h-[200px]',
// 						}}>
// 						<TableHeader>
// 							<TableColumn>NAME</TableColumn>
// 						</TableHeader>
// 						<TableBody>
// 							{resultDishes.map((dishItem) => (
// 								<TableRow
// 									key={dishItem.key}
// 									onClick={() => setValuesFood({ ...valuesFood, dish: dishItem })}>
// 									<TableCell>{dishItem.dish_food}</TableCell>
// 								</TableRow>
// 							))}
// 						</TableBody>
// 					</Table>
// 				)}
// 			</div>

// 			<div className='flex flex-col mb-4'>
// 				<div className='mb-4'>
// 					<div className='flex flex-col'>
// 						<p className='text-neutral-400 mb-4'>Con arroz:</p>

// 						<div>
// 							<Checkbox
// 								className='mr-4'
// 								isSelected={valuesFood.rice}
// 								onValueChange={() => setValuesFood({ ...valuesFood, rice: true })}>
// 								Si
// 							</Checkbox>

// 							<Checkbox
// 								isSelected={valuesFood.rice ? false : true}
// 								onValueChange={() => setValuesFood({ ...valuesFood, rice: false })}>
// 								No
// 							</Checkbox>
// 						</div>
// 					</div>
// 				</div>

// 				<div className='mb-4'>
// 					<div className='flex flex-col'>
// 						<p className='text-neutral-400 mb-4'>Con ensalada:</p>

// 						<div>
// 							<Checkbox
// 								className='mr-4'
// 								isSelected={valuesFood.salad}
// 								onValueChange={() => setValuesFood({ ...valuesFood, salad: true })}>
// 								Si
// 							</Checkbox>

// 							<Checkbox
// 								isSelected={valuesFood.salad ? false : true}
// 								onValueChange={() => setValuesFood({ ...valuesFood, salad: false })}>
// 								No
// 							</Checkbox>
// 						</div>
// 					</div>
// 				</div>
// 			</div>

// 			<Button
// 				className='bg-indigo-700 mb-4 w-full'
// 				onClick={() => handleAddDishToTicket()}>
// 				Agregar plato
// 			</Button>
// 		</div>
// 	);
// // };
