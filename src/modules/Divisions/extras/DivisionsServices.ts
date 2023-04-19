import { getStandardResponse, dummyRequest } from '../../../extras/CommonHelpers';

export default {
  // getCount: () => getStandardResponse<number>(axios.get('http://localhost:8080/tests/getCount', {
  //   headers: { ...getAuthHeader() },
  // })),
  getCount: () => getStandardResponse<number>(
    dummyRequest<number>({
      data: 5,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
};
