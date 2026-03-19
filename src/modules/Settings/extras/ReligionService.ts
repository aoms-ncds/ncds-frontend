import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { IReligion, CreatableReligion } from './LanguageTypes';
export default {

  getAll: () =>
    getStandardResponse<IReligion[]>(
      axios.get('/settings/religion/', { headers: { ...getAuthHeader() } }),
    ),
  create: (religion: CreatableReligion) => getStandardResponse<IReligion>(
    axios.post('/settings/religion', religion, { headers: { ...getAuthHeader() } }),
  ),

  edit: (religion: CreatableReligion) => getStandardResponse<IReligion>(
    axios.patch(`/settings/religion/${religion._id}`, religion, { headers: { ...getAuthHeader() } })),

  delete: (religionId: string) => getStandardResponse<number>(
    axios.delete(`/settings/religion/${religionId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: () => getStandardResponse<number>(
    axios.get('/settings/religion/count', { headers: { ...getAuthHeader() } })),
};
