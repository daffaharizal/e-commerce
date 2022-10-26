import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { IUser } from 'context/Auth/types';

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IRegisterInput extends ILoginInput {
  fullName: string;
}

export interface IAuthResponse {
  data: IUser;
}

export type IFormInput = IRegisterInput | ILoginInput;

export type IAuthProps = {
  isLoading: boolean;
  register: UseFormRegister<IFormInput>;
  handleOnSubmit: (event: React.FormEvent) => void;
  errors: FieldErrorsImpl<{
    fullName: string;
    email: string;
    password: string;
  }>;
};
