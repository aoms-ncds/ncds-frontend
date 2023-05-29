import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getCount: () => getStandardResponse<number>(
    dummyRequest({
      data: 5,
      // error: null,
      message: 'Successfully fetched array of Application count',
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
        createdAt: moment(),
        updatedAt: moment(),
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getById: (applicationID: string) => getStandardResponse<Application>(
    dummyRequest<Application>({
      data: {
        _id: '1',
        name: 'rohan',
        reason: 'test',
        status: 'not Appprove',
        createdAt: moment(),
        updatedAt: moment(),
      },
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  approve: (applicationID: string) => getStandardResponse<void>(
    dummyRequest<void>({
      message: 'Approved ',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reject: (applicationID: string) => getStandardResponse<void>(
    dummyRequest<void>({
      message: 'Recjected ',
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: ( application: CreatableApplication ) => getStandardResponse<Application>(
    dummyRequest({
      // error: null,
      result: 'success',
      timeout: 500,
    }),
  ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  saveRelease: (applicationID: string)=>getStandardResponse<void>(
    dummyRequest({
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
};
