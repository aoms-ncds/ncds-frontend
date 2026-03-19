import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<Department[]>(
      axios.get('/hr/departments', { headers: { ...getAuthHeader() } }),
    ),
  create: (dept: CreatableDepartment) => getStandardResponse<Department>(
    axios.post('/hr/departments', dept, { headers: { ...getAuthHeader() } }),
  ),

  edit: (dept: CreatableDepartment) => getStandardResponse<Department>(
    axios.patch(`/hr/departments/${dept._id}`, dept, { headers: { ...getAuthHeader() } })),

  delete: (languageId: string) => getStandardResponse<Department>(
    axios.delete(`/hr/departments/${languageId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: () => getStandardResponse<Department>(
    axios.get('/hr/departments/count', { headers: { ...getAuthHeader() } })),
};
