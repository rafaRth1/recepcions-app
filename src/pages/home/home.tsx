const Home = () => {
	return (
		<main className='p-4'>
			<div className='flex items-center justify-between'>
				<h1 className='text-neutral-100 text-xl font-semibold'>Sección de recepciones</h1>
				<button className='text-neutral-100 p-2 bg-indigo-500 rounded-xl'>Mirar ticket</button>
			</div>

			<div>
				<div>
					<label
						htmlFor=''
						className='text-neutral-100'>
						Ingresar nombre o mesa:
					</label>
					<input
						type='text'
						className='w-full mt-3 p-2 bg-transparent border-2 rounded-xl border-indigo-500 text-neutral-100 capitalize'
					/>
				</div>
			</div>

			<div className='flex gap-2 mt-4'>
				<div className='basis-2/3'>
					<label
						htmlFor=''
						className=' text-neutral-100'>
						Elegir plato:
					</label>
					<input
						type='text'
						className='w-full mt-3 p-2 bg-transparent border-2 rounded-xl border-indigo-500 text-neutral-100 capitalize'
					/>
				</div>

				<div className='basis-1/3'>
					<label
						htmlFor=''
						className='text-neutral-100'>
						Cantidad:
					</label>
					<input
						type='number'
						className='w-full mt-3 p-2 bg-transparent border-2 rounded-xl border-indigo-500 text-neutral-100 capitalize'
					/>
				</div>
			</div>

			<div className='flex justify-between'>
				<div className='mt-4'>
					<p className='text-neutral-100'>Con ensalada:</p>

					<div className='flex items-center'>
						<div className='mr-3'>
							<label
								htmlFor=''
								className='text-neutral-100'>
								Si
							</label>
							<input
								type='checkbox'
								className='ml-2'
							/>
						</div>

						<div>
							<label
								htmlFor=''
								className='text-neutral-100'>
								No
							</label>
							<input
								type='checkbox'
								className='ml-2'
							/>
						</div>
					</div>
				</div>

				<div className='mt-4'>
					<p className='text-neutral-100'>Con arroz:</p>

					<div className='flex items-center'>
						<div className='mr-3'>
							<label
								htmlFor=''
								className='text-neutral-100'>
								Si
							</label>
							<input
								type='checkbox'
								className='ml-2'
							/>
						</div>

						<div>
							<label
								htmlFor=''
								className='text-neutral-100'>
								No
							</label>
							<input
								type='checkbox'
								className='ml-2'
							/>
						</div>
					</div>
				</div>
			</div>

			<div className='mt-4'>
				<p className='text-neutral-100'>Para: </p>

				<div className='flex justify-between items-center gap-2'>
					<div className='flex'>
						<label
							htmlFor=''
							className='text-neutral-100'>
							Mesa
						</label>
						<input
							type='checkbox'
							className='ml-2'
						/>
					</div>

					<div className='flex'>
						<label
							htmlFor=''
							className='text-neutral-100'>
							Delivery
						</label>
						<input
							type='checkbox'
							className='ml-2'
						/>
					</div>

					<div className='flex'>
						<label
							htmlFor=''
							className='text-neutral-100'>
							Recojo
						</label>
						<input
							type='checkbox'
							className='ml-2'
						/>
					</div>

					<div className='flex'>
						<label
							htmlFor=''
							className='text-neutral-100'>
							Esperar
						</label>
						<input
							type='checkbox'
							className='ml-2'
						/>
					</div>
				</div>
			</div>

			<div className='mt-4'>
				<label
					htmlFor=''
					className=' text-neutral-100'>
					Cremas:
				</label>
				<input
					type='text'
					className='w-full mt-3 p-2 bg-transparent border-2 rounded-xl border-indigo-500 text-neutral-100 capitalize'
				/>
			</div>
		</main>
	);
};

export default Home;
