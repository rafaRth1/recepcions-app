export const useDate = () => {
	const time = new Date();
	const date = time.toLocaleString('es-ES', { dateStyle: 'short', hour12: true });
	const hours = time.toLocaleString('en-US', { timeStyle: 'short', hour12: true });

	return {
		date,
		hours,
	};
};
