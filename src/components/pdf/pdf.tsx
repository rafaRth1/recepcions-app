import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import CourierPrimeRegular from '@/assets/CourierPrime/CourierPrime-Regular.ttf';
import CourierPrimeBold from '@/assets/CourierPrime/CourierPrime-Bold.ttf';
import CourierPrimeItalic from '@/assets/CourierPrime/CourierPrime-Italic.ttf';
import CourierPrimeItalicBold from '@/assets/CourierPrime/CourierPrime-BoldItalic.ttf';
import { DishProps, TicketProps } from '@/types';

Font.register({
	family: 'CourierPrime',
	fontWeight: 'normal',
	fontStyle: 'normal',
	fonts: [
		{
			src: CourierPrimeRegular,
		},
		{
			src: CourierPrimeBold,
			fontWeight: 800,
		},
		{
			src: CourierPrimeItalic,
			fontStyle: 'italic',
		},
		{
			src: CourierPrimeItalicBold,
			fontStyle: 'italic',
			fontWeight: 800,
		},
	],
});

interface Props {
	ticket: TicketProps;
}

interface ColumnProps {
	key: keyof DishProps;
	label: string;
}

const columns: ColumnProps[] = [
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
	{
		key: 'price',
		label: 'PRICE',
	},
];

const columnsCream = [
	{
		key: 'creams',
		label: 'CREMAS',
	},
];

const style = StyleSheet.create({
	body: {
		maxWidth: '270px',
		padding: 5,
		fontFamily: 'CourierPrime',
		fontSize: 9,
	},

	rowViewDish: {
		display: 'flex',
		flexDirection: 'row',
		textAlign: 'center',
		paddingTop: 4,
		paddingBottom: 4,
	},

	colViewDish: {
		display: 'flex',
		flexDirection: 'row',
		borderTop: '1px dashed black',
		paddingTop: 8,
		paddingBottom: 8,
		textAlign: 'center',
	},

	rowViewCream: {
		display: 'flex',
		flexDirection: 'row',
		paddingBottom: 8,
		textAlign: 'center',
	},

	colViewCream: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		borderTop: '1px dashed black',
		paddingTop: 8,
		paddingBottom: 4,
		textAlign: 'center',
	},

	colViewDrink: {
		display: 'flex',
		flexDirection: 'row',
		borderTop: '1px dashed black',
		paddingTop: 8,
		paddingBottom: 8,
		textAlign: 'center',
	},

	rowViewDrink: {
		display: 'flex',
		flexDirection: 'row',
		textAlign: 'center',
		paddingTop: 4,
		paddingBottom: 4,
	},
});

export const PDF = (props: Props) => {
	const { ticket } = props;

	return (
		<Document>
			<Page
				style={{ ...style.body, height: '100px' }}
				key={1}>
				<View>
					<View
						style={{ marginBottom: '5px' }}
						break>
						<Text
							style={{
								height: '4px',
								width: '100%',
								borderTop: '1px',
								borderStyle: 'dashed',
							}}></Text>

						<Text style={{ textAlign: 'center', fontWeight: 'black', fontSize: '13px', margin: '3px 0 3px 0' }}>
							Cocina
						</Text>

						<Text
							style={{
								height: '4px',
								width: '100%',
								borderTop: '1px',
								borderStyle: 'dashed',
							}}></Text>
						<Text>Nombre: {`${ticket.name_ticket}`}</Text>
						<Text>Mozo: Rafael</Text>
						<Text>Fecha: {`${ticket.time}`}</Text>
					</View>

					<View style={style.colViewCream}>
						{columns.map((column) => (
							<Text
								key={column.key}
								style={{
									textTransform: 'capitalize',
									fontSize: '9px',
									width: `${100 / columns.length}%`,
								}}>
								{column.label}
							</Text>
						))}
					</View>

					{ticket.dishes.map((dish) => (
						<View
							style={style.rowViewDish}
							key={dish._id ? dish._id : dish.key}>
							<Text style={{ width: `${100 / columns.length}%` }}>{dish.dish_food}</Text>
							<Text style={{ width: `${100 / columns.length}%` }}>{dish.rice ? 'Si' : 'No'}</Text>
							<Text style={{ width: `${100 / columns.length}%` }}>{dish.salad ? 'Si' : 'No'}</Text>
							<Text style={{ width: `${100 / columns.length}%` }}>S/{dish.price.toFixed(2)}</Text>
						</View>
					))}
					<Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>Excepción: {ticket.exception}</Text>
				</View>
			</Page>

			<Page
				style={style.body}
				key={2}>
				<View style={{ marginBottom: '5px' }}>
					<Text
						style={{
							height: '4px',
							width: '100%',
							borderTop: '1px',
							borderStyle: 'dashed',
						}}></Text>

					<Text style={{ textAlign: 'center', fontWeight: 'black', fontSize: '13px', margin: '3px 0 3px 0' }}>Pedido</Text>

					<Text>Nombre: {`${ticket.name_ticket}`}</Text>
					<Text>Fecha: {`${ticket.time}`}</Text>
				</View>

				<View style={style.colViewCream}>
					{columns.map((column) => (
						<Text
							key={column.key}
							style={{
								textTransform: 'capitalize',
								fontSize: '9px',
								width: `${100 / columns.length}%`,
							}}>
							{column.label}
						</Text>
					))}
				</View>

				{ticket.dishes.map((dish) => (
					<View
						style={style.rowViewDish}
						key={dish._id ? dish._id : dish.key}>
						<Text style={{ width: `${100 / columns.length}%` }}>{dish.dish_food}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>{dish.rice ? 'Si' : 'No'}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>{dish.salad ? 'Si' : 'No'}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>S/{dish.price.toFixed(2)}</Text>
					</View>
				))}

				{ticket.drinks!.map((drink) => (
					<View
						key={drink._id ? drink._id : drink.key}
						style={{ ...style.rowViewDrink, marginBottom: '5px' }}>
						<Text style={{ width: `${100 / columns.length}%` }}>{drink.name}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>{}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>{}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>{}</Text>
						<Text style={{ width: `${100 / columns.length}%` }}>S/{drink.price.toFixed(2)}</Text>
					</View>
				))}

				<Text style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '5px' }}>Excepción: {ticket.exception}</Text>

				<View style={style.colViewCream}>
					{columnsCream.map((column) => (
						<Text
							key={column.key}
							style={{
								textTransform: 'capitalize',
								fontSize: '9px',
								width: `${100 / columnsCream.length}%`,
							}}>
							{column.label}
						</Text>
					))}
				</View>

				{ticket.creams.map((cream) => (
					<View
						key={cream._id ? cream._id : cream.key}
						style={style.rowViewCream}>
						<Text>{Array.from(cream.creams).join(', ')}</Text>
					</View>
				))}

				<Text style={{ textAlign: 'right', fontWeight: 'bold' }}>Total S/{`${ticket.total_price}`}</Text>
			</Page>
		</Document>
	);
};
