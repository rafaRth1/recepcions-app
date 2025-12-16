/**
 * Formatea una fecha a solo fecha DD/MM/YYYY
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha formateada como string "DD/MM/YYYY"
 */
export const formatDate = (date: string | Date | undefined): string => {
	if (!date) return '-';

	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		if (isNaN(dateObj.getTime())) return '-';

		const day = dateObj.getDate().toString().padStart(2, '0');
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
		const year = dateObj.getFullYear();

		return `${day}/${month}/${year}`;
	} catch (error) {
		return '-';
	}
};
