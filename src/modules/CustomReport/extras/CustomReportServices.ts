import axios from 'axios';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import moment from 'moment';

export default {


  filterData: (filter: any, dateRange?: any ) =>
    getStandardResponse<any[]>(axios.post('/custom-report/', { filter, dateRange }, { headers: { ...getAuthHeader() } }),
      (data) =>
        data.map((item: { createdAt: moment.MomentInput; updatedAt: moment.MomentInput; someDateField: moment.MomentInput }) => ({
          ...item,
          createdAt: moment(item.createdAt),
          updatedAt: moment(item.updatedAt),
          someDateField: item.someDateField ? moment(item.someDateField) : undefined,
          // Transform any other date fields if needed
        })),
    ),
  filterDataFR: (filter: any, dateRange?: any ) =>
    getStandardResponse<any[]>(axios.post('/custom-report/fr/', { filter, dateRange }, { headers: { ...getAuthHeader() } }),
      (data) =>
        data.map((item: { createdAt: moment.MomentInput; updatedAt: moment.MomentInput; someDateField: moment.MomentInput }) => ({
          ...item,
          createdAt: moment(item.createdAt),
          updatedAt: moment(item.updatedAt),
          someDateField: item.someDateField ? moment(item.someDateField) : undefined,
          // Transform any other date fields if needed
        })),
    ),

  // eslint-disable-next-line @typescript-eslint/naming-convention

};
