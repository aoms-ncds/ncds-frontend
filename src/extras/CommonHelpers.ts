/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';

export const getStandardResponse = <T>(
  axiosCall: Promise<AxiosResponse<any, any>>,
  responseFormatter?: (res: AxiosResponse<any, any>) =>StandardResponse<T>,
):Promise<StandardResponse<T>> => new Promise((resolve, reject) => {
    axiosCall
  .then((res) => responseFormatter ? resolve(responseFormatter(res.data)) : resolve(res.data))
  .catch((error) => {
    console.log({ test: error });
    reject(error.response && error.response.data ? error.response.data : ({ message: error.message }));
  });
  });

export const getAuthHeader = () => ({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

export const dummyRequest = <T>(res: {
  data?: T;
  error?: string;
  message?: string;
  result: 'success'|'fail';
  timeout: number;
}):Promise<any> => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (res.result === 'success') {
        resolve({ data: { data: res.data, message: res.message, error: res.error, success: true } });
      } else {
        reject({ data: { data: res.data, message: res.message, error: res.error, success: false } });
      }
    }, res.timeout);
  });
