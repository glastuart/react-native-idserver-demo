import { LoginRequestType } from "../types/LoginRequestType";
import { LoginResponseType } from "../types/LoginResponseType";

export const loginCommand = async (opts: LoginRequestType) : Promise<LoginResponseType> => {
    return new Promise<LoginResponseType>((resolve, reject) => {
        try {
            fetch('/api/authenticate', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include',
              body: JSON.stringify({
                username: opts.username,
                password: opts.password,
                returnUrl: opts.returnUrl
              })
            })
            .then((response) => response.json())
            .then((data) => {
              resolve(data as LoginResponseType);
            });
        }
        catch (e) {
            reject(e);
        } 
    });
};