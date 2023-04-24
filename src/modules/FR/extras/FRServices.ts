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
  getCoordiantor: () => getStandardResponse<Coordinator[]>(
    dummyRequest<Coordinator[]>({
      data: [{
        _id: '1',
        coordinatorName: 'Joseph',
      },
      {
        _id: '2',
        coordinatorName: 'John',
      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getWorker: () => getStandardResponse<IETWorker[]>(
    dummyRequest<IETWorker[]>({
      data: [{
        _id: '1',
        workerName: 'Joseph',
        workerCode: '123ww',
      },
      {
        _id: '2',
        workerName: 'John',
        workerCode: '123wwh',
      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getDivisions: () => getStandardResponse<IETDivisions[]>(
    dummyRequest<IETDivisions[]>({
      data: [{
        _id: '1',
        divisionName: 'Division 1',
      },
      {
        _id: '2',
        divisionName: 'Division 1',
      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getSubDivisions: () => getStandardResponse<Subdivisions[]>(
    dummyRequest<Subdivisions[]>({
      data: [{
        _id: '1',
        divisionId: '1',
        subDivisionName: 'Sub division1',
      },
      {
        _id: '1',
        divisionId: '1',
        subDivisionName: 'Sub division 2',
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
        FRrequestedAmount: '300',
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
        FRrequestedAmount: '300',
        FRnarration: 'paticularss',
      },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  getStaffs: () => getStandardResponse<Staff[]>(
    dummyRequest<Staff[]>({
      data: [{
        _id: '1',
        name: 'athira',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: '1',
          name: 'TL',
        },
        department: {
          _id: '1',
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      {
        _id: '2',
        name: 'Sanjay',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: '1',
          name: 'TL',
        },
        department: {
          _id: '1',
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      {
        _id: '3',
        name: 'Sanjili',
        dob: '12-11-2000',
        doj: '12-11-2000',
        designation: {
          _id: '1',
          name: 'TL',
        },
        department: {
          _id: '1',
          name: 'IT',
        },
        phone: '123476798',
        email: 'test@gmail.com',
        spouseOfAnotherEmployee: 'test',
        idFormat: 'test' },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),


};
