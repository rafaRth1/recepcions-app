import { useEffect, useState } from 'react';
import { AuthContext, AuthInterface } from './auth-context';
import axios from 'axios';
import { clientAxios } from '@/lib/http-client';
// import { useNavigate } from 'react-router-dom';

interface Props {
	children: JSX.Element;
}

const initialValuesAuth = {
	_id: '',
	nick_name: '',
	email: '',
};

export const AuthProvider = ({ children }: Props) => {
	const [auth, setAuth] = useState<AuthInterface>(initialValuesAuth);
	const [loading, setLoading] = useState(true);
	// const navigate = useNavigate();

	useEffect(() => {
		const cancel = axios.CancelToken.source();

		const authtenticateUser = async () => {
			const token = localStorage.getItem('token');

			if (!token) {
				setLoading(false);
				return;
			}

			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			};

			try {
				const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/perfil`, config);

				setAuth(data);
				clientAxios.setToken(token);
				// navigate('/');
			} catch (error) {
				setAuth(initialValuesAuth);
			} finally {
				setLoading(false);
			}
		};

		authtenticateUser();

		return () => {
			// console.log('Limpiando');
			cancel.cancel();
		};
	}, []);

	return <AuthContext.Provider value={{ auth, setAuth, loading }}>{children}</AuthContext.Provider>;
};
