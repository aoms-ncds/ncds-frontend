import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/designations/count')),
  getAll: () => getStandardResponse<Designation[]>(axios.get('/hr/designations/')),
};
