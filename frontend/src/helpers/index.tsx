import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { IErrorResponse } from 'types';

import { IAxiosProps } from './types';

const axiosCreate = async <T,>({
  axiosApi,
  axiosMethod = 'GET',
  axiosData = {}
}: Partial<IAxiosProps>) => {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  const instance = axios.create({
    baseURL: `${serverUrl}/api/v1`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  let res: AxiosResponse<T>;
  switch (axiosMethod) {
    case 'GET': {
      res = await instance.get(axiosApi as string);
      return res.data;
    }
    case 'POST': {
      res = await instance.post(axiosApi as string, axiosData);
      return res.data;
    }
    default: {
      console.error("Method doesn't exist.");
    }
  }
};

const axiosError = (error: IErrorResponse) => {
  if (axios.isAxiosError(error) && error.response) {
    if (error.code == 'ERR_NETWORK') {
      toast(error.message);
    } else {
      const {
        response: {
          data: { msg }
        }
      } = error as IErrorResponse;
      toast(msg);
    }
  }
};

const truncate = (input: string) =>
  input?.length > 200 ? `${input.slice(0, 197)}...` : input;

export { axiosCreate, axiosError, truncate };
