import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

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
          gender: 'Male',
          age: 22,
          phone: '',
          email: '',
          createdAt: moment(),
          updatedAt: moment(),
        },
      },
      message: 'Successfully logged in!',
      result: 'success',
      timeout: 500,
    }),
    // axios.post('/users/login'),
  ),
};
