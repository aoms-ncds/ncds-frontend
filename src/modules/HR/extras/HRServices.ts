import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(
    axios.get('/hr/staffs/count'),
  ),
  getDepartment: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{ _id: 1,
        name: 'IT' },
      { _id: 2,
        name: 'Account' },
      ],
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  getStaffs: () => getStandardResponse<Staff[]>(
    axios.get('/hr/staffs'),
  ),
  markAsRemove: ( staffId: string) => getStandardResponse<number>(
    dummyRequest({
      data: staffId,
      // error: null,
      message: 'deleted',
      result: 'success',
      timeout: 500,
    }),
  ),

};
