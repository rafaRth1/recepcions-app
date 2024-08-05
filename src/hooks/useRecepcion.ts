import { useContext } from 'react';
import { RecepcionContext, RecepcionContextProps } from '@/context/recepcion-context/recepcion-context';

export const useRecepcion = () => {
	return useContext<RecepcionContextProps>(RecepcionContext);
};
