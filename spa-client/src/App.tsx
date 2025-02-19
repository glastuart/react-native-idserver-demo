import { useAuth } from "react-oidc-context";

const AuthUserDetails = () : React.ReactNode => {
	const { user, removeUser, signoutRedirect } = useAuth();
	
	const logout = () => {
		removeUser().then(() => {
			// YOU NEED ID_TOKEN_HINT!
			// THIS KEPT ME FOR HOURS!
			// https://stackoverflow.com/questions/44684664/identityserver4-postlogoutredirecturi-null
			signoutRedirect({ 
				post_logout_redirect_uri: 'http://localhost:5174/',
				id_token_hint: user?.id_token 
			});
		});
	};

	if (!user) {
		return (
			<div>
				You seem to be authenticated by the user details cannot be found?
			</div>
		);
	}

	return (
		<div>
			<p className="mb-3">Hello, {user.profile.name ?? 'Unknown Claim.'}</p>
			<button type="button" className="btn btn-primary btn-outline w-full" onClick={logout}>Logout</button>
		</div>
	);
};


const App = () => {
	const { isAuthenticated, isLoading, signinRedirect } = useAuth();

	if (isLoading) {
		return (
			<div>LOADING...</div>
		)
	}

	return (
		<div className="border-2 border-primary rounded-lg max-w-sm m-3 p-3">
			<div className="border-b mb-3">
				<h1>Login via Identity Server 4</h1>
			</div>
			{isAuthenticated && (
				<AuthUserDetails />
			)}
			{!isAuthenticated && (
				<button type="button" className="btn btn-primary btn-outline w-full" onClick={() => signinRedirect()}>Login</button>
			)}
		</div>
	);
};

export default App;