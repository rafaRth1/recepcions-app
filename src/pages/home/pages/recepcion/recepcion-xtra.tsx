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
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDF } from '@/components/pdf/pdf';

export const RecepcionXtra = () => {
	const { dish, setDish, handleAddTicket, handleFinishTicket, setTicket, ticket } = useRecepcion();
	const [resultDrinks, setResultDrinks] = useState<DrinkProps[]>(drinks);
	const [active, setActive] = useState(false);
	const [drink, setDrink] = useState<DrinkProps>({
		key: '',
		name: '',
		price: 0,
	});

	const handleOnChange = (e: string) => {
		setDrink({ ...drink, name: e });
		handleSearch(e);
	};

	const handleSearch = (e: string) => {
		const results = drinks.filter((drink) => drink && drink.key && drink.key.includes(e));
		setResultDrinks(results);
	};

	const handleAddDrink = () => {
		setTicket({
			...ticket,
			drinks: [...ticket.drinks!, { id: crypto.randomUUID(), ...drink }],
			totalPrice: ticket.totalPrice + drink.price,
		});

		setDrink({
			key: '',
			name: '',
			price: 0,
		});
	};

	return (
		<div>
			<div className='flex gap-2 mb-3'>
				<Input
					type='text'
					label='Nombre bebida'
					onFocus={() => setActive(true)}
					value={drink.name}
					onChange={(e) => handleOnChange(e.target.value.toLowerCase())}
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
								onClick={() => setDrink(drink)}>
								<TableCell>{drink.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}

			<Button
				className='bg-indigo-700 mb-3 w-full'
				onClick={() => handleAddDrink()}>
				Agregar bebida
			</Button>

			<Textarea
				label='Excepción del pedido'
				className='mb-3'
				value={ticket.exception}
				onValueChange={(e) => setTicket({ ...ticket, exception: e })}
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

			<PDFDownloadLink
				document={<PDF />}
				fileName='test.pdf'>
				{({ loading }) =>
					loading ? (
						<Button
							className='w-full'
							color='danger'
							onClick={() => handleFinishTicket()}>
							Cargando....
						</Button>
					) : (
						<Button
							className='w-full'
							color='danger'
							onClick={() => handleFinishTicket()}>
							Mandar a cocina tickets
						</Button>
					)
				}
			</PDFDownloadLink>
		</div>
	);
};
