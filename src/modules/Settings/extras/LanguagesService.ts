import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { ILanguage, CreatableLanguage } from './LanguageTypes';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<ILanguage[]>(
      axios.get('/settings/language/', { params: conditions, headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<ILanguage>(
    axios.post('/settings/language', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<ILanguage>(
    axios.patch(`/settings/language/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/language/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/language/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
