/**
 * Formatea una fecha a solo hora HH:MM
 * @param date - Fecha en formato ISO string o Date object
 * @returns Hora formateada como string "HH:MM"
 */
export const formatTime = (date: string | Date | undefined): string => {
	if (!date) return '-';

	try {
		const dateObj = typeof date === 'string' ? new Date(date) : date;

		if (isNaN(dateObj.getTime())) return '-';

		const hours = dateObj.getHours().toString().padStart(2, '0');
		const minutes = dateObj.getMinutes().toString().padStart(2, '0');

		return `${hours}:${minutes}`;
	} catch (error) {
		return '-';
	}
};
