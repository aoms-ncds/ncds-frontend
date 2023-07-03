import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<ChildSupport[]>(
      axios.get('/childSupport', { params: conditions, headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<ChildSupport>(
    axios.post('/settings/designation', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<ChildSupport>(
    axios.patch(`/settings/designation/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/designation/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/designation/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
