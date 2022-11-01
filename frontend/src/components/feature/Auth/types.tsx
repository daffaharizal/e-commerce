import { UseFormRegister, FieldErrorsImpl } from 'react-hook-form';
import { IUser } from 'context/Auth/types';

export interface IAuthResponse {
  data: IUser;
}

export interface IFormInput {
  email: string;
  fullName: string;
  password: string;
}

export type IAuthProps = {
  isLoading: boolean;
  register: UseFormRegister<Partial<IFormInput>>;
  handleOnSubmit: (event: React.FormEvent) => void;
  errors: FieldErrorsImpl<Partial<IFormInput>>;
};
