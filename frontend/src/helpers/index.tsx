import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';

import { IAxiosProps } from './types';
import { IErrorResponse } from 'types';

const callAxios = async <T,>({
  axiosApi,
  axiosMethod = 'GET',
  axiosData = {}
}: IAxiosProps) => {
  const serverUrl: string = process.env.REACT_APP_API_ENDPOINT || '';

  const instance = axios.create({
    baseURL: `http://${serverUrl}/api/v1`,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  });

  let res: AxiosResponse<T>;
  switch (axiosMethod) {
    case 'GET': {
      res = await instance.get(axiosApi);
      return res.data;
    }
    case 'POST': {
      res = await instance.post(axiosApi, axiosData);
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

export { callAxios, axiosError };
