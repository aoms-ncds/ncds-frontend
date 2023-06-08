import moment from 'moment';
import axios from 'axios';
import { FilterQuery } from 'mongoose';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (loginCred: LoginCredentials) => getStandardResponse<LoginResponse>(axios.post('/users/login', loginCred, { headers: { ...getAuthHeader() } })),
  requestForgottenPasswordReset: (email: string) => getStandardResponse<LoginResponse>(axios.post('/users/request_forgotten_password', email, { headers: { ...getAuthHeader() } })),

  getAll: (conditions?: FilterQuery<User>): Promise<StandardResponse<User[]>> =>
    getStandardResponse<User[]>(
      axios.get('/users', {
        params: { filterQuery: JSON.stringify(conditions) },
        headers: { ...getAuthHeader() },
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
  getById: (userID: string, params?: {withPermissions: boolean}): Promise<StandardResponse<Staff | IWorker | null>> =>
    getStandardResponse<Staff | null>(axios.get(`/users/${userID}`, { params: { ...params }, headers: { ...getAuthHeader() } }), (data) => ({
      ...data,
      basicDetails: {
        ...data.basicDetails,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: data.officialDetails.dateOfJoining? moment(data.officialDetails.dateOfJoining):undefined,
        dateOfLeaving: data.officialDetails.dateOfLeaving?moment(data.officialDetails.dateOfLeaving):undefined,
        divisionHistory: data.officialDetails.divisionHistory.map((divHis: DivisionHistory)=>({
          ...divHis,
          dateOfDivisionJoining: divHis.dateOfDivisionJoining? moment(divHis.dateOfDivisionJoining):undefined,
          dateOfDivisionLeaving: divHis.dateOfDivisionLeaving?moment(divHis.dateOfDivisionLeaving):undefined,
        })),
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  getMe: (conditions?: FilterQuery<User>): Promise<StandardResponse<IWorker|Staff>> =>
    getStandardResponse<IWorker|Staff>(
      axios.get('/users/me', {
        params: {
          filterQuery: JSON.stringify(conditions),
        },
        headers: { ...getAuthHeader() },
      }),
      (me) =>({
        ...me,
        basicDetails: {
          ...me.basicDetails,
          dateOfBirth: moment(me.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...me.officialDetails,
          dateOfJoining: moment(me.basicDetails.dateOfJoining),
        },
        createdAt: moment(me.createdAt),
        updatedAt: moment(me.updatedAt),
      }),
    ),
  editPermission: (userID: string, permission: {name: string; value: boolean}) =>
    getStandardResponse<void>(
      axios.patch(`/users/${userID}/permissions`, { permission }, { headers: { ...getAuthHeader() } }),
    ),
};
