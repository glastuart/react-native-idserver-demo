import React from "react";
import classNames from "classnames";

export type ButtonProps = React.HTMLProps<HTMLButtonElement> & {
    type: "button" | "reset" | "submit"
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ children, className, type, ...rest }, ref) : React.ReactNode => (
    <button ref={ref} type={type} className={classNames('text-xs font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700 text-white cursor-pointer' as any, className)} {...rest}>
        {children}
    </button>
));