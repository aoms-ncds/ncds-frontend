import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import { categories } from './FRConfig';
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
  getAll: () => getStandardResponse<Frrequest[]>(
    dummyRequest<Frrequest[]>({
      data: [{
        _id: '1',
        FRno: '1234',
        FRdate: moment('17-04-2023'),
        divisionName: 'test',
        subdivisionName: 'test',
        mainCategory: 'Fr request',
        requestAmount: '50000',
        lastUpdateDate: moment('17-04-2023'),
        sanction: 'Required' },
      {
        _id: '2',
        FRno: '1234',
        FRdate: moment('17-04-2023'),
        divisionName: 'test',
        subdivisionName: 'test',
        mainCategory: 'Fr request',
        requestAmount: '50000',
        lastUpdateDate: moment('17-04-2023'),
        sanction: 'Required' },
      {
        _id: '3',
        FRno: '1234',
        FRdate: moment('17-04-2023'),
        divisionName: 'test',
        subdivisionName: 'test',
        mainCategory: 'Fr request',
        requestAmount: '50000',
        lastUpdateDate: moment('17-04-2023'),
        sanction: 'Required' },
      {
        _id: '4',
        FRno: '1234',
        FRdate: moment('17-04-2023'),
        divisionName: 'test',
        subdivisionName: 'test',
        mainCategory: 'Fr request',
        requestAmount: '50000',
        lastUpdateDate: moment('17-04-2023'),
        sanction: 'Required' },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getRequisition: () => getStandardResponse<Requisition[]>(
    dummyRequest<Requisition[]>({
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
        _id: '4',
        RequisitionName: 'Subdivision',
      },
      {
        _id: '4',
        RequisitionName: 'Others',
      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getMainCategory: () => getStandardResponse<MainCategory[]>(
    dummyRequest<MainCategory[]>({
      data: categories,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getMonth: () => getStandardResponse<Month[]>(
    dummyRequest<Month[]>({
      data: [{
        monthName: 'January',
      },
      {
        monthName: 'February',
      },
      {
        monthName: 'March',
      },
      {
        monthName: 'April',
      },
      {
        monthName: 'May',
      },
      {
        monthName: 'June',
      },
      {
        monthName: 'July',
      },
      {
        monthName: 'August',
      },
      {
        monthName: 'September',
      },
      {
        monthName: 'October',
      },
      {
        monthName: 'November',
      },
      {
        monthName: 'December',
      },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  addParticulars: ( particularData: Particulars,
    action: 'add' | 'edit') => getStandardResponse<number>(
      dummyRequest({
        data: action,
        // error: null,
        message: action +'ed Particulars',
        result: 'success',
        timeout: 500,
      }),
    ),
  getParticulars: () => getStandardResponse<Particulars[]>(
    dummyRequest<Particulars[]>({
      data: [{
        _id: '1',
        FRmainCategory: 'main',
        FRsubCategory1: 'sub',
        FRsubCategory2: 'sub2',
        FRsubCategory3: 'sub3',
        FRquantity: '12',
        FRmonth: 'January',
        FRrequestedAmount: 300,
        FRnarration: 'paticularss',
      },
      {
        _id: '2',
        FRmainCategory: 'main',
        FRsubCategory1: 'sub',
        FRsubCategory2: 'sub2',
        FRsubCategory3: 'sub3',
        FRquantity: '12',
        FRmonth: 'January',
        FRrequestedAmount: 300,
        FRnarration: 'paticularss',
      },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),


};
