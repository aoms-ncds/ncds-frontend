<<<<<<< HEAD
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { IGender, CreatableGender } from './LanguageTypes';
export default {
  getAll: () =>
    getStandardResponse<IGender[]>(
      axios.get('/settings/gender/', { headers: { ...getAuthHeader() } }),
    ),

  create: (gender: CreatableGender) => getStandardResponse<IGender>(
    axios.post('/settings/gender', gender, { headers: { ...getAuthHeader() } }),
  ),

  edit: (gender: CreatableGender) => getStandardResponse<IGender>(
    axios.patch(`/settings/gender/${gender._id}`, gender, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/gender/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/gender/count', { params: conditions, headers: { ...getAuthHeader() } })),


};
=======
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { IGender, CreatableGender } from './LanguageTypes';
export default {
  getAll: () =>
    getStandardResponse<IGender[]>(
      axios.get('/settings/gender/', { headers: { ...getAuthHeader() } }),
    ),

  create: (gender: CreatableGender) => getStandardResponse<IGender>(
    axios.post('/settings/gender', gender, { headers: { ...getAuthHeader() } }),
  ),

  edit: (gender: CreatableGender) => getStandardResponse<IGender>(
    axios.patch(`/settings/gender/${gender._id}`, gender, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete(`/settings/gender/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/gender/count', { params: conditions, headers: { ...getAuthHeader() } })),


};
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
