import moment, { Moment } from 'moment';
import axios from 'axios';
import { FilterQuery } from 'mongoose';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  login: (loginCred: LoginCredentials) => getStandardResponse<getOtpResponse>(axios.post('/users/login', loginCred, { headers: { ...getAuthHeader() } })),

  verifyOTP: (otpRequest: IVerifyOTPRequest) => getStandardResponse<LoginResponse>(axios.post('/users/verify_otp', otpRequest, { headers: { ...getAuthHeader() } })),
  requestForgottenPasswordReset: (email: string) =>
    getStandardResponse<LoginResponse>(axios.post('/users/request_forgotten_password', { email, redirect_url: window.location.origin + '/users/reset_password' }, { headers: { ...getAuthHeader() } })),

  confirmPasswordReset: (args: { reset_token: string; new_password: string }): Promise<StandardResponse<boolean>> =>
    getStandardResponse(axios.post('/users/confirm_password_reset', args, { headers: { ...getAuthHeader() } })),

  getAll: (conditions?: FilterQuery<User>): Promise<StandardResponse<User[]>> =>
    getStandardResponse<User[]>(
      axios.get('/users', {
        params: { filterQuery: JSON.stringify(conditions) },
        headers: { ...getAuthHeader() },
      }),
      (users) =>
        users.map((user: User) => ({
          ...user,
          token: [],
          basicDetails: {
            ...user.basicDetails,
            dateOfBirth: moment(user.basicDetails.dateOfBirth),
          },
          officialDetails: {
            ...user.officialDetails,
            dateOfJoining: moment(user.officialDetails.dateOfJoining),
          },
          createdAt: moment(user.createdAt),
          updatedAt: moment(user.updatedAt),
        })),
    ),
  getAllLog: (date?:any): Promise<StandardResponse<ILog[]>> =>
    getStandardResponse<ILog[]>(
      axios.get('/users/log', {
        params: { date },
        headers: { ...getAuthHeader() },
      }),
      (logs) =>
        logs.map((log: ILog) => ({
          ...log,
          user: {
            ...log.user,
            token: [],
            basicDetails: {
              ...log?.user?.basicDetails,
              dateOfBirth: moment(log?.user?.basicDetails?.dateOfBirth),
            },
            officialDetails: {
              ...log?.user?.officialDetails,
              dateOfJoining: moment(log?.user?.officialDetails?.dateOfJoining),
            },
            createdAt: moment(log.user?.createdAt),
            updatedAt: moment(log.user?.updatedAt),
          },
          createdAt: moment(log?.createdAt),
          updatedAt: moment(log?.updatedAt),
        })),
    ),
  getLastLog: (): Promise<StandardResponse<ILog | null>> =>
    getStandardResponse<ILog | null>(
      axios.get('/users/log/me', {
        headers: { ...getAuthHeader() },
      }),
      (me) => ({
        ...me,
        _id: me._id,
        createdAt: moment(me.createdAt),
      }),
    ),
  getById: (userID: string, params?: { withPermissions: boolean }): Promise<StandardResponse<Staff | IWorker | null>> =>
    getStandardResponse<Staff | null>(axios.get(`/users/${userID}`, { params: { ...params }, headers: { ...getAuthHeader() } }), (data) => ({
      ...data,
      token: [],
      basicDetails: {
        ...data.basicDetails,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: data.officialDetails.dateOfJoining ? moment(data.officialDetails.dateOfJoining) : undefined,
        dateOfLeaving: data.officialDetails.dateOfLeaving ? moment(data.officialDetails.dateOfLeaving) : undefined,
        divisionHistory: data.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
          ...divHis,
          dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
          dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
        })),
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  getMe: (conditions?: FilterQuery<User>): Promise<StandardResponse<IWorker | Staff>> =>
    getStandardResponse<IWorker | Staff>(
      axios.get('/users/me', {
        params: {
          filterQuery: JSON.stringify(conditions),
        },
        headers: { ...getAuthHeader() },
      }),
      (me) => ({
        ...me,
        token: [],
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
  editPermission: (userID: string, permission: { name: string; value: boolean }) =>
    getStandardResponse<void>(axios.patch(`/users/${userID}/permissions`, { permission }, { headers: { ...getAuthHeader() } })),

  saveFCMToken: (token: string): Promise<StandardResponse<User | null>> =>
    getStandardResponse(
      axios.post(
        '/users/fcm_token',
        { token },
        {
          headers: {
            ...getAuthHeader(),
          },
        },
      ),
    ),

  deleteFCMToken: (token: string): Promise<StandardResponse<User | null>> =>
    getStandardResponse(
      axios.delete(`/users/fcm_token/${token}`, {
        headers: { ...getAuthHeader() },
      }),
    ),
  getDivisionUser: (divisionID: string, params?: { withPermissions: boolean }): Promise<StandardResponse<User[]>> =>
    getStandardResponse<User[]>(
      axios.get(`/users/user_division/${divisionID}`, {
        params: { ...params },
        headers: { ...getAuthHeader() },
      }),
      (users) =>
        users.map((user: User) => ({
          ...user,
          token: [],
          basicDetails: {
            ...user.basicDetails,
            dateOfBirth: moment(user.basicDetails.dateOfBirth),
          },
          officialDetails: {
            ...user.officialDetails,
            dateOfJoining: moment(user.officialDetails.dateOfJoining),
          },
          createdAt: moment(user.createdAt),
          updatedAt: moment(user.updatedAt),
        })),
    ),

  checkDuplicationOfMail: (userId: string) => getStandardResponse(axios.get(`/users/mail_duplicate/${userId}`, { headers: { ...getAuthHeader() } })),
  coordinatorOrNot: () => getStandardResponse<boolean>(axios.get('/users/coordinator_or_not', { headers: { ...getAuthHeader() } })),
  getLogById: (id: string) =>
    getStandardResponse<IUserUpdateLog[]>(
      axios.get(`/users/${id}/log`, { headers: { ...getAuthHeader() } }),
    ),
};
