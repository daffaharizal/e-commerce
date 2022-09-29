import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { IUser } from 'context/auth/types';

export interface ILoginInput {
  email: string;
  password: string;
  serverError?: string;
}

export interface IRegisterInput extends ILoginInput {
  fullName: string;
}

export interface IAuthResponse {
  data: IUser;
}

export type IFormInput = IRegisterInput | ILoginInput;

export interface IWithAuth {
  serverUrl: string;
}

export type IAuthProps = {
  register: UseFormRegister<IFormInput>;
  handleOnSubmit: (event: React.FormEvent) => void;
  errors: FieldErrorsImpl<{
    fullName: string;
    email: string;
    serverError: string;
    password: string;
  }>;
};
