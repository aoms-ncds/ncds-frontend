import moment from 'moment';
import { getStandardResponse, dummyRequest } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  // getCount: () => getStandardResponse<number>(axios.get('http://localhost:8080/tests/getCount', {
  //   headers: { ...getAuthHeader() },
  // })),
  getCount: () => getStandardResponse<number>(
    axios.get('/divisions/count'),
  ),

  getDivisions: () => getStandardResponse<DivisionDetails[]>(
    axios.get('/divisions/'),
  ),
  getSubDivisions: () => getStandardResponse<SubDivision[]>(
    dummyRequest<SubDivision[]>({
      data: [{
        _id: '2',
        subDivisionName: 'sub1',
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  addDivision: (action: 'add' | 'edit'|'view', division: DivisionDetails) => {
    return getStandardResponse<DivisionDetails>(
      axios.post('/divisions/', {
        ...division,
        division: {
          ...division.division,
          coordinator: division.division.coordinator?._id,
          juniorLeader: division.division.juniorLeader?._id,
          seniorLeader: division.division.seniorLeader?._id,
        },
      }),
    );
  },

  editDivision: (divisionId: string, division: DivisionDetails) => {
    return getStandardResponse<DivisionDetails>(
      axios.patch('/divisions/'+divisionId, division),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDivisionbyId: (divisionId: string) => getStandardResponse<DivisionDetails>(

    axios.get('/divisions/'+divisionId),
  ),

  markAsRemove: ( subdivisionId: string) => getStandardResponse<number>(
    dummyRequest({
      data: subdivisionId,
      // error: null,
      message: 'deleted',
      result: 'success',
      timeout: 500,
    }),
  ),
  divisionMarkAsRemove: (divisionId: string) => getStandardResponse<number>(
    axios.delete('/divisions/'+divisionId),
  ),

};
