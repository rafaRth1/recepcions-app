import { useState } from 'react';
import clientAxios from '@/utils/client-axios';
import { Input } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthProvider } from '@/hooks';

export const Login = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ type: false, msg: '' });
	const { setAuth } = useAuthProvider();
	const [dataForm, setDataForm] = useState({
		email: 'rafarth1@outlook.com',
		password: '123456',
	});
	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			setLoading(true);

			const { data } = await clientAxios.post('/user/login', dataForm);

			localStorage.setItem('token', data.token);

			setAuth(data);
			navigate('/');
		} catch (error: any) {
			setError({
				type: true,
				msg: error.response.data.msg,
			});
		} finally {
			setLoading(false);
		}
	};

	const { msg } = error;

	return (
		<section className='w-full flex flex-col items-center md:flex-row h-[100dvh]'>
			<div className='flex justify-center flex-1 p-10'>
				<form
					className='flex flex-col justify-center md:justify-normal'
					onSubmit={(e) => handleSubmit(e)}>
					<h1 className='text-3xl text-neutral-200 font-semibold mb-5'>Iniciar sesión</h1>

					<Input
						type='email'
						label='Escriba su email'
						className='my-4'
						value={dataForm.email}
						onChange={(e) => setDataForm({ ...dataForm, email: e.target.value })}
					/>

					<Input
						type='password'
						label='Escriba su contraseña'
						className='my-4'
						value={dataForm.password}
						onChange={(e) => setDataForm({ ...dataForm, password: e.target.value })}
					/>

					<p className='text-neutral-100 text-sm mb-5'>
						¿Te olvidaste tus credenciales?,{' '}
						<span className='text-violet-500 hover:underline cursor-pointer'>Recuperar cuenta</span>
					</p>

					<p className='text-neutral-100 text-sm mb-5'>
						¿Aun no tienes una cuenta?,{' '}
						<Link
							to='/auth/register'
							className='text-violet-500 hover:underline cursor-pointer'>
							Crear cuenta
						</Link>
					</p>

					{error.type && <span className='text-rose-600 p-3 mb-5 border-rose-600 border-2 rounded-lg'>{msg}</span>}

					{loading ? (
						// <Spinner className="mt-5" />
						<div>Cargando...</div>
					) : (
						<button
							type='submit'
							className='bg-violet-600 text-neutral-200 py-2 px-3 rounded-md active:scale-95'>
							Iniciar sesión
						</button>
					)}
				</form>
			</div>
		</section>
	);
};
