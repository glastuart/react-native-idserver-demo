import React from "react";
import classNames from "classnames";

export type CompanyLogoType = {
    className?: any
};

// TODO: contact a server side to update/get the logo
export const CompanyLogo = ({ className } : Readonly<CompanyLogoType>) : React.ReactNode => (
    <img src="/images/cm-logo-head.png" alt="company-logo" className={classNames(className)} />
);