/**
 * Formatea una fecha a formato DD/MM/YYYY HH:MM
 * @param date - Fecha en formato ISO string o Date object
 * @returns Fecha formateada como string "DD/MM/YYYY HH:MM"
 */
export const formatDateTime = (date: string | Date | undefined): string => {
	if (!date) return '-';

	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		// Validar que la fecha sea válida
		if (isNaN(dateObj.getTime())) return '-';

		const day = dateObj.getDate().toString().padStart(2, '0');
		const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
		const year = dateObj.getFullYear();
		const hours = dateObj.getHours().toString().padStart(2, '0');
		const minutes = dateObj.getMinutes().toString().padStart(2, '0');

		return `${day}/${month}/${year} ${hours}:${minutes}`;
	} catch (error) {
		return '-';
	}
};
