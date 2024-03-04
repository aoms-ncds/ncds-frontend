import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<IReason[]>(
      axios.get('/settings/deactivationReason/', { headers: { ...getAuthHeader() } }),
    ),
  create: (reason: CreatableReason) => getStandardResponse<IReason>(
    axios.post('/settings/deactivationReason', reason, { headers: { ...getAuthHeader() } }),
  ),
  edit: (reason: CreatableReason) => getStandardResponse<IReason>(
    axios.patch(`/settings/deactivationReason/${reason._id}`, reason, { headers: { ...getAuthHeader() } })),

  delete: (reasonId: string) => getStandardResponse<number>(
    axios.delete(`/settings/deactivationReason/${reasonId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/deactivationReason/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
