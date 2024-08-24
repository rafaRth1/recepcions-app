import { createContext } from 'react';

export interface AuthInterface {
	_id: string;
	nick_name: string;
	email: string;
}

export interface AuthContextProps {
	auth: AuthInterface;
	setAuth: React.Dispatch<React.SetStateAction<AuthInterface>>;
	loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);
