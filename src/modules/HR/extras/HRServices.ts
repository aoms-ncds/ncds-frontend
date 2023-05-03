import moment from 'moment';
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
  createStaff: ( staff: CreatableStaff,
    action: 'add' | 'edit') => getStandardResponse<Staff>(
      dummyRequest<Staff>({
        data: {
          _id: '1',
          name: 'athira',
          dob: moment('12-11-2000'),
          doj: moment('12-11-2000'),
          designation: {
            _id: '1',
            name: 'TL',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '1',
            name: 'IT',
            createdAt: moment(),
            updatedAt: moment(),
          },
          phone: '123476798',
          email: 'test@gmail.com',
          spouseOfAnotherEmployee: 'test',
          idFormat: 'test',
          createdAt: moment(),
          updatedAt: moment(),
        },
        // error: null,
        message: action +'ed staff',
        result: 'success',
        timeout: 500,
      }),
    ),
  getStaffs: () => getStandardResponse<Staff[]>(
    dummyRequest<Staff[]>({
      data: [
        {
          _id: '1',
          name: 'athira',
          dob: moment('12-11-2000'),
          doj: moment('12-11-2000'),
          designation: {
            _id: '1',
            name: 'TL',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '1',
            name: 'IT',
            createdAt: moment(),
            updatedAt: moment(),
          },
          phone: '123476798',
          email: 'test@gmail.com',
          spouseOfAnotherEmployee: 'test',
          idFormat: 'test',
          createdAt: moment(),
          updatedAt: moment(),
        },
        {
          _id: '2',
          name: 'Sanjay',
          dob: moment('12-11-2000'),
          doj: moment('12-11-2000'),
          designation: {
            _id: '1',
            name: 'TL',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '1',
            name: 'IT',
            createdAt: moment(),
            updatedAt: moment(),
          },
          phone: '123476798',
          email: 'test@gmail.com',
          spouseOfAnotherEmployee: 'test',
          idFormat: 'test',
          createdAt: moment(),
          updatedAt: moment(),
        },
        {
          _id: '3',
          name: 'Sanjili',
          dob: moment('12-11-2000'),
          doj: moment('12-11-2000'),
          designation: {
            _id: '1',
            name: 'TL',
            createdAt: moment(),
            updatedAt: moment(),
          },
          department: {
            _id: '1',
            name: 'IT',
            createdAt: moment(),
            updatedAt: moment(),
          },
          phone: '123476798',
          email: 'test@gmail.com',
          spouseOfAnotherEmployee: 'test',
          idFormat: 'test',
          createdAt: moment(),
          updatedAt: moment(),
        },
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
