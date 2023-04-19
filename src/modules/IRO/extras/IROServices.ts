import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getCount: () => getStandardResponse<number>(
    dummyRequest({
      data: 5,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  getAll: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{
        _id: 1,
        IROno: '1234',
        IROdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 2,
        IROno: '1235',
        IROdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 3,
        IROno: '1236',
        IROdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 4,
        IROno: '1237',
        IROdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),

};
