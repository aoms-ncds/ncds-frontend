import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (cred: LoginCredentials) => getStandardResponse<LoginResponse>(
    dummyRequest<LoginResponse>({
      data: {
        token: 'skdfksj',
        user: {
          _id: '32490245',
          firstName: 'Jishnu',
          lastName: 'Raj',
          dob: moment(),
          doj: moment(),
          designation: {
            _id: 'jr20j0f',
            name: 'Tech Lead',
          },
          department: {
            _id: '0tj30rftko',
            name: 'IT',
          },
          phone: '',
          email: '',
          spouseOfAnotherEmployee: '',
          idFormat: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
      },
      message: 'Successfully logged in!',
      result: 'success',
      timeout: 500,
    }),
  ),
};
