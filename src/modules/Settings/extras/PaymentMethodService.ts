import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatablePaymentMethod, IPaymentMethod } from './LanguageTypes';
export default {

  getAll: () =>
    getStandardResponse<IPaymentMethod[]>(
      axios.get('/settings/paymentMethod/', { headers: { ...getAuthHeader() } }),
    ),
  create: (paymentMeth: CreatablePaymentMethod) => getStandardResponse<IPaymentMethod>(
    axios.post('/settings/paymentMethod', paymentMeth, { headers: { ...getAuthHeader() } }),
  ),

  edit: (paymentMeth: CreatablePaymentMethod) => getStandardResponse<IPaymentMethod>(
    axios.patch(`/settings/paymentMethod/${paymentMeth._id}`, paymentMeth, { headers: { ...getAuthHeader() } })),

  delete: (paymentMethId: string) => getStandardResponse<number>(
    axios.delete(`/settings/paymentMethod/${paymentMethId}/force`, { headers: { ...getAuthHeader() } })),

  getCount: () => getStandardResponse<number>(
    axios.get('/settings/paymentMethod/count', { headers: { ...getAuthHeader() } })),
};
