import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDF } from '../pdf/pdf';
import { Button } from '@heroui/react';
import { Ticket } from '@/core/ticket/interfaces';

interface Props {
	ticket: Ticket;
}

const LinkPdf = ({ ticket }: Props) => {
	return (
		<PDFDownloadLink
			document={<PDF ticket={ticket} />}
			fileName='boleta.pdf'>
			{({ loading }) => {
				return loading ? (
					<Button
						className='bg-indigo-700 mr-3'
						disabled>
						Cargando....
					</Button>
				) : (
					<Button className='bg-indigo-700 mr-3'>Imprimir Ticket</Button>
				);
			}}
		</PDFDownloadLink>
	);
};

export default LinkPdf;
