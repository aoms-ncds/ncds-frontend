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
  getStaffs: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{
        _id: 1,
        Name: 'athira',
        DOB_DOJ: '12-11-2000',
        Designation: 'TL',
        Department: 25,
        Phone_email: '123476798',
        Spouse_of_another_employee: 'test',
        ID_format: 'test',
      },
      {
        _id: 2,
        Name: 'sanjay',
        DOB_DOJ: '26-02-2001',
        Designation: 'SSD',
        Department: 25,
        Phone_email: '9876654322',
        Spouse_of_another_employee: 'test',
        ID_format: 'test' },
      {
        _id: 3,
        Name: 'sanjili',
        DOB_DOJ: '12-11-2023',
        Designation: 'JSD',
        Department: 25,
        Phone_email: '2344658679',
        Spouse_of_another_employee: 'test',
        ID_format: 'test' },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),

};
