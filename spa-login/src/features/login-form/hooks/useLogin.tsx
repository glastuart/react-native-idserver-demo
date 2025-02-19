import { useSearchParams } from "react-router";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { loginCommand } from "../api/loginCommand";
import { LoginRequestType } from "../types/LoginRequestType";
import { LoginResponseType } from "../types/LoginResponseType";

export type UseLoginOptions = UseMutationResult<LoginResponseType, Error, LoginRequestType, unknown> & {
    login: (username: string, password: string) => Promise<LoginResponseType>
};

export const useLogin = () : UseLoginOptions => {
    const [searchParams] = useSearchParams();
    const mutation = useMutation({
        mutationFn: (opts: LoginRequestType) => loginCommand(opts),
    });

    const handleOnLogin = (username: string, password: string) : Promise<LoginResponseType> => new Promise((resolve, reject) => {
        const returnUrl = searchParams.get('ReturnUrl');
        if (!returnUrl) {
            reject('Invalid ReturnUrl');
            return;
        }

        mutation.mutateAsync({ username, password, returnUrl }).then(
            r => {
                if (r.isOk) {
                    window.location.replace(r.redirectUrl);
                    resolve(r);
                    return;
                }
                reject('Failed to authenticate.');
            },
            e => reject(e)
        );
    });
    
    return {
        ...mutation,
        login: handleOnLogin
    };
};