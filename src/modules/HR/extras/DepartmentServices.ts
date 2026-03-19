import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/departments/count/', { headers: { ...getAuthHeader() } })),
  getAll: () => getStandardResponse<Department[]>(axios.get('/hr/departments/', { headers: { ...getAuthHeader() } })),
};
