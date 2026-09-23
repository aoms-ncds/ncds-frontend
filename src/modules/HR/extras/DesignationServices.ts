<<<<<<< HEAD
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/designations/count/', { headers: { ...getAuthHeader() } })),
  getAll: () => getStandardResponse<IDesignation[]>(axios.get('/hr/designations/', { headers: { ...getAuthHeader() } })),
};
=======
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/designations/count/', { headers: { ...getAuthHeader() } })),
  getAll: () => getStandardResponse<IDesignation[]>(axios.get('/hr/designations/', { headers: { ...getAuthHeader() } })),
};
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
