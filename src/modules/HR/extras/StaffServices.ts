import moment from 'moment';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  /**
   * Retrieves the count of staff members.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the count of staff members.
   */
  getCount: () => getStandardResponse<number>(axios.get('/hr/staffs/count', { headers: { ...getAuthHeader() } })),

  /**
   * Creates a new staff member.
   * @param {CreatableStaff} staff - The staff member to be created.
   * @param {File|undefined} userPhoto - The worker to be created.
   *  @return {Promise<StandardResponse<Staff>>} A promise that resolves to the response containing the created staff member.
   */
  create: (staff: CreatableStaff, userPhoto: File | undefined) =>
    getStandardResponse<Staff>(axios.post('/hr/staffs', { staff, image: userPhoto }, { headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' } })),

  createPMADeduction: (option:any) =>
    getStandardResponse<Staff>(axios.post('/hr/staffs/addPmaDeduction', option, { headers: { ...getAuthHeader() } })),
  getPMADeduction: () =>
    getStandardResponse<any>(axios.get('/hr/staffs/getPmaDeduction', { headers: { ...getAuthHeader() } })),

  /**
   * Edits a staff member.
   * @param {CreatableNewUser} staff - The staff member to be edited.
   * @param {File|undefined} userPhoto - The worker to be created.
  * @return {Promise<StandardResponse<Staff>>} A promise that resolves to the response containing the edited staff member.
   */
  edit: (staff: CreatableStaff, userPhoto: File | undefined): Promise<StandardResponse<Staff>> =>
    getStandardResponse<Staff>(axios.patch(`/hr/staffs/${staff._id}`, { staff, image: userPhoto }, { headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' } })),
  editPmaDeduction: (data:any, id:number): Promise<StandardResponse<Staff>> =>
    getStandardResponse<Staff>(axios.patch(`/hr/staffs/addPmaDeduction/${id}`, data, { headers: { ...getAuthHeader() } })),

  /**
   * Deletes a staff member.
   * @param {string} staffId - The ID of the staff member to be deleted.
   * @return {Promise<StandardResponse<Staff[]>>} A promise that resolves to the response containing the updated list of staff members.
   */
  delete: (staffId: string) => getStandardResponse<Staff[]>(axios.delete(`/hr/staffs/${staffId}`, { headers: { ...getAuthHeader() } })),

  deletePma: (id: string) => getStandardResponse<Staff[]>(axios.delete(`/hr/staffs/pmaDeduction/${id}`, { headers: { ...getAuthHeader() } })),

  /**
   * Retrieves all staff members.
   * @return {Promise<StandardResponse<Staff[]>>} A promise that resolves to the response containing the list of all staff members.
   */
  getAll: (): Promise<StandardResponse<Staff[]>> =>
    getStandardResponse<Staff[]>(axios.get('/hr/staffs', { headers: { ...getAuthHeader() } }), (staffs) =>
      staffs.map((staff: any) => ({
        ...staff,
        token: [],
        basicDetails: {
          ...staff.basicDetails,
          dateOfBirth: moment(staff.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...staff.officialDetails,
          dateOfJoining: moment(staff.basicDetails.dateOfJoining),
        },
        createdAt: moment(staff.createdAt),
        updatedAt: moment(staff.updatedAt),
      })),
    ),

  /**
   * Retrieves a staff member by ID.
   * @param {string} staffId - The ID of the staff member to retrieve.
   * @return {Promise<StandardResponse<Staff|null>>} A promise that resolves to the response containing the retrieved staff member or null if not found.
   */
  getById: (staffId: string): Promise<StandardResponse<Staff | null>> =>
    getStandardResponse<Staff | null>(axios.get(`/hr/staffs/${staffId}`, { headers: { ...getAuthHeader() } }), (data) => ({
      ...data,
      basicDetails: {
        ...data.basicDetails,
        // gender: data.basicDetails.gender as Gender|undefined,
        // martialStatus: data.basicDetails.martialStatus as Gender|undefined,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: data.officialDetails.dateOfJoining ? moment(data.officialDetails.dateOfJoining) : undefined,
        dateOfLeaving: data.officialDetails.dateOfLeaving ? moment(data.officialDetails.dateOfLeaving) : undefined,
        divisionHistory: data.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
          ...divHis,
          dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
          dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
        })),
      },
      insurance: {
        ...data.insurance,
        dojInsurance: data.insurance?.dojInsurance ? moment(data.insurance.dojInsurance) : undefined,
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  activate: (id: string) => getStandardResponse<Staff>(axios.patch(`/hr/staffs/${id}/activate`, { headers: { ...getAuthHeader() } })),
  // deactivate: (id: string) => getStandardResponse<Staff>(axios.patch(`/hr/staffs/${id}/deactivate`, { headers: { ...getAuthHeader() } })),

  deactivate: (id: string, reason: string) => getStandardResponse<Staff>(
    axios.patch(`/hr/staffs/${id}/deactivate`, { reason }, { headers: { ...getAuthHeader() } })),

  getLogById: (id: string) =>
    getStandardResponse<IUserUpdateLog[]>(
      axios.get(`/workers/${id}/log`, { headers: { ...getAuthHeader() } }),
    ),

};
