export interface IChildrenProps {
  children: React.ReactNode;
}

export interface IErrorResponse {
  response: {
    data: {
      msg?: string;
    };
  };
}
