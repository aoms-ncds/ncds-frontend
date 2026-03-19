import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: () =>
    getStandardResponse<ILeaderDetails[]>(
      axios.get('/settings/leaderDetails/', { headers: { ...getAuthHeader() } }),
    ),
  create: (leaders: CreatableLeaderDetails) => getStandardResponse<ILeaderDetails>(
    axios.post('/settings/leaderDetails', leaders, { headers: { ...getAuthHeader() } }),
  ),

  edit: (leaders: CreatableLeaderDetails) => getStandardResponse<ILeaderDetails>(
    axios.patch(`/settings/leaderDetails/${leaders._id}`, leaders, { headers: { ...getAuthHeader() } })),

  delete: (paymentMethId: string) => getStandardResponse<number>(
    axios.delete(`/settings/leaderDetails/${paymentMethId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: () => getStandardResponse<number>(
    axios.get('/settings/leaderDetails/count', { headers: { ...getAuthHeader() } })),
};
