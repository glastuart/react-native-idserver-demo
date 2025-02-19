import React from "react";
import classNames from "classnames";

export type FormInputProps = React.HTMLProps<HTMLInputElement> & {
    label?: React.ReactNode | null | undefined,
    parentClassName?: any
};

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(({ className, label, parentClassName, ...rest }, ref) : React.ReactNode => {
    const id = React.useId();
    return (
        <div className={classNames({ "mb-2": !parentClassName }, parentClassName)}>
            {label && (
                <label className="block text-gray-500 text-sm mb-2" htmlFor={id}>
                    {label}
                </label>
            )}
            <input ref={ref} id={id} className={classNames('shadow appearance-none border rounded w-full py-2 px-3 text-sm text-gray-700 leading-tight focus:outline-none focus:shadow-outline' as any, className)} {...rest} />
        </div>
    );
});