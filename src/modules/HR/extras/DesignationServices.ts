import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { Designation } from './DesignationTypes';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/departments/count')),
  getAll: () => getStandardResponse<Designation[]>(axios.get('/hr/departments/')),
};
