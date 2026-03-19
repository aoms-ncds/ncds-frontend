import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<[]>(
      axios.get('/settings/sanctionedAsPer/', { headers: { ...getAuthHeader() } }),
    ),
  create: (reason: CreatableSanctionedAsPer) => getStandardResponse<ISanctionedAsPer>(
    axios.post('/settings/sanctionedAsPer', reason, { headers: { ...getAuthHeader() } }),
  ),
  edit: (reason: CreatableSanctionedAsPer) => getStandardResponse<ISanctionedAsPer>(
    axios.patch(`/settings/sanctionedAsPer/${reason._id}`, reason, { headers: { ...getAuthHeader() } })),

  delete: (reasonId: string) => getStandardResponse<number>(
    axios.delete(`/settings/sanctionedAsPer/${reasonId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/sanctionedAsPer/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
