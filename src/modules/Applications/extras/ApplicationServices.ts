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
  getAll: () => getStandardResponse<Application[]>(axios.get('/application/')),
  getById: (applicationID: string) => getStandardResponse<Application>(axios.get('/application/' + applicationID)),
  approve: (applicationID: string) =>
    getStandardResponse<void>(
      dummyRequest<void>({
        message: 'Approved ',
        result: 'success',
        timeout: 500,
      }),
    ),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  reject: (applicationID: string) =>
    getStandardResponse<void>(
      dummyRequest<void>({
        message: 'Recjected ',
        result: 'success',
        timeout: 500,
      }),
    ),
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

  editApplication: (applicationID:any, application: CreatableApplication) => {
    console.log(application, ' updateddd');
    return getStandardResponse<Application>(
      new Promise((resolve, rejects) => {
        axios
          .patch('/application/'+applicationID, {
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
