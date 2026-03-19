import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatableLanguage, IChildSupport } from './LanguageTypes';
export default {

  getAll: () =>
    getStandardResponse<IChildSupport[]>(
      axios.get('/workers/childSupport', { headers: { ...getAuthHeader() } }),
    ),

  // edithildAgeLimit: (data: number | undefined) => getStandardResponse<number>(
  //   axios.post('/workers/editChaildAgeLimit', data, { headers: { ...getAuthHeader() } })),

  edithildAgeLimit: (data: number) => getStandardResponse<number>(
    axios.patch('/workers/childSupport/editChaildAgeLimit', { age: data }, { headers: { ...getAuthHeader() } }),
  ),
  getAge: () => getStandardResponse<{ age: number }>(
    axios.get('/workers/childSupport/getAge', { headers: { ...getAuthHeader() } }),
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
