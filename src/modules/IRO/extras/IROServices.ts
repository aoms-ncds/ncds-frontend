/* eslint-disable @typescript-eslint/naming-convention */
import moment from 'moment';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import ReleaseAmount from '../ReleaseAmount';

export default {
  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/iro/count', { params: conditions, headers: { ...getAuthHeader() } })),
  getCloseCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/iro/count/close', { params: conditions, headers: { ...getAuthHeader() } })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  getAll: (conditions?: { status?: number; sanctionedBank?: string }): Promise<StandardResponse<IROrder[]>> =>
    getStandardResponse<IROrder[]>(axios.get('/iro', { params: conditions, headers: { ...getAuthHeader() } }), (IROrders: IROrder[]) =>
      IROrders.map((IRO) => ({
        ...IRO,
        IRODate: moment(IRO.IRODate),
        createdAt: moment(IRO.createdAt),
        updatedAt: moment(IRO.updatedAt),
        releaseAmount: IRO.releaseAmount ? {
          ...IRO.releaseAmount,
          transferredDate: moment(IRO.releaseAmount?.transferredDate),
        }:undefined,
      })),
    ),

  getById: (IROId: string) =>
    getStandardResponse<IROrder>(axios.get(`/iro/${IROId}`, { headers: { ...getAuthHeader() } }), (data) => ({
      ...data,
      IRODate: moment(data.IRODate),
      releaseAmount: {
        ...data.releaseAmount,
        transferredDate: data.releaseAmount?.transferredDate ? moment(data.transferredDate) : null,

      },
      purposeWorker: {
        ...data.createdBy,
        basicDetails: {
          ...data.createdBy.basicDetails,
          // gender: data.createdBy.basicDetails.gender as Gender|undefined,
          // martialStatus: data.createdBy.basicDetails.martialStatus as Gender|undefined,
          dateOfBirth: moment(data.createdBy.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...data.createdBy.officialDetails,
          dateOfJoining: data.createdBy.officialDetails.dateOfJoining ? moment(data.createdBy.officialDetails.dateOfJoining) : undefined,
          dateOfLeaving: data.createdBy.officialDetails.dateOfLeaving ? moment(data.createdBy.officialDetails.dateOfLeaving) : undefined,
          divisionHistory: data.createdBy.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
            ...divHis,
            dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
            dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
          })),
        },
        createdAt: moment(data.createdBy.createdAt),
        updatedAt: moment(data.createdBy.updatedAt),
      },
      createdBy: {
        ...data.createdBy,
        basicDetails: {
          ...data.createdBy.basicDetails,
          // gender: data.createdBy.basicDetails.gender as Gender|undefined,
          // martialStatus: data.createdBy.basicDetails.martialStatus as Gender|undefined,
          dateOfBirth: moment(data.createdBy.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...data.createdBy.officialDetails,
          dateOfJoining: data.createdBy.officialDetails.dateOfJoining ? moment(data.createdBy.officialDetails.dateOfJoining) : undefined,
          dateOfLeaving: data.createdBy.officialDetails.dateOfLeaving ? moment(data.createdBy.officialDetails.dateOfLeaving) : undefined,
          divisionHistory: data.createdBy.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
            ...divHis,
            dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
            dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
          })),
        },
        signature: {
          ...data.signature,
          hrSignature: data.signature?.hrSignature ? data.signature.hrSignature: undefined,
          accountManagerSignature: data.signature?.accountManagerSignature ? data.signature.accountManagerSignature : undefined,
          accountantSignature: data.signature?.accountantSignature ? data.signature.accountantSignature : undefined,


        },
        createdAt: moment(data.createdBy.createdAt),
        updatedAt: moment(data.createdBy.updatedAt),
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  sendNotifications: (name: string, id: string) => getStandardResponse<void>(axios.post(`/iro/sent/${name}/${id}`, null, { headers: { ...getAuthHeader() } })),

  getReconciliation: (conditions?: {sanctionedBank?: string }) => getStandardResponse<IROrder[]>(axios.get('/iro/reconciliation',
    { params: conditions, headers: { ...getAuthHeader() } }), (IROrders: IROrder[]) =>
    IROrders.map((IRO) => ({
      ...IRO,
      IRODate: moment(IRO.IRODate),
      createdAt: moment(IRO.createdAt),
      updatedAt: moment(IRO.updatedAt),
    }))),
  getReconciliationCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/iro/count/reconciliation', { params: conditions, headers: { ...getAuthHeader() } })),
  // getAllRemarksById: (iroId: string) =>getStandardResponse<Remark[]>(axios.get(`/iro/${iroId}`)),

  getAllRemarksById: (iroId: string) =>
    getStandardResponse<Remark[]>(axios.get(`/iro/remarks/${iroId}`, { headers: { ...getAuthHeader() } }), (remarks) =>
      remarks.map((remark: Remark) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      })),
    ),

  reconciliationCompleted: (IROId: string) => getStandardResponse<void>(axios.patch(`/iro/${IROId}/reconciliation_complete`, null, { headers: { ...getAuthHeader() } })),
  close: (IROId: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IROId}/close`, null, { headers: { ...getAuthHeader() } })),
  sendBack: (IROId: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IROId}/sendBack`, null, { headers: { ...getAuthHeader() } })),
  getPrintDetails: (IROId: string) => getStandardResponse<IROrder>(axios.get(`/iro/printDetails/${IROId}`)),


  updateIRO: (IROId:string, IRORequest: IROrder)=>{
    console.log('🚀 ~ file: IROServices.ts:142 ~ IROId:', IROId);
    return getStandardResponse<IROrder>(
      new Promise((resolve, reject) => {
        axios
        .patch('/iro/' + IROId, {
          ...IRORequest,
        }, { headers: { ...getAuthHeader() } })
        .then(async (updatedIRO) => {
          resolve(updatedIRO);
        })
        .catch(reject);
      }),
    );
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention

  releaseAmount: (iros:IROrder[], releaseAmount: IReleaseAmount) =>
    getStandardResponse<IROrder>(
      new Promise((resolve, reject) => {
        axios
          .post('/iro/release_amount', {
            releaseAmount, iros,
          }, { headers: { ...getAuthHeader() } })
          .then(async (releaseAmount) => {
            try {
              resolve(releaseAmount);
            } catch (error) {
              reject(error);
            }
          });
      }),
    ),

  getReleaseAmountById: (id: string) =>
    getStandardResponse<IReleaseAmount>(axios.get(`/iro/release_amount/${id}`, { headers: { ...getAuthHeader() } }), (releaseAmount)=>({
      ...releaseAmount,
      IRO: releaseAmount.IRO.map((iro:IROrder) => ({
        ...iro,
        IRODate: moment(iro.IRODate),
        createdAt: moment(iro.createdAt),
        updatedAt: moment(iro.updatedAt),
      })),
      transferredDate: moment(releaseAmount?.transferredDate),
    })),

  addRemarks: (remark: CreatableRemark) =>
    getStandardResponse<Remark>(axios.post('/iro/remarks', { ...remark }, { headers: { ...getAuthHeader() } }), (remark) => ({
      ...remark,
      createdAt: moment(remark.createdAt),
      updatedAt: moment(remark.updatedAt),
    })),

  officeManagerApprove: (IroID: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IroID}/officeManagerApprove`, null, { headers: { ...getAuthHeader() } })),
  accountManagerApprove: (IroID: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IroID}/accountManagerApprove`, null, { headers: { ...getAuthHeader() } })),
  reject: (IroID: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IroID}/rejected`, null, { headers: { ...getAuthHeader() } })),
  // submit: (IroID: string) => getStandardResponse<IROrder>(axios.patch(`/iro/${IroID}/submit`, null, { headers: { ...getAuthHeader() } })),
};
