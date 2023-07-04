import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/designations/count/', { headers: { ...getAuthHeader() } })),
  getAll: () => getStandardResponse<IDesignation[]>(axios.get('/hr/designations/', { headers: { ...getAuthHeader() } })),
};
