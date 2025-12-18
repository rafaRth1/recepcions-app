export const formatMomentaryTime = (date: Date = new Date()): string => {
	const month = date.getMonth() + 1; // 0-indexed
	const day = date.getDate();
	const year = date.getFullYear().toString().slice(-2); // últimos 2 dígitos

	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';

	hours = hours % 12;
	hours = hours ? hours : 12; // Si es 0, mostrar 12

	return `${month}/${day}/${year} ${hours}:${minutes} ${ampm}`;
};
