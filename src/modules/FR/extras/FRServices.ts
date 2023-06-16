import moment from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import { categories, purposes, sanctionedAsPers } from './FRConfig';
import axios from 'axios';
export default {

  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/fr/count', { params: conditions, headers: { ...getAuthHeader() } })),

  getAll: () => getStandardResponse<FRrequest[]>(axios.get('/fr/', { headers: { ...getAuthHeader() } })),

  getAllRemarksById: (fRId: string) =>
    getStandardResponse<Remark[]>(
      axios.get(`/fr/remarks/${fRId}`, { headers: { ...getAuthHeader() } }),
      (remarks) => remarks.map((remark:any) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      })),
    ),

  deleteParticulars: (particularid: string) => getStandardResponse<number>(axios.delete(`/fr/particulars/${particularid}`, { headers: { ...getAuthHeader() } })),

  getPurposes: () => getStandardResponse<FRPurpose[]>(
    dummyRequest<FRPurpose[]>({
      data: purposes,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
    }),
  ),

  getSanctionedAsPer: () => getStandardResponse<SanctionedAsPer[]>(
    dummyRequest<SanctionedAsPer[]>({
      data: sanctionedAsPers,
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 0,
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
  addParticulars: ( particularData: CreatableParticular) => getStandardResponse<Particular>(
    axios.post('/fr/particulars', particularData, { headers: { ...getAuthHeader() } }),
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
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        axios
          .post('/fr/', {
            ...frRequest,
            Particulars: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (createdFR) => {
            // Create partcularsisions
            try {
              if (frRequest.Particulars) {
                for (let i = 0; i < frRequest.Particulars.length; i++) {
                  const partculars = frRequest.Particulars[i];
                  await axios.post('/fr/particulars/', {
                    FR: createdFR.data.data._id,
                    mainCategory: partculars.mainCategory,
                    subCategory1: partculars.subCategory1,
                    subCategory2: partculars.subCategory2,
                    subCategory3: partculars.subCategory3,
                    quantity: partculars.quantity,
                    month: partculars.month,
                    requestedAmount: partculars.requestedAmount,
                    narration: partculars.narration,
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
  getParticulars: () => getStandardResponse<Particular[]>(
    dummyRequest<Particular[]>({
      data: [{
        _id: '1',
        mainCategory: 'main',
        subCategory1: 'sub',
        subCategory2: 'sub2',
        subCategory3: 'sub3',
        quantity: 12,
        month: 'January',
        requestedAmount: 300,
        unitPrice: 300,
        narration: 'paticularss',
      },
      {
        _id: '2',
        mainCategory: 'main',
        subCategory1: 'sub',
        subCategory2: 'sub2',
        subCategory3: 'sub3',
        quantity: 12,
        month: 'January',
        requestedAmount: 300,
        unitPrice: 300,
        narration: 'paticularss',
      },
      ],
      // error: null,
      message: 'fetched data',
      result: 'success',
      timeout: 500,
    }),
  ),

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
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        console.log(frRequest);
        axios
          .patch('/fr/' + frID, {
            ...frRequest,
            Particulars: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            try {
              if (frRequest.Particulars) {
                for (let i = 0; i < frRequest.Particulars.length; i++) {
                  const partculars = frRequest.Particulars[i];
                  if (partculars._id) {
                    await axios.patch(`/fr/particulars/${partculars._id}`, {
                      FR: updatedFR.data.data._id,
                      mainCategory: partculars.mainCategory,
                      subCategory1: partculars.subCategory1,
                      subCategory2: partculars.subCategory2,
                      subCategory3: partculars.subCategory3,
                      quantity: partculars.quantity,
                      month: partculars.month,
                      requestedAmount: partculars.requestedAmount,
                      narration: partculars.narration,
                    }, { headers: { ...getAuthHeader() } });
                  } else {
                    await axios.post('/fr/particulars/', {
                      FR: updatedFR.data.data._id,
                      mainCategory: partculars.mainCategory,
                      subCategory1: partculars.subCategory1,
                      subCategory2: partculars.subCategory2,
                      subCategory3: partculars.subCategory3,
                      quantity: partculars.quantity,
                      month: partculars.month,
                      requestedAmount: partculars.requestedAmount,
                      narration: partculars.narration,
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
        console.log(frRequest);
        axios
          .patch('/fr/' + frID+'/'+operation, {
            ...frRequest,
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            resolve(updatedFR);
          })
          .catch(reject);
      }),
    );
  },


};
