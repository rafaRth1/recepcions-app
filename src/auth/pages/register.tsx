'use client';

import { useState } from 'react';
import { Input } from '@nextui-org/react';
import { Link, useNavigate } from 'react-router-dom';
import clientAxios from '@/utils/client-axios';

export const Register = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState({ type: false, msg: '' });
	const [dataForm, setDataForm] = useState({
		nick_name: '',
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if ([dataForm.nick_name, dataForm.email, dataForm.password].includes('')) {
			return setError({ type: true, msg: 'Rellenar campos faltantes' });
		}

		try {
			setLoading(true);
			const { data } = await clientAxios.post('/user', dataForm);
			console.log(data);
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
					<h1 className='text-3xl text-neutral-200 font-semibold mb-5'>Registro de usuario</h1>

					<Input
						type='text'
						label='Escriba su sobre nombre'
						className='my-4'
						value={dataForm.nick_name}
						onChange={(e) => setDataForm({ ...dataForm, nick_name: e.target.value })}
					/>

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
						¿Ya tienes cuenta?,{' '}
						<Link
							to='/auth/login'
							className='text-violet-500 hover:underline cursor-pointer'>
							Iniciar sesión
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
							Crear Cuenta
						</button>
					)}
				</form>
			</div>
		</section>
	);
};
