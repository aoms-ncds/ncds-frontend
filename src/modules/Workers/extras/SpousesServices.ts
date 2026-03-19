import axios from 'axios';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import moment from 'moment';

export default {
  /**
   * Retrieves all spouse records.
   * @return {Promise<StandardResponse<Spouse[]>>} A promise that resolves to the response containing the list of all spouse records.
   */
  // getAll: () => getStandardResponse<Spouse[]>(axios.get('/workers/spouse/', { headers: { ...getAuthHeader() } })),


  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<Spouse[]>(axios.get('/workers/spouse/', { params: conditions, headers: { ...getAuthHeader() } }), (spouse) =>
      spouse.map((spouse: Spouse) => ({
        ...spouse,
        dateOfBirth: spouse.dateOfBirth ? moment(spouse.dateOfBirth) : undefined,
        ProfileAddedOn: spouse.ProfileAddedOn ? moment(spouse.ProfileAddedOn) : undefined,
        createdAt: moment(spouse.createdAt),
        updatedAt: moment(spouse.updatedAt),
      })),
    ),
  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/workers/spouse/count', { params: conditions, headers: { ...getAuthHeader() } })),

  /**
   * Creates a new spouse record.
   * @param {Spouse} spouse - The spouse record to be created.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the result of the creation.
   */
  create: (spouse: CreatableSpouse) => getStandardResponse<number>(axios.post('/workers/spouses', spouse, { headers: { ...getAuthHeader() } })),

  /**
   * Edits a spouse record.
   * @param {CreatableSpouse} spouse - The spouse record to be edited.
   * @return {Promise<StandardResponse<Spouse>>} A promise that resolves to the response containing the edited spouse record.
   */
  edit: (spouse: CreatableSpouse) => getStandardResponse<Spouse>(axios.patch(`/workers/spouses/${spouse._id}`, spouse, { headers: { ...getAuthHeader() } })),

  /**
   * Retrieves a spouse record by ID.
   * @param {string} spouseId - The ID of the spouse record to retrieve.
   * @return {Promise<StandardResponse<CreatableSpouse>>} A promise that resolves to the response containing the retrieved spouse record.
   */
  getById: (spouseId: string) => getStandardResponse<CreatableSpouse>(axios.get(`/workers/spouses/${spouseId}`, { headers: { ...getAuthHeader() } })),

  /**
   * Deletes a spouse record.
   * @param {string} spouseId - The ID of the spouse record to delete.
   * @return {Promise<StandardResponse<CreatableSpouse>>} A promise that resolves to the response containing the result of the deletion.
   */
  delete: (spouseId: string) => getStandardResponse<CreatableSpouse>(axios.delete(`/workers/spouses/${spouseId}`, { headers: { ...getAuthHeader() } })),
};
