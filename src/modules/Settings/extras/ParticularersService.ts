import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<ISanctionedAsPer[]>(
      axios.get('/settings/particulars/', { headers: { ...getAuthHeader() } }),
    ),
  create: (data: MainCategory) => getStandardResponse<MainCategory>(
    axios.post('/settings/particulars', data, { headers: { ...getAuthHeader() } }),
  ),
  edit: (reason: MainCategory) => getStandardResponse<ISanctionedAsPer>(
    axios.patch(`/settings/particulars/${reason._id}`, reason, { headers: { ...getAuthHeader() } })),

  delete: (id: string) => getStandardResponse<number>(
    axios.delete(`/settings/particulars/${id}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/particulars/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
