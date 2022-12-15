export interface IAxiosProps {
  axiosApi: string;
  axiosMethod: string;
  axiosData: object;
  headers: {
    'Content-Type': string;
    Accept: string;
  };
}
