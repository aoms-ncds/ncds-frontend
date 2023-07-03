import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<IDesignation[]>(
      axios.get('/settings/designation/', { params: conditions, headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<IDesignation>(
    axios.post('/settings/designation', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<IDesignation>(
    axios.patch(`/settings/designation/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/designation/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/designation/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
