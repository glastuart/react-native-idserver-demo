import { LogoutRequestType } from "../types/LogoutRequestType";
import { LogoutResponseType } from "../types/LogoutResponseType";

export const logoutCommand = async (opts: LogoutRequestType) : Promise<LogoutResponseType> => {
    return new Promise<LogoutResponseType>((resolve, reject) => {
        try {
            fetch(`/api/authenticate/logout?logoutId=${opts.logoutId}`, {
                credentials: 'include'
            })
            .then((response) => response.json())
            .then((data) => resolve(data as LogoutResponseType));
        }
        catch (e) {
            reject(e);
        }
    });
};