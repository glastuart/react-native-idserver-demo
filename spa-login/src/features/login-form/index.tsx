import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, FormInput, LoadingSpinner } from "../../components";
import { useLogin } from "./hooks/useLogin";

export type LoginFormProps = { 
    username: string,
    password: string
};

export const LoginForm = () : React.ReactNode => {
    const methods = useForm<LoginFormProps>({ defaultValues: { username: '', password: '' } });
    const { error, isPending, login } = useLogin();

    const onSubmitHandler = (form: LoginFormProps) : void => {
        login(form.username, form.password).then(
            r => console.log('done! Time to redirect with the token..', r),
            () => {
                methods.reset({ username: form.username, password: '' });
            }
        )
    };

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <h1 className="text-lg text-gray-500 font-bold">Please login to Wealthpro.</h1>
            </div>
            {error && (
                <div className="mt-4">
                    <p className="m-0 text-sm text-red-500">{error.message ?? "There was a problem with your request."}</p>
                </div>
            )}
            <form className="flex flex-col gap-3 w-full my-4" onSubmit={methods.handleSubmit(onSubmitHandler)}>
                <Controller 
                    name="username"
                    control={methods.control}
                    rules={({ required: 'Username is required' })}
                    render={({ field: { ref, ...rest } }) => (
                        <FormInput 
                            parentClassName="mb-0" 
                            label="Username or email address" 
                            placeholder="username"
                            maxLength={255} 
                            disabled={isPending}
                            autoComplete="username"
                            {...rest} 
                        />
                    )}
                />
                <Controller 
                    name="password"
                    control={methods.control}
                    rules={({ required: 'Password is required' })}
                    render={({ field: { ref, ...rest } }) => (
                        <FormInput 
                            parentClassName="mb-2" 
                            label="Password" 
                            placeholder="password" 
                            type="password"
                            maxLength={64}
                            disabled={isPending}
                            autoComplete="current-password"
                            {...rest} 
                        />
                    )}
                />
                <Button className="w-full text-center" type="submit" disabled={isPending}>
                    {!isPending ? (<>Sign In</>) : (<LoadingSpinner width={3} height={3} />)}
                </Button>
            </form>
        </>
    );
};