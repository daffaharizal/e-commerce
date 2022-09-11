import { iUser } from 'context/auth/types';

export interface ILoginInput {
  email: string;
  password: string;
  serverError?: string;
}

export interface IRegisterInput extends ILoginInput {
  fullName: string;
}

export interface IAuthResponse {
  data: iUser;
}

export interface IAuthError {
  response: {
    data: {
      msg?: string;
    };
  };
}

export interface ILocationState {
  state?: {
    from?: {
      pathname: string;
    };
  };
}
