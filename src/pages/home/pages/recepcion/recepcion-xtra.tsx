import { memo, useState } from 'react';
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
import { DrinkProps } from '@/types';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDF } from '@/components/pdf/pdf';
import { InputSearch } from '@/components/input-search/input-search';

export const RecepcionXtra = memo(() => {
	const { handleSubmitTicket, handleFinishTicket, setTicket, ticket, tickets } = useRecepcion();
	const [resultDrinks, setResultDrinks] = useState<DrinkProps[]>(drinks);
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

	const handleOnChangeType = (e: string) => {
		if (e === 'table' || e === 'pickup' || e === 'delivery') {
			setTicket({ ...ticket, type: e });
		}
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
			<InputSearch
				value={drink.name}
				handleOnchange={handleOnChange}>
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
						{resultDrinks.map((drink) => (
							<TableRow
								key={drink.key}
								onClick={() => setDrink(drink)}>
								<TableCell>{drink.name}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</InputSearch>

			<Button
				className='bg-indigo-700 mb-4 w-full'
				onClick={() => handleAddDrink()}>
				Agregar bebida
			</Button>

			<Textarea
				label='Excepción del pedido'
				className='mb-4'
				value={ticket.exception}
				onValueChange={(e) => setTicket({ ...ticket, exception: e })}
			/>

			<RadioGroup
				className='mb-4'
				label='Tipo de pedido'
				orientation='horizontal'
				value={ticket.type}
				onValueChange={(e) => handleOnChangeType(e)}>
				<Radio value='table'>Mesa</Radio>
				<Radio value='delivery'>Delivery</Radio>
				<Radio value='pickup'>Recojo</Radio>
			</RadioGroup>

			<Input
				type='text'
				label='Tipo de pago'
				className='mb-4'
				value={ticket.typePayment}
				onValueChange={(e) => setTicket({ ...ticket, typePayment: e })}
			/>

			<Button
				className='mb-4 w-full'
				color='success'
				onClick={() => handleSubmitTicket()}>
				{ticket.key ? 'Editar ticket' : 'Agregar ticket'}
			</Button>

			<PDFDownloadLink
				document={<PDF ticket={tickets[1]} />}
				fileName='boleta.pdf'>
				{({ loading }) =>
					loading ? (
						<Button
							className='w-full'
							color='danger'
							disabled>
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
});
