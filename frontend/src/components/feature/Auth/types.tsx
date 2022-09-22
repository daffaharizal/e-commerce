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

export interface ILocationState {
  state?: {
    from?: {
      pathname: string;
    };
  };
}
