import React from "react";
import { LoadingSpinner } from "../../components";
import { useErrorMessage } from "./hooks/useErrorMessage";

export const ErrorDisplay = () : React.ReactNode => {
    const { data, isLoading } = useErrorMessage();

    if (isLoading || !data) {
        return (
            <>
                <LoadingSpinner />
            </>
        )
    }

    return (
        <div className="text-center">
            <p className="text-red-500">{data.errorDescription ?? data.error}</p>
        </div>
    )
};