import { useEffect, useRef, useState } from 'react';
import { TextField, Label, Input, FieldError } from '@heroui/react';

interface Props {
	children: JSX.Element;
	value: string;
	label?: string;
	handleOnchange: (e: string) => void;
}

export const InputSearch = (props: Props) => {
	const { children, handleOnchange, value, label } = props;
	const wrapperElement = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(false);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (wrapperElement.current && !wrapperElement.current.contains(event.target as Node)) {
				setActive(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperElement]);

	return (
		<div className='relative mb-4'>
			<div ref={wrapperElement}>
				<div className='flex gap-2'>
					<TextField name='search'>
						{label && <Label>{label}</Label>}
						<Input
							type='text'
							value={value}
							onFocus={() => setActive(true)}
							onChange={(e) => handleOnchange(e.target.value)}
						/>
						<FieldError />
					</TextField>
				</div>

				{active && (
					<div className='absolute top-full left-0 right-0 z-50'>
						<div onClick={() => setActive(false)}>{children}</div>
					</div>
				)}
			</div>
		</div>
	);
};
