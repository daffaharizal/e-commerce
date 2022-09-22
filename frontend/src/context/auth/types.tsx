export type Auth = boolean;

export interface IUser {
  user: {
    email?: string;
    fullName?: string;
    role?: string;
    _id?: string;
    __v?: number;
  };
}

export interface IAuthUser extends IUser {
  isAuth: Auth;
}

export interface IAuthContext extends IAuthUser {
  setAuthUser: React.Dispatch<React.SetStateAction<IAuthUser>>;
}
