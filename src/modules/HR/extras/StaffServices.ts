import moment from 'moment';
import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  /**
   * Retrieves the count of staff members.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the count of staff members.
   */
  getCount: () => getStandardResponse<number>(axios.get('/hr/staffs/count')),

  /**
   * Creates a new staff member.
   * @param {CreatableStaff} staff - The staff member to be created.
   * @return {Promise<StandardResponse<Staff>>} A promise that resolves to the response containing the created staff member.
   */
  create: (staff: CreatableStaff) => getStandardResponse<Staff>(axios.post('/hr/staffs', staff)),

  /**
   * Edits a staff member.
   * @param {CreatableNewUser} staff - The staff member to be edited.
   * @return {Promise<StandardResponse<Staff>>} A promise that resolves to the response containing the edited staff member.
   */
  edit: (staff: CreatableStaff): Promise<StandardResponse<Staff>> => getStandardResponse<Staff>(axios.patch(`/hr/staffs/${staff._id}`, staff)),

  /**
   * Deletes a staff member.
   * @param {string} staffId - The ID of the staff member to be deleted.
   * @return {Promise<StandardResponse<Staff[]>>} A promise that resolves to the response containing the updated list of staff members.
   */
  delete: (staffId: string) => getStandardResponse<Staff[]>(axios.delete(`/hr/staffs/${staffId}`)),

  /**
   * Retrieves all staff members.
   * @return {Promise<StandardResponse<Staff[]>>} A promise that resolves to the response containing the list of all staff members.
   */
  getAll: (): Promise<StandardResponse<Staff[]>> =>
    getStandardResponse<Staff[]>(axios.get('/hr/staffs'), (staffs) =>
      staffs.map((staff: any) => ({
        ...staff,
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
  getById: (staffId: string) =>
    getStandardResponse<Staff | null>(axios.get(`/hr/staffs/${staffId}`), (data) => ({
      ...data,
      basicDetails: {
        ...data.basicDetails,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: moment(data.basicDetails.dateOfJoining),
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  activate: (id: string) => getStandardResponse<Staff>(axios.patch(`/hr/staffs/${id}/activate`)),
  deactivate: (id: string) => getStandardResponse<Staff>(axios.patch(`/hr/staffs/${id}/deactivate`)),
};
