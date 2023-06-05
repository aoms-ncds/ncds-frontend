import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { FilterQuery } from 'mongoose';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (loginCred: LoginCredentials) => getStandardResponse<LoginResponse>(axios.post('/users/login', loginCred)),
  requestForgottenPasswordReset: (email: string) => getStandardResponse<LoginResponse>(axios.post('/users/request_forgotten_password', email)),

  getAll: (conditions?: FilterQuery<User>): Promise<StandardResponse<User[]>> =>
    getStandardResponse<User[]>(
      axios.get('/users', {
        params: {
          filterQuery: JSON.stringify(conditions),
        },
      }),
      (users) =>
        users.map((user: any) => ({
          ...user,
          basicDetails: {
            ...user.basicDetails,
            dateOfBirth: moment(user.basicDetails.dateOfBirth),
          },
          officialDetails: {
            ...user.officialDetails,
            dateOfJoining: moment(user.basicDetails.dateOfJoining),
          },
          createdAt: moment(user.createdAt),
          updatedAt: moment(user.updatedAt),
        })),
    ),
};
