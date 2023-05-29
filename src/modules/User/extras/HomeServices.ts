import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  loginUser: (loginCred: LoginCredentials) =>
    getStandardResponse<LoginResponse>(
      dummyRequest({
        data: {
          token: 'sdmndkwdiiwioqsk223asdnandsnklalsdklqejo13i90jen',
          user: {
            _id: '324565456546554643333312334',
          },
        },
        message: 'Login Success',
        result: 'success',
        timeout: 500,
      }),
    ),
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
