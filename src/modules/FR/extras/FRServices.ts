/* eslint-disable max-len */
import moment from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import { purposes } from './FRConfig';
import axios from 'axios';
export default {


  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/fr/count', { params: conditions, headers: { ...getAuthHeader() } })),
  getCustomCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/fr/ReSubmittedCount', { params: conditions, headers: { ...getAuthHeader() } })),

  imageget: () => getStandardResponse<FR>(axios.get('/image', { headers: { ...getAuthHeader() } })),
  reopen: (fRId:string) => getStandardResponse<FR>(axios.post(`/fr/${fRId}/reopen`, { headers: { ...getAuthHeader() } })),
  getAll: (conditions?: { status?: number[]; dateRange?: DateRange; searchKey?: string; support?: 'worker' | 'child' | 'all' }) => getStandardResponse<FR[]>(axios.get('/fr/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),
  getAllOptimized: (conditions?: { status?: number[]; dateRange?: DateRange; searchKey?: string; support?: 'worker' | 'child' | 'all' }) => getStandardResponse<FR[]>(axios.get('/fr/optimized/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),
  getAllOptimizedDiv: (conditions?: { status?: number[]; dateRange?: DateRange; searchKey?: string; support?: 'worker' | 'child' | 'all' }) => getStandardResponse<FR[]>(axios.get('/fr/optimizedForDiv/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),
  getAllOptimizedExSupprt: (conditions?: {dateRange?: DateRange; support?: 'Expanse' | 'Support'|'All'|'Resubmitted' |'Custom'|null; status?: any}) => getStandardResponse<FR[]>(axios.get('/fr/support-expanse/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),
  getAllOptimizedById: (fRId: any) => getStandardResponse<FR>(
    axios.get(`/fr/optimized/${fRId}`, { headers: { ...getAuthHeader() } }),
    (data) => ({
      ...data,
      FRdate: moment(data.FRdate),
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
      frVerifiedOn: data.frVerifiedOn ? moment(data.frVerifiedOn) : null,
    }),
  ),

  getAllCustom: (conditions?: { status?: number[]; dateRange?: DateRange; searchKey?: string; support?: 'worker' | 'child' | 'all' }) => getStandardResponse<FR[]>(axios.get('/fr/custom/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),
  getAllForDivision: (conditions?: { status?: number[]; dateRange?: DateRange; searchKey?: string }) => getStandardResponse<FR[]>(axios.get('/fr/forDivision/',
    { params: conditions, headers: { ...getAuthHeader() } }),
  (data) => data.map((fr: FR) => ({
    ...fr,
    FRdate: moment(fr.FRdate),
    createdAt: moment(fr.createdAt),
    updatedAt: moment(fr.updatedAt),
    frVerifiedOn: fr.frVerifiedOn ? moment(fr.frVerifiedOn) : null,
  }))),

  getAllRemarksById: (fRId: string) =>
    getStandardResponse<Remark[]>(
      axios.get(`/fr/remarks/${fRId}`, { headers: { ...getAuthHeader() } }),
      (remarks) => remarks.map((remark: Remark) => ({
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
      // data: sanctionedAsPers,
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

  getMainCategory: () => getStandardResponse<MainCategory[]>(axios.get('/fr/category', { headers: { ...getAuthHeader() } })),

  // getParticulars: ()=>getStandardResponse<Particular[]>(axios.get('/fr/particular', { headers: { ...getAuthHeader() } })),

  addParticulars: (particularData: any) => getStandardResponse<Particular>(
    axios.post('/fr/particulars', { ...particularData }, { headers: { ...getAuthHeader() } }),
  ),
  addParticularsFR: (particularData: any, id:any) => getStandardResponse<Particular>(
    axios.post('/fr/particulars/fr/', { ...particularData, id }, { headers: { ...getAuthHeader() } }),
  ),
  addParticularsIRO: (particularData: any, id:any) => getStandardResponse<Particular>(
    axios.post('/fr/particulars/IRO/', { ...particularData, id }, { headers: { ...getAuthHeader() } }),
  ),
  addParticularscustomIRO: (particularData: any, id:any) => getStandardResponse<Particular>(
    axios.post('/fr/particulars/customIRO', { ...particularData, id }, { headers: { ...getAuthHeader() } }),
  ),
  addParticularscustomFR: (particularData: any, id:any) => getStandardResponse<Particular>(
    axios.post('/fr/particulars/customFR', { ...particularData, id }, { headers: { ...getAuthHeader() } }),
  ),
  getById: (fRId?: string|null) =>
    getStandardResponse<FR>(
      axios.get(`/fr/${fRId}`, { headers: { ...getAuthHeader() } }),
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
        frVerifiedOn: data.frVerifiedOn ? moment(data.frVerifiedOn) : null,
      }),
    ),
  getByIdCustom: (fRId?: string) =>
    getStandardResponse<FR>(
      axios.get(`/fr/${fRId}/custom`, { headers: { ...getAuthHeader() } }),
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        PresidentApprovedDate: moment(data.PresidentApprovedDate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
        frVerifiedOn: data.frVerifiedOn ? moment(data.frVerifiedOn) : null,
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
                    applicationAttachment: particulars.applicationAttachment,
                    isUpcomingYear: Boolean(particulars.isUpcomingYear),
                    year: particulars.year,
                    applicationReferenceNo: particulars.applicationReferenceNo,
                    presidentSanctionAmt: particulars.presidentSanctionAmt,
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
  createFRRequestsCustom: (frRequest: CreatableFR) => {
    return getStandardResponse<FR>(
      new Promise((resolve, reject) => {
        axios
          .post('/fr/custom/', {
            ...frRequest,
            particulars: [],
          }, { headers: { ...getAuthHeader() } })
          .then(async (createdFR) => {
            // Create partcularsisions
            try {
              if (frRequest.particulars) {
                for (let i = 0; i < frRequest.particulars.length; i++) {
                  const particulars = frRequest.particulars[i];
                  await axios.post('/fr/particulars/custom/', {
                    FR: createdFR.data.data._id,
                    mainCategory: particulars.mainCategory,
                    subCategory1: particulars.subCategory1,
                    subCategory2: particulars.subCategory2,
                    sanctionedAsPer: particulars.sanctionedAsPer,
                    sanctionedAmount: particulars.sanctionedAmount,
                    subCategory3: particulars.subCategory3,
                    quantity: particulars.quantity,
                    month: particulars.month,
                    unitPrice: particulars.unitPrice,
                    requestedAmount: particulars.requestedAmount,
                    narration: particulars.narration,
                    attachment: particulars.attachment,
                    applicationAttachment: particulars.applicationAttachment,
                    isUpcomingYear: Boolean(particulars.isUpcomingYear),
                    year: particulars.year,
                    applicationReferenceNo: particulars.applicationReferenceNo,
                    presidentSanctionAmt: particulars.presidentSanctionAmt,

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
      axios.post('/fr/remarks', { ...remark }, { headers: { ...getAuthHeader() } }),
      (remark) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      }),
    ),

  updateFRRequests: ( frID: string, frRequest?: CreatableFR) => {
    return getStandardResponse<FR>(
      new Promise((resolve, reject) => {
        axios
          .patch('/fr/' + frID, {
            ...frRequest,
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            try {
              if (frRequest?.particulars) {
                for (let i = 0; i < frRequest?.particulars.length; i++) {
                  const particulars = frRequest?.particulars[i];
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
                      narration: particulars?.narration,
                      sanctionedAsPer: particulars.sanctionedAsPer,
                      attachment: particulars.attachment,
                      applicationAttachment: particulars.applicationAttachment,
                      sanctionedAmount: particulars.sanctionedAmount,
                      year: particulars.year,
                      applicationReferenceNo: particulars.applicationReferenceNo,
                      presidentSanctionAmt: particulars.presidentSanctionAmt,

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
                      narration: particulars?.narration,
                      sanctionedAsPer: particulars.sanctionedAsPer,
                      attachment: particulars.attachment,
                      applicationAttachment: particulars.applicationAttachment,
                      sanctionedAmount: particulars.sanctionedAmount,

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
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
      }),
    );
  },
  updateFRRequestsCustom: (frID: string, frRequest: CreatableFR) => {
    return getStandardResponse<FR>(
      new Promise((resolve, reject) => {
        axios
          .patch('/fr/customEdit/' + frID, {
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
                      narration: particulars?.narration,
                      sanctionedAsPer: particulars.sanctionedAsPer,
                      attachment: particulars.attachment,
                      applicationAttachment: particulars.applicationAttachment,
                      sanctionedAmount: particulars.sanctionedAmount,

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
                      narration: particulars?.narration,
                      sanctionedAsPer: particulars.sanctionedAsPer,
                      attachment: particulars.attachment,
                      applicationAttachment: particulars.applicationAttachment,
                      sanctionedAmount: particulars.sanctionedAmount,

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
      (data) => ({
        ...data,
        FRdate: moment(data.FRdate),
        createdAt: moment(data.createdAt),
        updatedAt: moment(data.updatedAt),
      }),
    );
  },

  manageFRRequests: (frID: string, operation: string, frRequest: CreatableFR) => {
    return getStandardResponse<CreatableFR>(
      new Promise((resolve, reject) => {
        axios
          .patch('/fr/' + frID + '/' + operation, {
            ...frRequest,
          }, { headers: { ...getAuthHeader() } })
          .then(async (updatedFR) => {
            try {
              if (frRequest.particulars) {
                for (let i = 0; i < frRequest.particulars.length; i++) {
                  const particulars = frRequest.particulars[i];

                  await axios.patch(`/fr/particulars/${particulars._id}`, {
                    narration: particulars.narration,
                    sanctionedAsPer: particulars?.sanctionedAsPer,
                    sanctionedAmount: particulars?.sanctionedAmount,
                    presidentSanctionAmt: particulars?.presidentSanctionAmt,
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
  deleteFr: (frId: string) => getStandardResponse<number>(axios.delete('/fr/' + frId + '/force', { headers: { ...getAuthHeader() } })),
  getLogById: (fRId: string) =>
    getStandardResponse<ITransactionLog[]>(
      axios.get(`/fr/${fRId}/log`, { headers: { ...getAuthHeader() } }),
    ),
};
