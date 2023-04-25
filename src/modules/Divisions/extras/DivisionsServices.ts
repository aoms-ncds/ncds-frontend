import { getStandardResponse, dummyRequest } from '../../../extras/CommonHelpers';

export default {
  // getCount: () => getStandardResponse<number>(axios.get('http://localhost:8080/tests/getCount', {
  //   headers: { ...getAuthHeader() },
  // })),
  getCount: () => getStandardResponse<number>(
    dummyRequest<number>({
      data: 5,
      // error: null,
      message: 'Network Error',
      result: 'success',
      timeout: 500,
    }),
  ),
  getDivisions: () => getStandardResponse<IETDivisions[]>(
    dummyRequest<IETDivisions[]>({
      data: [{
        _id: '1',
        divisionName: 'Division 1',
        coordinator: {
          _id: '1',
          name: 'athira',
          dob: '12-11-2000',
          doj: '12-11-2000',
          designation: {
            _id: ' 1',
            name: 'TL',
          },
          department: {
            _id: '1',
            name: 'IT',
          },
          phone: '123476798',
          email: 'test@gmail.com',
          spouseOfAnotherEmployee: 'test',
          idFormat: 'test',
        },
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
        _id: '2',
        division: {
          _id: '1',
          divisionName: 'Division 1',
          coordinator: {
            _id: '1',
            name: 'athira',
            dob: '12-11-2000',
            doj: '12-11-2000',
            designation: {
              _id: ' 1',
              name: 'TL',
            },
            department: {
              _id: '1',
              name: 'IT',
            },
            phone: '123476798',
            email: 'test@gmail.com',
            spouseOfAnotherEmployee: 'test',
            idFormat: 'test',
          },
        },
        subDivisionName: 'sub1',
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
};
