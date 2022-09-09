export type Auth = boolean;

export interface iUser {
  user: {
    email?: string;
    fullName?: string;
    role?: string;
    _id?: string;
    __v?: number;
  };
}

export interface iAuthUser extends iUser {
  isAuth: Auth;
}

export interface iAuthContext extends iAuthUser {
  setAuthUser: React.Dispatch<React.SetStateAction<iAuthUser>>;
}

export interface iAuthProvider {
  children: React.ReactNode;
}
