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
  getDepartment: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{ _id: 1,
        name: 'IT' },
      { _id: 2,
        name: 'Account' },
      ],
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  getPosition: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{ _id: 1,
        name: 'TL' },
      { _id: 2,
        name: 'TH' },
      ],
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  createStaff: ( department: Staff,
    action: 'add' | 'edit') => getStandardResponse<number>(
      dummyRequest({
        data: action,
        // error: null,
        message: action +'ed staff',
        result: 'success',
        timeout: 500,
      }),
    ),
  getStaffs: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{
        _id: 1,
        name: 'athira',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: 1,
          name: 'TL',
        },
        department: {
          _id: 1,
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      {
        _id: 2,
        name: 'Sanjay',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: 1,
          name: 'TL',
        },
        department: {
          _id: 1,
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      {
        _id: 3,
        name: 'Sanjili',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: 1,
          name: 'TL',
        },
        department: {
          _id: 1,
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
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
