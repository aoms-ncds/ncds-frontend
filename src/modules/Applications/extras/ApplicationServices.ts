import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { rejects } from 'assert';

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
  getAll: (conditions?: { status?: number }) => getStandardResponse<Application[]>(axios.get('/application', { params: conditions })),
  getById: (applicationID: string) => getStandardResponse<Application>(axios.get('/application/' + applicationID)),
  approve: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/approve`)),
  reject: (applicationID: string) => getStandardResponse<Application>(axios.patch(`/application/${applicationID}/reject`)),

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
          })

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
          })

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
