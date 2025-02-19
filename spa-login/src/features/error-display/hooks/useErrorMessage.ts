import { useSearchParams } from "react-router";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getErrorQuery } from "../api/getErrorQuery";
import { GetErrorResponseType } from "../types/GetErrorResponseType";

export type UseErrorMessageOptions = UseQueryResult<GetErrorResponseType, Error> & { };

export const useErrorMessage = () : UseErrorMessageOptions => {
    const [searchParams] = useSearchParams();
    const methods = useQuery({
        queryKey: ['error'],
        queryFn: async () => {
            const errorId = searchParams.get('errorId');
            return getErrorQuery({ errorId: errorId! });
        },
    });

    return { ...methods };
};