import moment from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () =>
    getStandardResponse<number>(
      dummyRequest({
        data: 5,
        // error: null,
        message: 'Successfully fetched array of Application count',
        result: 'success',
        timeout: 500,
      }),
    ),
  getAll: (conditions?: { status?: number }) => getStandardResponse<Application[]>(axios.get('/application', { params: conditions, headers: { ...getAuthHeader() } })),
  getById: (applicationID: string) => getStandardResponse<Application>(axios.get(`/application/${applicationID}`, { headers: { ...getAuthHeader() } })),
  approve: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/approve`, null, { headers: { ...getAuthHeader() } })),
  reject: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/reject`, null, { headers: { ...getAuthHeader() } })),

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create: (application: CreatableApplication) => {
    console.log(application, ' ...application, ...application, ...application,');
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

  editApplication: (applicationID: any, application: CreatableApplication) => {
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


  saveRelease: (applicationID: string) =>
    getStandardResponse<void>(
      dummyRequest({
        // error: null,
        message: 'Network Error',
        result: 'success',
        timeout: 500,
      }),
    ),
};
