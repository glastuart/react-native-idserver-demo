import React from "react";
import { ErrorDisplay } from "../features/error-display";

export type ErrorPageProps = {
    message?: string | null | undefined
};

// TODO: grab an error from the url?

export const ErrorPage = ({ message } : Readonly<ErrorPageProps>) : React.ReactNode => {
    if (message) {
        return (
            <div className="text-center">
                <p className="text-red-500">{message}</p>
            </div>
        )
    }

    return <ErrorDisplay />
}