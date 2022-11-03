export type Auth = boolean;

export interface IUser {
  user: {
    email: string;
    fullName: string;
    role: string;
    id: string;
  };
}

export interface IAuthUser extends Partial<IUser> {
  isAuth: Auth;
}

export interface IAuthContext extends IAuthUser {
  setAuthUser: React.Dispatch<React.SetStateAction<IAuthUser>>;
}
