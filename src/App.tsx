import { AppRouter } from './router/app-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';

function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<AppRouter />
		</QueryClientProvider>
	);
}

export default App;
