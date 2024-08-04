import { useState } from 'react';
import {
	Button,
	Checkbox,
	CheckboxGroup,
	Input,
	Modal,
	Select,
	SelectItem,
	Textarea,
	useDisclosure,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Table,
	TableHeader,
	TableColumn,
	TableBody,
	TableRow,
	TableCell,
} from '@nextui-org/react';
import { creams } from '@/data/creams';
import { foods } from '@/data/food';
import { Cream } from '@/types/Cream';
import { Food } from '@/types/Food';

interface Ticket {
	name_ticket: string;
	dishes: Dish[];
}

interface Dish {
	key: string;
	dish_food: string;
	rice: boolean;
	salad: boolean;
	creams: Cream[];
}

const columns = [
	{
		key: 'dish_food',
		label: 'NOMBRE',
	},
	{
		key: 'rice',
		label: 'ARROZ',
	},
	{
		key: 'salad',
		label: 'ENSALADA',
	},
];

export const Recepcion = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const [search, setSearch] = useState('');
	const [activeResultSearch, setActiveResultSearch] = useState(false);
	const [resultDishes, setResulDishes] = useState<Food[]>(foods);
	const [dish, setDish] = useState<Dish>({
		key: '',
		dish_food: '',
		rice: false,
		salad: true,
		creams: [],
	});
	const [ticket, setTicket] = useState<Ticket>({
		name_ticket: '',
		dishes: [],
	});

	const handleOrder = () => {
		setTicket({ ...ticket, dishes: [...ticket.dishes, { ...dish, key: crypto.randomUUID() }] });
	};

	const handleSetQuery = (e: string) => {
		setSearch(e);

		handleSearch(e);
	};

	const handleSearch = (e: string) => {
		const results = foods.filter((food) => food && food.key && food.key.includes(e));
		setResulDishes(results);
	};

	return (
		<>
			<main className='p-4'>
				<div className='flex items-center justify-between mb-5'>
					<h1 className='text-neutral-100 text-xl font-semibold'>Sección de recepciones</h1>
					<Button
						className='bg-indigo-700'
						onClick={onOpen}>
						Mirar Ticket
					</Button>
				</div>

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
					<Input
						type='text'
						label='Elegir Comida'
						className='mb-5'
						classNames={{
							input: '',
						}}
						value={search}
						onFocus={() => setActiveResultSearch(true)}
						// onBlur={() => setActiveResultSearch(false)}
						onChange={(e) => handleSetQuery(e.target.value)}
					/>

					{activeResultSearch && (
						<Table
							hideHeader
							aria-label='Example static collection table'
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
											setSearch(dishItem.name), setDish({ ...dish, dish_food: dishItem.name });
										}}>
										<TableCell>{dishItem.name}</TableCell>
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

				<Select
					items={creams}
					label='Elegir cremas'
					className='mb-5'
					selectedKeys=''
					// onSelectionChange={(e) => console.log(e)}
					onChange={(e) => console.log(e.target.value)}>
					{(creams) => <SelectItem key={creams.key}>{creams.name}</SelectItem>}
				</Select>

				<Button
					className='bg-indigo-700 mb-5 w-full'
					onClick={() => handleOrder()}>
					{/* <IoAdd size={30} /> */}
					Agregar plato
				</Button>

				<Input
					type='text'
					label='Nombre bebida'
					className='mb-5'
				/>

				<Textarea
					label='Excepción del pedido'
					className='mb-5'
				/>

				<CheckboxGroup
					label='Tipo de pedido'
					orientation='horizontal'
					className='mb-5'
					//   value={selected}
					//   onValueChange={setSelected}
				>
					<Checkbox value='mesa'>Mesa</Checkbox>
					<Checkbox value='delivery'>Delivery</Checkbox>
					<Checkbox value='recojo'>Recojo</Checkbox>
				</CheckboxGroup>

				<Table aria-label='Example table with dynamic content'>
					<TableHeader columns={columns}>
						{(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
					</TableHeader>
					<TableBody items={ticket.dishes}>
						{(item) => (
							<TableRow key={item.key}>
								{/* {(columnKey) => <TableCell className='capitalize'>{getKeyValue(item, columnKey)}</TableCell>} */}
								<TableCell className='capitalize'>{item.dish_food}</TableCell>
								<TableCell className='capitalize'>{item.rice ? 'Si' : 'No'}</TableCell>
								<TableCell className='capitalize'>{item.salad ? 'Si' : 'No'}</TableCell>
								{/* <TableCell className='capitalize'>{getKeyValue(item, columnKey)}</TableCell> */}
							</TableRow>
						)}
					</TableBody>
				</Table>
			</main>

			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className='flex flex-col gap-1'></ModalHeader>
							<ModalBody>
								<p>Nada por aqui :)</p>
							</ModalBody>
							<ModalFooter>
								<Button
									color='danger'
									variant='light'
									onPress={onClose}>
									Close
								</Button>
								<Button
									color='primary'
									onPress={onClose}>
									Action
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};
