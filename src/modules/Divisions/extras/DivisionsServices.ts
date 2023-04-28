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
  getDivisions: () => getStandardResponse<DivisionProfile[]>(
    dummyRequest<DivisionProfile[]>({
      data: [{
        divisionName: 'Division 1',
        _id: '1',
        divisionId: '233',
        contactNumber: '89000333',
        emailId: 'division@gmail.com',
        address: 'Division address',
        noofWorkers: 5,
        NoOfSubdivisions: 5,
        NoOfChurches: 5,
        coordinatorName: 'Alex',
        coordinatorContactno: '7884844',
        coordinatorEmail: 'alex@gmail.com',
        seniorLeaderName: 'Thomas',
        seiorLeaderContactno: '678993333',
        seiorLeaderEmail: 'thomas@gmail.com',
        juniorLeaderName: 'Mikha',
        juniorLeaderContactno: '67788833',
        juniorLeaderEmail: 'mikha@gmail.com',

      },
      {
        divisionName: 'Division 2',
        _id: '2',
        divisionId: '233',
        contactNumber: '89000333',
        emailId: 'division@gmail.com',
        address: 'Division address',
        noofWorkers: 5,
        NoOfSubdivisions: 5,
        NoOfChurches: 5,
        coordinatorName: 'Alex',
        coordinatorContactno: '7884844',
        coordinatorEmail: 'alex@gmail.com',
        seniorLeaderName: 'Thomas',
        seiorLeaderContactno: '678993333',
        seiorLeaderEmail: 'thomas@gmail.com',
        juniorLeaderName: 'Mikha',
        juniorLeaderContactno: '67788833',
        juniorLeaderEmail: 'mikha@gmail.com',

      },

      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
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
  addDivision: ( ) => getStandardResponse<number>(
    dummyRequest({
      data: 1,
      // error: null,
      message: 'created Division',
      result: 'success',
      timeout: 500,
    }),
  ),
  editDivision: () => getStandardResponse<number>(
    dummyRequest({
      data: 1,
      // error: null,
      message: 'Updated Division',
      result: 'success',
      timeout: 500,
    }),
  ),
  getDivisionbyId: (divisionId: string) => getStandardResponse<DivisionDetails>(
    dummyRequest<DivisionDetails>({
      data: {
        divisionProfile: {
          divisionName: 'Division 1',
          _id: '1',
          divisionId: '233',
          contactNumber: '89000333',
          emailId: 'division@gmail.com',
          address: 'Division address',
          noofWorkers: 5,
          NoOfSubdivisions: 5,
          NoOfChurches: 5,
          coordinatorName: 'Alex',
          coordinatorContactno: '7884844',
          coordinatorEmail: 'alex@gmail.com',
          seniorLeaderName: 'Thomas',
          seiorLeaderContactno: '678993333',
          seiorLeaderEmail: 'thomas@gmail.com',
          juniorLeaderName: 'Mikha',
          juniorLeaderContactno: '67788833',
          juniorLeaderEmail: 'mikha@gmail.com',
        },
        subDivisionDetails: [{
          _id: '1',
          subDivisionName: 'subdivision 1',

        },
        {
          _id: '2',
          subDivisionName: 'subdivision 2',

        },
        {
          _id: '3',
          subDivisionName: 'subdivision 3',

        }],
        bankDetails: {
          FCRABankname: 'FCRA',
          FCRABranchname: 'Thodupuzha',
          FCRAAccountNumber: '23344',
          FCRAIFSCCode: 'ddd33',
          FCRABeneficiary: '222',
          localBankname: 'Canara',
          localBranchname: 'Thodupuzha',
          localAccountNumber: '4567799',
          localIFSCCode: '222',
          localBeneficiary: '22',

        },


      },
      // error: null,
      message: 'Approved',
      result: 'success',
      timeout: 500,
    }),
  ),

};
