/* eslint-disable @typescript-eslint/naming-convention */
import moment from 'moment';
import { dummyRequest, getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { resolve } from 'path';
import { rejects } from 'assert';

export default {
  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/iro/count', { params: conditions, headers: { ...getAuthHeader() } })),
  getCloseCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/iro/count/close', { params: conditions, headers: { ...getAuthHeader() } })),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAll: (conditions?: { status?: number }) => getStandardResponse<IROrder[]>(axios.get('/iro', { params: conditions, headers: { ...getAuthHeader() } })),
  getClosed: (conditions?: { status?: number }) => getStandardResponse<IROrder[]>(axios.get('/iro/close', { params: conditions, headers: { ...getAuthHeader() } })),

  // getAllRemarksById: (iroId: string) =>getStandardResponse<Remark[]>(axios.get(`/iro/${iroId}`)),

  getAllRemarksById: (iroId: string) =>
    getStandardResponse<Remark[]>(
      axios.get(`/iro/remarks/${iroId}`, { headers: { ...getAuthHeader() } }),
      (remarks) => remarks.map((remark:Remark) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      })),
    ),

  close: (IROId: string) => getStandardResponse<Application>(axios.patch(`/iro/${IROId}/close`, null, { headers: { ...getAuthHeader() } })),
  sendBack: (IROId: string) => getStandardResponse<Application>(axios.patch(`/iro/${IROId}/sendBack`, null, { headers: { ...getAuthHeader() } })),
  getPrintDetails: (IROId: string) => getStandardResponse<Application>(axios.get(`/iro/printDetails/${IROId}`)),


  // eslint-disable-next-line @typescript-eslint/naming-convention

  saveRelease: (iroID: string, IROrelease: Partial<IROrder>) =>
    getStandardResponse<IROrder>(
      new Promise((resolve, reject) => {
        axios
          .post(`/iro/releaseAmount/${iroID}`, {
            ...IROrelease,
            IROrelease: {
              modeOfPayment: IROrelease.ReleaseAmount?.modeOfPayment,
              releaseAmount: IROrelease.ReleaseAmount?.releaseAmount,
              transactionNumber: IROrelease.ReleaseAmount?.transactionNumber,
              transferredAmount: IROrelease.ReleaseAmount?.transferredAmount,
              IFSCCode: IROrelease.ReleaseAmount?.transferredBank.IFSCCode,
              accountNumber: IROrelease.ReleaseAmount?.transferredBank.accountNumber,
              bankName: IROrelease.ReleaseAmount?.transferredBank.bankName,
              beneficiary: IROrelease.ReleaseAmount?.beneficiary,
              transferredDate: IROrelease.ReleaseAmount?.transferredDate,
              branchName: IROrelease.ReleaseAmount?.branchName,
            },
          })
          .then(async (IROrelease) => {
            try {
              resolve(IROrelease);
            } catch (error) {
              reject(error);
            }
          });
      }),
    ),


  addRemarks: (remark: CreatableRemark) =>
    getStandardResponse<Remark>(
      axios.post('/iro/remarks', { ...remark }, { headers: { ...getAuthHeader() } } ),
      (remark) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      }),
    ),
};
