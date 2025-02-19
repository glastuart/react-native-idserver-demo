import { GetErrorRequestType } from "../types/GetErrorRequestType";
import { GetErrorResponseType } from "../types/GetErrorResponseType";

export const getErrorQuery = async (opts: GetErrorRequestType) : Promise<GetErrorResponseType> => {
    return new Promise<GetErrorResponseType>((resolve, reject) => {
        try {
            fetch(`/api/authenticate/error?errorId=${opts.errorId}`, {
                credentials: 'include'
            })
            .then((response) => response.json())
            .then((data) => resolve(data as GetErrorResponseType));
        }
        catch (e) {
            reject(e);
        }
    });
};