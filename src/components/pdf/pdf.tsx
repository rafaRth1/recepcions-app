import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

Font.register({ family: 'Times-Roman', src: '' });

const style = StyleSheet.create({
	body: {
		maxWidth: '300px',
		padding: 5,
		fontFamily: '',
		fontSize: 11,
	},

	rowView: {
		display: 'flex',
		flexDirection: 'row',
		borderTop: '1px solid #EEE',
		paddingTop: 8,
		paddingBottom: 8,
		textAlign: 'center',
	},
});

export const PDF = () => {
	const tableData = {
		column: ['plato', 'ensalada', 'arroz', 'price'],
		data: [
			{
				id: '1',
				plato: 'Hamburguesa clasica',
				ensalada: 'Si',
				arroz: 'No',
				price: '10',
			},
			{
				id: '2',
				plato: '12 BBQ',
				ensalada: 'No',
				arroz: 'No',
				price: '26',
			},
		],
	};

	return (
		<Document>
			<Page style={style.body}>
				<View style={{}}>
					<Text style={{ textAlign: 'center' }}>Cocina</Text>
					<Text>Nombre: Mesa1</Text>
					<Text>Mozo: Rafael</Text>
					<Text>Fecha: 08/07/2024 12:30</Text>
				</View>

				<View style={style.rowView}>
					{tableData['column'].map((c) => (
						<Text
							key={c}
							style={{
								width: `${100 / tableData['column'].length}%`,
							}}>
							{c}
						</Text>
					))}
				</View>
				{tableData['data'].map((rowData: any, index) => (
					<View
						style={style.rowView}
						key={index}>
						{tableData['column'].map((c) => (
							<Text
								key={c}
								style={{ width: `${100 / tableData['column'].length}%` }}>
								{rowData[c]}
							</Text>
						))}
					</View>
				))}
			</Page>
		</Document>
	);
};
