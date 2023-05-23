import moment from 'moment';
import { getStandardResponse, dummyRequest } from '../../../extras/CommonHelpers';
import axios from 'axios';
const isObjectId = (id: string) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};
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
        name: 'sub1',
      },
      ],
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),
  create: (division: DivisionDetails) => {
    return getStandardResponse<DivisionDetails>(
      new Promise((resolve, reject) => {
        axios.post('/divisions/', {
          ...division,
          division: {
            ...division.division,
            coordinator: division.division.coordinator?._id,
            juniorLeader: division.division.juniorLeader?._id,
            seniorLeader: division.division.seniorLeader?._id,
          },
          subDivisions: [],
        })
        .then(async (createdDivision) => {
          // Create subdivisions
          try {
            for (let i = 0; i < division.subDivisions.length; i++) {
              const subDiv = division.subDivisions[i];
              await axios.post(
                '/divisions/sub_division/', {
                  division: createdDivision.data.data._id,
                  name: subDiv.name,
                },
              );
            }
            resolve(createdDivision);
          } catch (error) {
            reject(error);
          }
        })
        .catch(reject);
      }),
    );
  },

  editDivision: (divisionId: string, division: DivisionDetails) => {
    return getStandardResponse<DivisionDetails>(
      new Promise((resolve, reject) => {
        // console.log(division);
        axios.patch('/divisions/' + divisionId, {
          ...division,
          division: {
            ...division.division,
            coordinator: division.division.coordinator?._id,
            juniorLeader: division.division.juniorLeader?._id,
            seniorLeader: division.division.seniorLeader?._id,
          },
          subDivisions: [],
        })
          .then(async (updatedDivision) => {
            try {
              for (let i = 0; i < division.subDivisions.length; i++) {
                const subDiv = division.subDivisions[i];

                const objectIdPattern = /^[0-9a-fA-F]{24}$/;

                if (subDiv._id) {
                  if (objectIdPattern.test(subDiv._id)) {
                    await axios.patch('/divisions/sub_division/' + subDiv._id, {
                      division: updatedDivision.data.data._id,
                      name: subDiv.name,
                    });
                  } else {
                    await axios.post('/divisions/sub_division', {
                      division: updatedDivision.data.data._id,
                      name: subDiv.name,
                    });
                  }
                }
              }
              resolve(updatedDivision); // Resolve with the updated division
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDivisionbyId: (divisionId: string) => getStandardResponse<DivisionDetails>(

    axios.get('/divisions/'+divisionId),
  ),

  subDivisionMarkAsRemove: ( subdivisionId: string) => getStandardResponse<number>(
    axios.delete('/divisions/sub_division/'+subdivisionId),
  ),
  divisionMarkAsRemove: (divisionId: string) => getStandardResponse<number>(
    axios.delete('/divisions/'+divisionId),
  ),

};
