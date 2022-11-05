export interface IChildrenProps {
  children: React.ReactElement;
}

export interface IErrorResponse {
  code: string;
  message?: string;
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

export interface IReactSelectOption {
  readonly label: string;
  readonly value: string;
}
