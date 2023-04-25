import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';


export default {
  getCount: () => getStandardResponse<number>(
    dummyRequest({
      data: 5,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  getAll: () => getStandardResponse<Applications[]>(
    dummyRequest<Applications[]>({
      data: [{
        _id: '1',
        Name: 'rohan',
        reason: 'test',
        status: 'not Appprove',
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  saveRelease: (ApplicationRealse: Applications)=>getStandardResponse<number>(
    dummyRequest({
      data: ApplicationRealse,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
};
