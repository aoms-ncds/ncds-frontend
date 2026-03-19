import moment, { Moment } from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  // getCount: () =>
  //   getStandardResponse<number>(
  //     dummyRequest({
  //       data: 5,
  //       // error: null,
  //       message: 'Successfully fetched array of Application count',
  //       result: 'success',
  //       timeout: 500,
  //     }),
  //   ),
  getCount: (conditions?: { status?: number }) => getStandardResponse<number>(axios.get('/application/count', { params: conditions, headers: { ...getAuthHeader() } })),
  getCountByDiv: (conditions?: { status?: number }) => getStandardResponse<number>(axios.get('/application/countBydiv', { params: conditions, headers: { ...getAuthHeader() } })),
  getAll: (conditions?: {dateRange?:any; status?: number; statusFilter?: number[]}) => getStandardResponse<Application[]>(axios.get('/application',
    { params: conditions, headers: { ...getAuthHeader() } })),
  getById: (applicationID: string) => getStandardResponse<Application>(axios.get(`/application/${applicationID}`, { headers: { ...getAuthHeader() } })),
  addRemark: (applicationID: string, remark: string) => getStandardResponse<Application>(axios.patch(`/application/remark/${applicationID}`, { remark }, { headers: { ...getAuthHeader() } })),
  active: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/active`, null, { headers: { ...getAuthHeader() } })),
  approve: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/approve`, null, { headers: { ...getAuthHeader() } })),
  reject: (applicationID: string, reason: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/reject`, { reason }, { headers: { ...getAuthHeader() } })),
  delete: (applicationID: string, reason?: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/delete`, { reason }, { headers: { ...getAuthHeader() } })),
  // sentToPresident: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/sentTopresident`, null, { headers: { ...getAuthHeader() } })),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: (application: CreatableApplication) => {
    return getStandardResponse<Application>(
      new Promise((resolve, rejects) => {
        axios
          .post('/application', {
            ...application,
            application: {
              name: application.name,
              reason: application.reason,
              status: application.status,
            },
          }, { headers: { ...getAuthHeader() } })

          .then(async (application) => {
            try {
              resolve(application);
            } catch (error) {
              rejects(error);
            }
          });
      }),
    );
  },
  sentToPresident: (application: CreatableApplication) => {
    return getStandardResponse<Application>(
      new Promise((resolve, rejects) => {
        axios
          .post('/application/sentTopresident', {
            ...application,
            application: {
              name: application.name,
              reason: application.reason,
              status: application.status,
            },
          }, { headers: { ...getAuthHeader() } })

          .then(async (application) => {
            try {
              resolve(application);
            } catch (error) {
              rejects(error);
            }
          });
      }),
    );
  },

  editApplication: (applicationID: string, application: CreatableApplication) => {
    return getStandardResponse<Application>(
      new Promise((resolve, rejects) => {
        axios
          .patch('/application/' + applicationID, {
            ...application,
            application: {
              name: application.name,
              reason: application.reason,
              status: application.status,
            },
          }, { headers: { ...getAuthHeader() } })

          .then(async (updatedApplication) => {
            try {
              resolve(updatedApplication);
            } catch (error) {
              rejects(error);
            }
          });
      }),
    );
  },


  // saveRelease: () =>
  //   getStandardResponse<void>(
  //     dummyRequest({
  //       // error: null,
  //       message: 'Network Error',
  //       result: 'success',
  //       timeout: 500,
  //     }),
  //   ),
};
