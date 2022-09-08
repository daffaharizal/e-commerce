export interface ILoginInput {
  email: string;
  password: string;
  serverError?: string;
}

export interface IRegisterInput extends ILoginInput {
  fullName: string;
}

export type IAuthError = {
  response: {
    data: {
      msg?: string;
    };
  };
};
