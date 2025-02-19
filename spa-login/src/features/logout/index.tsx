import React from "react";
import { createRoot } from 'react-dom/client';
import { LoadingSpinner } from "../../components";
import { useLogout } from "./hooks/useLogout";

export type LogoutProps = {
    defaultLogoutMessage?: string
};

const IFrame = (props : React.HTMLProps<HTMLIFrameElement>) : React.ReactNode => (
    <div>
        <iframe {...props} />
    </div>
);

export const Logout = ({ defaultLogoutMessage = "You have successfully logged out. You can now close this window." } : Readonly<LogoutProps>) : React.ReactNode => {
    const { isPending, logout } = useLogout();
    const [logoutMessage, setLogoutMessage] = React.useState<string | null>(null);
    
    React.useEffect(() => {
        logout().then(
            r => {
                if (r.signOutIFrameUrl) {
                    // createRoot(document.getElementById('logout-message-container')!).render(
                    //     <IFrame width={0} height={0} className="signout" src={r.signOutIFrameUrl} />
                    // );
                    // window.location.replace(r.signOutIFrameUrl);
                    setLogoutMessage(defaultLogoutMessage);
                }
                if (r.postLogoutRedirectUri) {
                    window.location.replace(r.postLogoutRedirectUri);
                }
                else {
                    setLogoutMessage(defaultLogoutMessage);
                }
            },
            e => {
                console.warn('There was a potential logout problem.', e.message ?? 'Unknown error was returned.');
                setLogoutMessage(defaultLogoutMessage);
            }
        );
    }, []);

    return (
        <div id="logout-message-container" className="text-center">
            {(isPending || !logoutMessage) && (
                <>
                    <LoadingSpinner />
                    <p className="mt-3 text-sm text-gray-500">Please wait whilst we log you out of WealthPro...</p>
                </>
            )}
            {!isPending && logoutMessage && (
                <p className="text-gray-500 my-4 max-w-sm">{logoutMessage}</p>
            )}
        </div>
    );
};