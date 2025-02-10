import axios from 'axios';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import moment from 'moment';

export default {


  filterData: (filter: any) =>
    getStandardResponse<any[]>(axios.post('/custom-report/', filter, { headers: { ...getAuthHeader() } }),
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
