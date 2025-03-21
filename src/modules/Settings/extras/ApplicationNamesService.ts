import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {
  getAll: () =>
    getStandardResponse<any[]>(
      axios.get('/settings/applicationSettings/', { headers: { ...getAuthHeader() } }),
    ),

  create: (gender: any) => getStandardResponse<any>(
    axios.post('/settings/applicationSettings', gender, { headers: { ...getAuthHeader() } }),
  ),

  edit: (gender: any) => getStandardResponse<any>(
    axios.patch(`/settings/applicationSettings/${gender._id}`, gender, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/applicationSettings/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/gender/count', { params: conditions, headers: { ...getAuthHeader() } })),


};
