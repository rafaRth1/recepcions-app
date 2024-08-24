import { useContext } from 'react';
import { AuthContext, AuthContextProps } from '@/context/auth-context/auth-context';

export const useAuthProvider = () => {
	return useContext<AuthContextProps>(AuthContext);
};
