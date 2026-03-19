import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {

  getAll: (dateRange:DateRange) =>
    getStandardResponse<ITransactionLog[]>(
      axios.get('/settings/transactionLogs/', { params: dateRange, headers: { ...getAuthHeader() } }),
    ),
  deleteLog: (dateRange:DateRange) =>
    getStandardResponse<ITransactionLog[]>(
      axios.delete('/settings/transactionLogs/', { params: dateRange, headers: { ...getAuthHeader() } }),
    ),
};
