/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosResponse } from 'axios';
import { EnqueueSnackbar } from 'notistack';
let loader: LoaderContextType;
let enqueueSnackbar: EnqueueSnackbar;

export default {
  setLoader: (_loader: LoaderContextType) => (loader = _loader),
  setEnqueueSnackbar: (_enqueueSnackbar: EnqueueSnackbar) => (enqueueSnackbar = _enqueueSnackbar),
};

export const getStandardResponse = <T>(axiosCall: Promise<AxiosResponse<any, any>>, responseFormatter?: ((res: any) => T) | null): Promise<StandardResponse<T>> =>
  new Promise((resolve, reject) => {
    loader && loader.onLoad();
    axiosCall
      .then((res) => {
        let result: StandardResponse<T> = res.data;
        const parsedResponse = responseFormatter ? responseFormatter(res.data.data) : null;
        if (parsedResponse) {
          result = { ...result, data: parsedResponse };
        }
        console.log({ result });
        resolve(result);
      })
      .catch((error) => {
        const parsedError = error.response && error.response.data ? error.response.data : { message: error.message };
        loader &&
          enqueueSnackbar({
            variant: 'error',
            message: parsedError.message,
          });
        reject(parsedError);
      })
      .finally(() => {
        loader && loader.afterLoad();
      });
  });

export const getAuthHeader = () => ({ Authorization: 'Bearer ' + localStorage.getItem('userToken') });

export const dummyRequest = <T>(res: { data?: T; error?: string; message?: string; result: 'success' | 'fail'; timeout: number }): Promise<any> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (res.result === 'success') {
        resolve({ data: { data: res.data, message: res.message, error: res.error, success: true } });
      } else {
        reject({ data: { data: res.data, message: res.message, error: res.error, success: false } });
      }
    }, res.timeout);
  });
