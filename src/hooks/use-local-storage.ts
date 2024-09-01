import { useState, useEffect } from 'react';

export const useLocalStorage = <T>(
	key: string,
	defaultValue: T
): [value: T, setValue: React.Dispatch<React.SetStateAction<T>>] => {
	const [value, setValue] = useState(() => {
		const storedValue = localStorage.getItem(key);

		if (storedValue) {
			return JSON.parse(storedValue);
		}

		return defaultValue;
	});

	useEffect(() => {
		if (value === undefined) return;
		localStorage.setItem(key, JSON.stringify(value));
	}, [value, key]);

	return [value, setValue];
};
