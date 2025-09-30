import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { HeroUIProvider } from "@heroui/react";
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/auth-context/auth-provider.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<HeroUIProvider>
			<BrowserRouter>
				<AuthProvider>
					<App />
				</AuthProvider>
			</BrowserRouter>
		</HeroUIProvider>
	</React.StrictMode>
);
