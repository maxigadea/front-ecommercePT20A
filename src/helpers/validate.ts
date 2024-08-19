import { ILoginError, ILoginProps, IRegisterProps, TRegisterError } from "@/interfaces/Types";



export function validateLoginForm (values: ILoginProps): ILoginError {
    const errors: ILoginError = {}

    if(values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
};

export function validateRegisterForm (values: IRegisterProps): TRegisterError {
    const errors: TRegisterError = {}

    if(values.email && !/\S+@\S+\.\S+/.test(values.email)) {
        errors.email = "Email is not valid"
    }

    return errors;
};