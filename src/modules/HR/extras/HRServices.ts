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
  getDesignations: () => getStandardResponse<Designation[]>(
    dummyRequest<Designation[]>({
      data: [
        {
          _id: '1',
          name: 'TL',
          createdAt: moment(),
          updatedAt: moment(),
        },
        {
          _id: '2',
          name: 'TH',
          createdAt: moment(),
          updatedAt: moment(),
        },
      ],
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  createStaff: (staff: CreatableNewUser) => {
    return getStandardResponse<CreatableStaff>(
      axios.post('/hr/staffs', staff),
    );
  },
  getStaffs: () => getStandardResponse<Staff[]>(
    axios.get('/hr/staffs'),
  ),
  // getStaffs: () => getStandardResponse<Staff[]>(
  //   dummyRequest<Staff[]>({
  //     data: [
  //       {
  //         _id: '1',
  //         firstName: 'athira',
  //         lastName: 'athira',
  //         dob: moment('12-11-2000'),
  //         doj: moment('12-11-2000'),
  //         designation: {
  //           _id: '1',
  //           name: 'TL',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         department: {
  //           _id: '1',
  //           name: 'IT',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         age: 25,
  //         gender: 'Female',
  //         phone: '123476798',
  //         email: 'test@gmail.com',
  //         formattedId: 'test',
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //       {
  //         _id: '2',
  //         firstName: 'Sanjay',
  //         lastName: 'Sanjay',
  //         dob: moment('12-11-2000'),
  //         doj: moment('12-11-2000'),
  //         designation: {
  //           _id: '1',
  //           name: 'TL',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         department: {
  //           _id: '1',
  //           name: 'IT',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         age: 25,
  //         gender: 'Male',
  //         phone: '123476798',
  //         email: 'test@gmail.com',
  //         formattedId: 'test',
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //       {
  //         _id: '3',
  //         firstName: 'Sanjili',
  //         lastName: 'Sanjili',
  //         dob: moment('12-11-2000'),
  //         doj: moment('12-11-2000'),
  //         designation: {
  //           _id: '1',
  //           name: 'TL',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         department: {
  //           _id: '1',
  //           name: 'IT',
  //           createdAt: moment(),
  //           updatedAt: moment(),
  //         },
  //         age: 25,
  //         gender: 'Female',
  //         phone: '123476798',
  //         email: 'test@gmail.com',
  //         formattedId: 'test',
  //         createdAt: moment(),
  //         updatedAt: moment(),
  //       },
  //     ],
  //     // error: null,
  //     message: 'fetched data',
  //     result: 'success',
  //     timeout: 500,
  //   }),
  // ),
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
