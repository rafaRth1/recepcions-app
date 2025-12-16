import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';

interface Props {
	children: React.ReactNode;
}

export function Providers({ children }: Props) {
	return (
		<HeroUIProvider>
			<ToastProvider placement='top-center' />
			{children}
		</HeroUIProvider>
	);
}
