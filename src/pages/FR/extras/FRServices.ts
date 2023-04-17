import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getCount: () => {
    return getStandardResponse<number>(
      dummyRequest({
        data: 5,
        // error: null,
        message: 'Network Error',
        result: 'success',
        timeout: 500,
      }),
    );
  },

};
