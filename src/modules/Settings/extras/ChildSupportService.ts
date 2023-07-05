import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<IChildSupport[]>(
      axios.get('/workers/childSupport', { headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<IChildSupport>(
    axios.post('/workers/childSupport', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<IChildSupport>(
    axios.patch(`/workers/childSupport/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/workers/childSupport/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/workers/childSupport/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
