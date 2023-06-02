import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<ILanguage[]>(
      axios.get('/Settings/language/', { params: conditions }),
    ),


};
