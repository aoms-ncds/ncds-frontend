import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';

export default {
  getCount: () => {
    return getStandardResponse<number>(
      dummyRequest<number>({
        data: 5,
        // error: null,
        message: 'Network Error',
        result: 'success',
        timeout: 500,
      }),
    );
  },
  getAll: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{
        _id: 1,
        Frno: '1234',
        Frdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 2,
        Frno: '1235',
        Frdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 3,
        Frno: '1236',
        Frdate: '17-04-2023',
        Division_name: 'test',
        Subdivision_name: 'test',
        Main_category: 'Fr request',
        Request_amount: '50000',
        Lastupdate_date: '17-04-2023',
        Sanction: 'Required' },
      {
        _id: 4,
        Frno: '1237',
        Frdate: '17-04-2023',
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
  getRequisition: () => getStandardResponse<[]>(
    dummyRequest({
      data: [{
        _id: '1',
        RequisitionName: 'Division',
      },
      {
        _id: '2',
        RequisitionName: 'Worker',
      },
      {
        _id: '3',
        RequisitionName: 'Coordinator',
      },
      {
        _id: '3',
        RequisitionName: 'Subdivision',
      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),

};
