export interface IChildrenProps {
  children: React.ReactElement;
}

export interface IErrorResponse {
  response: {
    data: {
      msg?: string;
    };
  };
}

export interface IReactRouterLocation {
  pathname: string;
  state?: { from: string };
}
