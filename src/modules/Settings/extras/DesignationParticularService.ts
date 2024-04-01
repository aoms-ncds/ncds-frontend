import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<IDesignationParticular[]>(
      axios.get('/settings/designationParticulars/', { headers: { ...getAuthHeader() } }),
    ),
  create: (designationParticulars: CreatableDesignationParticular) => getStandardResponse<IDesignationParticular>(
    axios.post('/settings/designationParticulars', designationParticulars, { headers: { ...getAuthHeader() } }),
  ),
  edit: (designationParticulars: CreatableDesignationParticular) => getStandardResponse<IDesignationParticular>(
    axios.patch(`/settings/designationParticulars/${designationParticulars._id}`, designationParticulars, { headers: { ...getAuthHeader() } })),

  delete: (designationParticularsId: string) => getStandardResponse<IDesignationParticular>(
    axios.delete(`/settings/designationParticulars/${designationParticularsId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: (conditions?: unknown) => getStandardResponse<number>(
    axios.get('/settings/designationParticulars/count', { params: conditions, headers: { ...getAuthHeader() } })),
};
