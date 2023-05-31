import axios from 'axios';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser: (loginCred: LoginCredentials) =>
    getStandardResponse<LoginResponse>(axios.post('/users/login', loginCred)),
  requestForgottenPasswordReset: (email: string) =>
    getStandardResponse<void>(
      dummyRequest({
        data: {
          //
        },
        message: 'Successfully logged in! Something went wrong! Please try again',
        result: 'success',
        timeout: 500,
      }),
    ),
};
