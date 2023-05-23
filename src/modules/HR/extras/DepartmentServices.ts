import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { Department } from './DepartmentTypes';

export default {
  getCount: () => getStandardResponse<number>(axios.get('/hr/departments/count')),
  getAll: () => getStandardResponse<Department[]>(axios.get('/hr/departments/')),
};
