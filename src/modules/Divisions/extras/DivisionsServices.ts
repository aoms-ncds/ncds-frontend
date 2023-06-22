import moment from 'moment';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

const isObjectId = (id: string) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};
export default {
  // getCount: () => getStandardResponse<number>(axios.get('http://localhost:8080/tests/getCount', {
  //   headers: { ...getAuthHeader() },
  // })),

  getCount: () => getStandardResponse<number>(axios.get('/divisions/count', { headers: { ...getAuthHeader() } })),

  getDivisions: () => getStandardResponse<Division[]>(axios.get('/divisions/', { headers: { ...getAuthHeader() } })),
  getSubDivisions: () => getStandardResponse<SubDivision[]>(axios.get('/divisions/sub_divisions', { headers: { ...getAuthHeader() } })),
  getSubDivisionsByDivisionId: (divisionId: string) => getStandardResponse<SubDivision[]>(axios.get('/divisions/sub_divisions', { params: { divisionId }, headers: { ...getAuthHeader() } })),
  create: (division: Division) => {
    console.log('Calll');
    return getStandardResponse<Division>(
      new Promise((resolve, reject) => {
        axios
          .post('/divisions/', {
            ...division,
            division: {
              ...division.details,
              coordinator: division.details.coordinator?._id,
              juniorLeader: division.details.juniorLeader?._id,
              seniorLeader: division.details.seniorLeader?._id,
            },
            subDivisions: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (createdDivision) => {
            // Create subDivisions
            try {
              for (let i = 0; i < division.subDivisions.length; i++) {
                const subDiv = division.subDivisions[i];
                await axios.post('/divisions/sub_divisions/', {
                  division: createdDivision.data.data._id,
                  name: subDiv.name,
                  leader: subDiv.leader?._id,
                }, { headers: { ...getAuthHeader() } });
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

  editDivision: (divisionId: string, division: Division) => {
    return getStandardResponse<Division>(
      new Promise((resolve, reject) => {
        // console.log(division);
        axios
          .patch('/divisions/' + divisionId, {
            ...division,
            division: {
              ...division.details,
              coordinator: division.details.coordinator?._id,
              juniorLeader: division.details.juniorLeader?._id,
              seniorLeader: division.details.seniorLeader?._id,
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
                    await axios.patch(`/divisions/sub_divisions/${subDiv._id}`, {
                      division: updatedDivision.data.data._id,
                      name: subDiv.name,
                    }, { headers: { ...getAuthHeader() } });
                  } else {
                    await axios.post('/divisions/sub_divisions', {
                      division: updatedDivision.data.data._id,
                      name: subDiv.name,
                    }, { headers: { ...getAuthHeader() } });
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
  SubDivisionServices: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getDivisionbyId: (divisionId: string) => getStandardResponse<Division>(axios.get('/divisions/' + divisionId, { headers: { ...getAuthHeader() } })),

  deleteSubDivision: (subdivisionId: string) => getStandardResponse<number>(axios.delete('/divisions/sub_divisions/' + subdivisionId, { headers: { ...getAuthHeader() } })),
  divisionMarkAsRemove: (divisionId: string) => getStandardResponse<number>(axios.delete('/divisions/' + divisionId, { headers: { ...getAuthHeader() } })),
};
