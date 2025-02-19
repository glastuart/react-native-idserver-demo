import React from "react";
import classNames from "classnames";

export type CardProps = {
    children?: React.ReactNode | null | undefined,
    className?: any
};

export type CardBodyProps = {
    children: React.ReactNode,
    className?: any
};

export const CardBody = ({ children, className } : Readonly<CardBodyProps>) : React.ReactNode => (
    <div className={classNames("flex flex-col flex-1 gap-1 p-8" as  any, className)}>
        {children}
    </div>
);

export const Card = ({ children, className } : Readonly<CardProps>) : React.ReactNode => (
    <div className={classNames("flex flex-col border-2 rounded-md" as any, className)}>
        {children}
    </div>
);