import axios from 'axios';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';

export default {
  /**
   * Retrieves all child records.
   * @return {Promise<StandardResponse<Child[]>>} A promise that resolves to the response containing the list of all child records.
   */
  getAll: (): Promise<StandardResponse<Child[]>> => getStandardResponse<Child[]>(axios.get('/workers/children/', { headers: { ...getAuthHeader() } })),

  /**
   * Creates a new child record.
   * @param {CreatableChild} child - The child record to be created.
   * @return {Promise<StandardResponse<Child>>} A promise that resolves to the response containing the created child record.
   */
  create: (child: CreatableChild): Promise<StandardResponse<Child>> => getStandardResponse<Child>(axios.post('/workers/children/', child, { headers: { ...getAuthHeader() } })),

  /**
   * Retrieves a child record by ID.
   * @param {string} childId - The ID of the child record to retrieve.
   * @return {Promise<StandardResponse<Child>>} A promise that resolves to the response containing the retrieved child record.
   */
  getById: (childId: string): Promise<StandardResponse<Child>> => getStandardResponse<Child>(axios.get(`/workers/children/${childId}`, { headers: { ...getAuthHeader() } })),

  /**
   * Edits a child record.
   * @param {CreatableChild} child - The child record to be edited.
   * @return {Promise<StandardResponse<Child>>} A promise that resolves to the response containing the edited child record.
   */
  edit: (child: CreatableChild): Promise<StandardResponse<Child>> => getStandardResponse<Child>(axios.patch(`/workers/children/${child._id}`, child, { headers: { ...getAuthHeader() } })),

  /**
   * Retrieves all child support records.
   * @return {Promise<StandardResponse<ChildSupport[]>>} A promise that resolves to the response containing the list of all child records.
   */
  getAllChildSupport: (): Promise<StandardResponse<ChildSupport[]>> => getStandardResponse<ChildSupport[]>(axios.get('/workers/childSupport/', { headers: { ...getAuthHeader() } })),

};
