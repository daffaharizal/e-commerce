import axios, { AxiosResponse } from 'axios';

const callAxios = async <T,>({
  api,
  axiosMethod
}: {
  api: string;
  axiosMethod: string;
}) => {
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
    case 'GET':
      res = await instance.get(api);
      return res.data;
    // case 'POST':
    //   res = await instance.post(api, data);
    //   return res.data;
    default:
      console.error("Method doesn't exists");
  }
};

export { callAxios };
