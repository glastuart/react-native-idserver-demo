import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from 'react-oidc-context';
import './index.css'
import App from './App.tsx';

const oidcSettings = {
	authority: 'https://localhost:7039',
	client_id: 'cwm.client',
	scope: 'profile openid myApi.read',
	loadUserInfo: true,
	redirect_uri: 'http://localhost:5174/',
	post_logout_redirect_uri: 'http://localhost:5174/'
};

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<AuthProvider 
			onSigninCallback={() => {
				window.history.replaceState({}, document.title, window.location.pathname);
			}}
			{...oidcSettings}
		>
			<App />
		</AuthProvider>
	</StrictMode>,
)
