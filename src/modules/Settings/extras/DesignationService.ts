import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatableLanguage } from './LanguageTypes';
export default {

  getAll: () =>
    getStandardResponse<IDesignation[]>(
      axios.get('/hr/designations', { headers: { ...getAuthHeader() } }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<IDesignation>(
    axios.post('/hr/designations', lang, { headers: { ...getAuthHeader() } }),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<IDesignation>(
    axios.patch(`/hr/designations/${lang._id}`, lang, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/hr/designations/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: () => getStandardResponse<number>(
    axios.get('/hr/designations/count', { headers: { ...getAuthHeader() } })),
};
