import { useSearchParams } from "react-router";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { logoutCommand } from "../api/logoutCommand";
import { LogoutRequestType } from "../types/LogoutRequestType";
import { LogoutResponseType } from "../types/LogoutResponseType";

export type UseLogoutOptions = UseMutationResult<LogoutResponseType, Error, LogoutRequestType, unknown> & {
    logout: () => Promise<LogoutResponseType>
};

export const useLogout = () : UseLogoutOptions => {
    const [searchParams] = useSearchParams();
    const mutation = useMutation({
        mutationFn: (opts: LogoutRequestType) => logoutCommand(opts),
    });

    const logout = () : Promise<LogoutResponseType> => new Promise((resolve, reject) => {
        const logoutId = searchParams.get('logoutId');
        if (!logoutId) {
            reject('Invalid logout id');
            return;
        }

        mutation.mutateAsync({ logoutId }).then(
            r => resolve(r),
            e => reject(e)
        );
    });

    return { ...mutation, logout };
};