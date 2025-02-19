import React from "react";
import classNames from "classnames";

export type WealthProLogoProps = {
    className?: any
};

export const WealthProLogo = ({ className } : Readonly<WealthProLogoProps>) : React.ReactNode => (
    <img src="/images/wp-logo.png" alt="wealthpro" className={classNames(className)} />
);