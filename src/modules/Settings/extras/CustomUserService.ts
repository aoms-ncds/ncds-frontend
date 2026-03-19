import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatableCustomUsers, ICustomUsers } from './LanguageTypes';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<ICustomUsers[]>(
      axios.get('/settings/customUser/', { params: conditions, headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableCustomUsers) => getStandardResponse<ICustomUsers>(
    axios.post('/settings/customUser', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableCustomUsers) => getStandardResponse<ICustomUsers>(
    axios.patch(`/settings/customUser/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/customUser/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/customUser/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
