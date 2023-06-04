import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<ILanguage[]>(
      axios.get('/settings/language/', { params: conditions }),
    ),
  create: (lang: CreatableLanguage) => getStandardResponse<ILanguage>(
    axios.post('/settings/language', lang),
  ),

  edit: (lang: CreatableLanguage) => getStandardResponse<ILanguage>(
    axios.patch(`/settings/language/${lang._id}`, lang)),

  delete: (languageId: string) => getStandardResponse<number>(
    axios.delete('/settings/language/' + languageId +'/force')),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/language/count', { params: conditions })),
};
