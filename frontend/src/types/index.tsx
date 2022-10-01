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
