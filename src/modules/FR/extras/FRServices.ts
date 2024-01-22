import moment from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import { categories, purposes, sanctionedAsPers } from './FRConfig';
import axios from 'axios';
export default {


  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/fr/count', { params: conditions, headers: { ...getAuthHeader() } })),

  imageget: () => getStandardResponse<FR>(axios.get('/image', { headers: { ...getAuthHeader() } })),

  getAll: (conditions?: { status?: number }) => getStandardResponse<FR[]>(axios.get('/fr/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) =>data.map((fr:FR)=>({
    ...fr,
    FRdate: moment(fr.FRdate ),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
  }))),

  getAllRemarksById: (fRId: string) =>
    getStandardResponse<Remark[]>(
      axios.get(`/fr/remarks/${fRId}`, { headers: { ...getAuthHeader() } }),
      (remarks) => remarks.map((remark:any) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      })),
    ),

  deleteParticulars: (particularId: string) => getStandardResponse<number>(axios.delete(`/fr/particulars/${particularId}`, { headers: { ...getAuthHeader() } })),

  getPurposes: () => getStandardResponse<FRPurpose[]>(
    dummyRequest<FRPurpose[]>({
      data: purposes,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
    }),
  ),
  sendNotifications: (name: string, id: string) => getStandardResponse<FR>(axios.post(`/fr/sent/${name}/${id}`, null, { headers: { ...getAuthHeader() } })),

  getSanctionedAsPer: () => getStandardResponse<SanctionedAsPer[]>(
    dummyRequest<SanctionedAsPer[]>({
      data: sanctionedAsPers,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
    }),
  ),

  // getMainCategory: () => getStandardResponse<MainCategory[]>(
  //   dummyRequest<MainCategory[]>({
  //     data: categories,
  //     // error: null,
  //     message: 'fetched data',
  //     result: 'success',
  //     timeout: 500,
  //   }),
  // ),

  getMainCategory: ()=>getStandardResponse<MainCategory[]>(axios.get('/fr/category', { headers: { ...getAuthHeader() } })),

  // getParticulars: ()=>getStandardResponse<Particular[]>(axios.get('/fr/particular', { headers: { ...getAuthHeader() } })),

  addParticulars: ( particularData: CreatableParticular) => getStandardResponse<Particular>(
    axios.post('/fr/particulars', { ...particularData }, { headers: { ...getAuthHeader() } }),
  ),
  getById: (fRId: string) =>
    getStandardResponse<FR>(
      axios.get(`/fr/${fRId}`, { headers: { ...getAuthHeader() } }),
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
      }),
    ),
  // createFRRequests: ( frRequest: CreatableFR) => getStandardResponse<number>(
  //   axios.post('/fr/', frRequest),
  // ),
  createFRRequests: (frRequest: CreatableFR) => {
    return getStandardResponse<FR>(
      new Promise((resolve, reject) => {
        axios
          .post('/fr/', {
            ...frRequest,
            particulars: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (createdFR) => {
            // Create partcularsisions
            try {
              if (frRequest.particulars) {
                for (let i = 0; i < frRequest.particulars.length; i++) {
                  const particulars = frRequest.particulars[i];

                  await axios.post('/fr/particulars/', {
                    FR: createdFR.data.data._id,
                    mainCategory: particulars.mainCategory,
                    subCategory1: particulars.subCategory1,
                    subCategory2: particulars.subCategory2,
                    subCategory3: particulars.subCategory3,
                    quantity: particulars.quantity,
                    month: particulars.month,
                    unitPrice: particulars.unitPrice,
                    requestedAmount: particulars.requestedAmount,
                    narration: particulars.narration,
                    attachment: particulars.attachment,
                  }, { headers: { ...getAuthHeader() } });
                }
              }
              resolve(createdFR);
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },
  // getParticulars: () => getStandardResponse<Particular[]>(
  //   dummyRequest<Particular[]>({
  //     data: [{
  //       _id: '1',
  //       mainCategory: 'main',
  //       subCategory1: 'sub',
  //       subCategory2: 'sub2',
  //       subCategory3: 'sub3',
  //       quantity: 12,
  //       month: 'January',
  //       requestedAmount: 300,
  //       unitPrice: 300,
  //       narration: 'paticularss',
  //       attachment: [],

  //     },
  //     {
  //       _id: '2',
  //       mainCategory: 'main',
  //       subCategory1: 'sub',
  //       subCategory2: 'sub2',
  //       subCategory3: 'sub3',
  //       quantity: 12,
  //       month: 'January',
  //       requestedAmount: 300,
  //       unitPrice: 300,
  //       narration: 'paticularss',
  //       attachment: [],

  //     },
  //     ],
  //     // error: null,
  //     message: 'fetched data',
  //     result: 'success',
  //     timeout: 500,
  //   }),
  // ),

  addRemarks: (remark: CreatableRemark) =>
    getStandardResponse<Remark>(
      axios.post('/fr/remarks', { ...remark }, { headers: { ...getAuthHeader() } } ),
      (remark) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      }),
    ),

  updateFRRequests: (frID: string, frRequest: CreatableFR) => {
    return getStandardResponse<FR>(
      new Promise((resolve, reject) => {
        axios
          .patch('/fr/' + frID, {
            ...frRequest,
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            try {
              if (frRequest.particulars) {
                for (let i = 0; i < frRequest.particulars.length; i++) {
                  const particulars = frRequest.particulars[i];
                  if (particulars._id) {
                    await axios.patch(`/fr/particulars/${particulars._id}`, {
                      FR: updatedFR.data.data._id,
                      mainCategory: particulars.mainCategory,
                      subCategory1: particulars.subCategory1,
                      subCategory2: particulars.subCategory2,
                      subCategory3: particulars.subCategory3,
                      quantity: particulars.quantity,
                      unitPrice: particulars.unitPrice,
                      month: particulars.month,
                      requestedAmount: particulars.requestedAmount,
                      narration: particulars.narration,
                    }, { headers: { ...getAuthHeader() } });
                  } else {
                    await axios.post('/fr/particulars/', {
                      FR: updatedFR.data.data._id,
                      mainCategory: particulars.mainCategory,
                      subCategory1: particulars.subCategory1,
                      subCategory2: particulars.subCategory2,
                      subCategory3: particulars.subCategory3,
                      unitPrice: particulars.unitPrice,
                      quantity: particulars.quantity,
                      month: particulars.month,
                      requestedAmount: particulars.requestedAmount,
                      narration: particulars.narration,
                    }, { headers: { ...getAuthHeader() } });
                  }
                }
              }
              resolve(updatedFR); // Resolve with the updated division
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },

  manageFRRequests: (frID: string, operation:string, frRequest: CreatableFR) => {
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        axios
          .patch('/fr/' + frID+'/'+operation, {
            ...frRequest,
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            try {
              if (frRequest.particulars) {
                for (let i = 0; i < frRequest.particulars.length; i++) {
                  const particulars = frRequest.particulars[i];

                  await axios.patch(`/fr/particulars/${particulars._id}`, {
                    narration: particulars.narration,
                  }, { headers: { ...getAuthHeader() } });
                }
              }
              resolve(updatedFR); // Resolve with the updated division
            } catch (error) {
              reject(error);
            }
          })
          .catch(reject);
      }),
    );
  },


};
