import { useEffect, useRef, useState } from 'react';
import { Input } from "@heroui/react";

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
		function handleClickOutside(event: any) {
			if (wrapperElement.current && !wrapperElement.current.contains(event.target)) {
				setActive(false);
			} else {
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
					<Input
						type='text'
						label={label}
						className=''
						classNames={{
							input: '',
						}}
						value={value}
						onFocus={() => setActive(true)}
						onChange={(e) => handleOnchange(e.target.value)}
					/>
				</div>

				{active && children}
			</div>
		</div>
	);
};
