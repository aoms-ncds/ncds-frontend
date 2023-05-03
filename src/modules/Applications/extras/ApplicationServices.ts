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
  getAll: () => getStandardResponse<Application[]>(
    dummyRequest<Application[]>({
      data: [{
        _id: '1',
        name: 'rohan',
        reason: 'test',
        status: 'not Appprove',
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getApplicationById: () => getStandardResponse<Application>(
    dummyRequest<Application>({
      data: {
        _id: '1',
        name: 'rohan',
        reason: 'test',
        status: 'not Appprove',
      },
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  approve: () => getStandardResponse<number>(
    dummyRequest({
      data: 1,
      message: 'Approved ',
      result: 'success',
      timeout: 500,
    }),
  ),
  reject: () => getStandardResponse<number>(
    dummyRequest({
      data: 0,
      message: 'Recjected ',
      result: 'success',
      timeout: 500,
    }),
  ),
  createApplication: ( application: Application,
  ) => getStandardResponse<number>(
    dummyRequest({

      // error: null,

      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/naming-convention
  saveRelease: (ApplicationRealse: Application)=>getStandardResponse<number>(
    dummyRequest({
      data: ApplicationRealse,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
};
