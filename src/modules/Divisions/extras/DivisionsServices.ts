import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

// const isObjectId = (id: string) => {
//   const objectIdPattern = /^[0-9a-fA-F]{24}$/;
//   return objectIdPattern.test(id);
// };
export default {
  // getCount: () => getStandardResponse<number>(axios.get('http://localhost:8080/tests/getCount', {
  //   headers: { ...getAuthHeader() },
  // })),

  getCount: () => getStandardResponse<number>(axios.get('/divisions/count', { headers: { ...getAuthHeader() } })),
  recentactivity: () => getStandardResponse<number>(axios.get('/divisions/recent-activity', { headers: { ...getAuthHeader() } })),
  getCountIT: () => getStandardResponse<any>(axios.get('/divisions/countIts', { headers: { ...getAuthHeader() } })),
  isCoordinator: () => getStandardResponse<number>(axios.get('/divisions/isCoordinator', { headers: { ...getAuthHeader() } })),
  getcoordinators: () => getStandardResponse<IWorker[]>(axios.get('/divisions/coordinators', { headers: { ...getAuthHeader() } })),
  getDivCount: () => getStandardResponse<number>(axios.get('/divisions/with-worker-count', { headers: { ...getAuthHeader() } })),
  getSubDivisionsCount: () => getStandardResponse<number>(axios.get('/divisions/sub_divisions/count', { headers: { ...getAuthHeader() } })),
  getSubDivisionsCountIt: () => getStandardResponse<number>(axios.get('/divisions/sub_divisions/countIts', { headers: { ...getAuthHeader() } })),

  getDivisions: () => getStandardResponse<Division[]>(axios.get('/divisions/', { headers: { ...getAuthHeader() } })),
  getSubDivisions: () => getStandardResponse<SubDivision[]>(axios.get('/divisions/sub_divisions', { headers: { ...getAuthHeader() } })),
  getSubDivisionsByDivisionId: (divisionId: string) => getStandardResponse<SubDivision[]>(axios.get('/divisions/sub_divisions/'+ divisionId, { headers: { ...getAuthHeader() } })),
  create: (division: Division) => {
    return getStandardResponse<Division>(
      new Promise((resolve, reject) => {
        axios
          .post('/divisions/', {
            ...division,
            division: {
              ...division.details,
              // coordinator: division.details.coordinator?._id,
              // juniorLeader: division.details.juniorLeader?._id,
              // juniorLeader: division.details.seniorLeader?._id,

            },
            subDivisions: [],

          }, { headers: { ...getAuthHeader() } })
          .then(async (createdDivision) => {
            // Create subDivisions
            try {
              for (let i = 0; i < division.subDivisions.length; i++) {
                const subDiv = division.subDivisions[i];
                await axios.post('/divisions/sub_divisions/', {
                  ...subDiv,
                  division: createdDivision.data.data._id,
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
        axios
          .patch('/divisions/' + divisionId, {
            ...division,
            division: {
              ...division.details,
              // coordinator: division.details.coordinator?._id,
              // juniorLeader: division.details.juniorLeader?._id,
              // seniorLeader: division.details.seniorLeader?._id,
              coordinator: {
                name: division?.details?.coordinator?.name,
                sign: division?.details?.coordinator?.sign,
              },
              juniorLeader: {
                name: division?.details?.juniorLeader?.name,
                sign: division?.details?.juniorLeader?.sign,
              },
              seniorLeader: {
                name: division?.details?.seniorLeader?.name,
                sign: division?.details?.seniorLeader?.sign,
              },

            },
            subDivisions: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedDivision) => {
            try {
              for (let i = 0; i < division.subDivisions.length; i++) {
                const subDiv = division.subDivisions[i];

                const objectIdPattern = /^[0-9a-fA-F]{24}$/;

                if (subDiv._id) {
                  if (objectIdPattern.test(subDiv._id)) {
                    await axios.patch(`/divisions/sub_divisions/${subDiv._id}`, {
                      ...subDiv,
                    }, { headers: { ...getAuthHeader() } });
                  } else {
                    await axios.post('/divisions/sub_divisions', {
                      ...subDiv,
                      division: updatedDivision.data.data._id,
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
  getDivisionById: (divisionId: string) => getStandardResponse<Division>(axios.get('/divisions/' + divisionId, { headers: { ...getAuthHeader() } })),

  deleteSubDivision: (subdivisionId: string) => getStandardResponse<number>(axios.delete('/divisions/sub_divisions/' + subdivisionId, { headers: { ...getAuthHeader() } })),
  divisionMarkAsRemove: (divisionId: string) => getStandardResponse<number>(axios.delete('/divisions/' + divisionId, { headers: { ...getAuthHeader() } })),
  getLogById: (id: string) =>
    getStandardResponse<IDivisionUpdateLog[]>(
      axios.get(`/divisions/${id}/log`, { headers: { ...getAuthHeader() } }),
    ),
};
