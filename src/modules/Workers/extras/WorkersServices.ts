import moment from 'moment';
import { getStandardResponse, getAuthHeader } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {
  /**
   * Retrieves the count of workers.
   * @param {unknown|null} conditions - Count based on a filter condition
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the count of workers.
   */
  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/workers/count', { params: conditions, headers: { ...getAuthHeader() } })),
  recentActivity: (conditions?: unknown) => getStandardResponse<number>(axios.get('/workers/recentActivity', { params: conditions, headers: { ...getAuthHeader() } })),

  /**
   * Creates a new worker.
   * @param {CreatableIWorker} worker - The worker to be created.
   * @param {File|undefined} userPhoto - The worker to be created.
   * @param {File|undefined} childPhoto - The worker to be created.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the created worker.
   */
  create: (worker: CreatableIWorker, userPhoto: File | undefined, childPhoto: { id: string; childPhoto: File | null }[]) => {
    const formData = new FormData();

    // Add the user photo
    if (userPhoto) {
      formData.append('image', userPhoto);
    }

    // Add each child photo with its corresponding ID
    childPhoto.forEach((cp, index) => {
      if (cp.childPhoto) {
        formData.append('image1', cp.childPhoto);
        formData.append(`childImageIds[${index}]`, cp.id);
      }
    });

    // Add the worker details as a JSON string
    formData.append('worker', JSON.stringify(worker));

    return getStandardResponse<IWorker>(axios.post('/workers', formData,
      { headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' } }));
  },

  /**
   * Edits a worker.
   * @param {CreatableIWorker} worker - The worker to be edited.
   * @param {File|undefined} userPhoto - The worker to be created.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the edited worker.
   */

  edit: (worker: CreatableIWorker, userPhoto: File | undefined, childPhoto: { id: string; childPhoto: File | null }[]) => {
    const formData = new FormData();

    // Add the user photo
    if (userPhoto) {
      formData.append('image', userPhoto);
    }

    // Add each child photo with its corresponding ID
    childPhoto.forEach((cp, index) => {
      if (cp.childPhoto) {
        formData.append('image1', cp.childPhoto);
        formData.append(`childImageIds[${index}]`, cp.id);
      }
    });

    // Add the worker details as a JSON string
    formData.append('worker', JSON.stringify(worker));

    return getStandardResponse<IWorker>(axios.patch(`/workers/${worker._id}`,
      formData,
      { headers: { ...getAuthHeader(), 'Content-Type': 'multipart/form-data' } }));
  },

  /**
   * Deletes a worker.
   * @param {string} workerId - The ID of the worker to be deleted.
   * @return {Promise<StandardResponse<void>>} A promise that resolves to the response containing the result of the deletion.
   */
  delete: (workerId: string) => getStandardResponse<void>(axios.delete(`/workers/${workerId}`, { headers: { ...getAuthHeader() } })),

  getWorkersByDivision: () => getStandardResponse<IWorker[]>(axios.get('/workers/division', { headers: { ...getAuthHeader() } })),

  getSubDivisionsByDivisionId: () => getStandardResponse<SubDivision[]>(axios.get('/workers/sub_divisions/', { headers: { ...getAuthHeader() } })),

  getWorkersBySubDivision: (conditions?: { division: string; subDiv: string; designationParticular?: string | null }) =>
    getStandardResponse<IWorker[]>(axios.get(`/workers/sub_divisions/${conditions?.subDiv}`,
      { params: conditions, headers: { ...getAuthHeader() } })),

  getWorkersByDesignation: (conditions?: { division: string; designationParticular: string }) =>
    getStandardResponse<IWorker[]>(axios.get('/workers/designation_particular',
      { params: conditions, headers: { ...getAuthHeader() } })),

  /**
   * Retrieves all workers based on optional conditions.
   * @param {Object} conditions - Optional conditions to filter the workers (e.g., status).
   * @param {number} conditions.status - The status of the workers.
   * @return {Promise<StandardResponse<IWorker[]>>} A promise that resolves to the response containing the list of all workers.
   */
  getAll: (conditions?: { status?: number; division?: string; withoutCoordinator?: boolean; withoutSubDivision?: boolean }): Promise<StandardResponse<IWorker[]>> =>
    getStandardResponse<IWorker[]>(axios.get('/workers/', { params: conditions, headers: { ...getAuthHeader() } }), (workers) =>
      workers.map((worker: IWorker) => {
        return ({
          ...worker,
          tokens: [],
          basicDetails: {
            ...worker.basicDetails,
            dateOfBirth: moment(worker.basicDetails.dateOfBirth),
          },
          officialDetails: {
            ...worker.officialDetails,
            dateOfJoining: worker.officialDetails.dateOfJoining ? moment(worker.officialDetails.dateOfJoining) : undefined,
            divisionHistory: worker.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
              ...divHis,
              dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
              dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
            })),
          },
          supportStructure: {
            ...worker.supportStructure,
            disabledFrom: worker.supportStructure?.disabledFrom ? moment(worker.supportStructure?.disabledFrom) : undefined,
            disabledTo: worker.supportStructure?.disabledTo ? moment(worker.supportStructure?.disabledTo) : undefined,
          },
          createdAt: moment(worker.createdAt),
          updatedAt: moment(worker.updatedAt),
        });
      }),
    ),
  getWorkers: (conditions?: { status?: number; division?: string; skip?: number; limit?: number }) =>
    getStandardResponse<IWorker[]>(axios.get('/workers/fetchWorker', { params: conditions, headers: { ...getAuthHeader() } }), (workers) =>
      workers.map((worker: IWorker) => ({
        ...worker,
        tokens: [],
        basicDetails: {
          ...worker.basicDetails,
          dateOfBirth: moment(worker.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...worker.officialDetails,
          dateOfJoining: worker.officialDetails.dateOfJoining ? moment(worker.officialDetails.dateOfJoining) : undefined,
          divisionHistory: worker.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
            ...divHis,
            dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
            dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
          })),
        },
        supportStructure: {
          ...worker.supportStructure,
          disabledFrom: worker.supportStructure?.disabledFrom ? moment(worker.supportStructure?.disabledFrom) : undefined,
          disabledTo: worker.supportStructure?.disabledTo ? moment(worker.supportStructure?.disabledTo) : undefined,
        },
        createdAt: moment(worker.createdAt),
        updatedAt: moment(worker.updatedAt),
      })),
    ),
  getWorkerBySearch: (conditions?: { status?: number; division?: string; search: string }) =>
    getStandardResponse<IWorker[]>(axios.get('/workers/searchWorker', { params: conditions, headers: { ...getAuthHeader() } }), (workers) =>
      workers.map((worker: IWorker) => ({
        ...worker,
        tokens: [],
        basicDetails: {
          ...worker.basicDetails,
          dateOfBirth: moment(worker.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...worker.officialDetails,
          dateOfJoining: worker.officialDetails.dateOfJoining ? moment(worker.officialDetails.dateOfJoining) : undefined,
          divisionHistory: worker.officialDetails.divisionHistory.map((divHis: DivisionHistory) => ({
            ...divHis,
            dateOfDivisionJoining: divHis.dateOfDivisionJoining ? moment(divHis.dateOfDivisionJoining) : undefined,
            dateOfDivisionLeaving: divHis.dateOfDivisionLeaving ? moment(divHis.dateOfDivisionLeaving) : undefined,
          })),
        },
        supportStructure: {
          ...worker.supportStructure,
          disabledFrom: worker.supportStructure?.disabledFrom ? moment(worker.supportStructure?.disabledFrom) : undefined,
          disabledTo: worker.supportStructure?.disabledTo ? moment(worker.supportStructure?.disabledTo) : undefined,
        },
        createdAt: moment(worker.createdAt),
        updatedAt: moment(worker.updatedAt),
      })),
    ),
  getAllRemarksById: (userId: string) =>
    getStandardResponse<Remark[]>(axios.get(`/workers/remarks/${userId}`, { headers: { ...getAuthHeader() } }), (remarks) =>
      remarks.map((remark: any) => ({
        ...remark,
        createdAt: moment(remark.createdAt),
        updatedAt: moment(remark.updatedAt),
      })),
    ),
  addRemarks: (remark: CreatableRemark) =>
    getStandardResponse<Remark>(axios.post('/workers/remarks', { ...remark }, { headers: { ...getAuthHeader() } }), (remark) => ({
      ...remark,
      createdAt: moment(remark.createdAt),
      updatedAt: moment(remark.updatedAt),
    })),
  /**
   * Retrieves a worker by ID.
   * @param {string} workerId - The ID of the worker to retrieve.
   * @return {Promise<StandardResponse<IWorker|null>>} A promise that resolves to the response containing the retrieved worker or null if not found.
   */
  getById: (workerId: string) =>
    getStandardResponse<IWorker | null>(axios.get(`/workers/${workerId}`, { headers: { ...getAuthHeader() } }), (data) => ({
      ...data,
      tokens: [],
      basicDetails: {
        ...data.basicDetails,
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
      supportStructure: {
        ...data.supportStructure,
        disabledFrom: data.supportStructure?.disabledFrom ? moment(data?.supportStructure?.disabledFrom) : undefined,
        disabledTo: data.supportStructure?.disabledTo ? moment(data.supportStructure?.disabledTo) : undefined,
      },
      spouse: !data.spouse ?
        undefined :
        {
          ...data.spouse,
          dateOfBirth: data.spouse.dateOfBirth ? moment(data.spouse.dateOfBirth) : undefined,
          createdAt: moment(data.createdAt),
          updatedAt: moment(data.updatedAt),

          insurance: {
            ...data.spouse.insurance,
            dojInsurance: data.insurance?.dojInsurance ? moment(data.insurance.dojInsurance) : undefined,
          },
        },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: !data.children ?
        undefined :
        data.children.map((child: Child) => ({
          ...child,
          dateOfBirth: child.dateOfBirth ? moment(child.dateOfBirth) : undefined,
          disabledTo: child.disabledTo ? moment(child.disabledTo) : undefined,
          disabledFrom: child.disabledFrom ? moment(child.dateOfBirth) : undefined,
          createdAt: moment(data.createdAt),
          updatedAt: moment(data.updatedAt),
        })),
      insurance: {
        ...data.insurance,
        dojInsurance: data.insurance?.dojInsurance ? moment(data.insurance.dojInsurance) : undefined,
      },
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),

  /**
   * Approves a worker.
   * @param {string} id - The ID of the worker to approve.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the approved worker.
   */
  approve: (id: string) => getStandardResponse<Worker>(axios.patch(`/workers/${id}/approve`, null, { headers: { ...getAuthHeader() } })),
  getUser: (id: string) => getStandardResponse<IWorker>(axios.get(`/workers/spouse/${id}`, { headers: { ...getAuthHeader() } })),

  /**
   * Rejects a worker.
   * @param {string} id - The ID of the worker to reject.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the rejected worker.
   */
  reject: (id: string, reason: string) => getStandardResponse<Worker>(axios.patch(`/workers/${id}/reject`, { reason }, { headers: { ...getAuthHeader() } })),
  disapprove: (id: string, reasonDisapprove: string) => getStandardResponse<Worker>(axios.patch(`/workers/${id}/disapprove`, { reasonDisapprove }, { headers: { ...getAuthHeader() } })),
  activate: (id: string) => getStandardResponse<IWorker>(axios.patch(`/workers/${id}/activate`, null, { headers: { ...getAuthHeader() } })),

  // deactivate: (id: string) => getStandardResponse<IWorker>(axios.patch(`/workers/${id}/deactivate`, null, { headers: { ...getAuthHeader() } })),
  deactivate: (id: string, reason: string) => getStandardResponse<Staff>(axios.patch(`/workers/${id}/deactivate`, { reason }, { headers: { ...getAuthHeader() } })),

  // deactivate: (id: string) => getStandardResponse<IWorker>(axios.patch(`/workers/${id}/deactivate`, null, { headers: { ...getAuthHeader() } })),

  deactivatespouse: (id: string, reason: string) => getStandardResponse<Spouse>(axios.patch(`/workers/spouse/${id}/deactivate`, { reason }, { headers: { ...getAuthHeader() } })),

  deleteSpouse: (id: string) => getStandardResponse<Spouse>(axios.delete(`/workers/spouse/${id}/deleteSpouse`, { headers: { ...getAuthHeader() } })),

  activatespouse: (id: string) => getStandardResponse<Spouse>(axios.patch(`/workers/spouse/${id}/activate`, null, { headers: { ...getAuthHeader() } })),

  deactivatechild: (id: string, reason: string) => getStandardResponse<Spouse>(axios.patch(`/workers/children/${id}/deactivate`, { reason }, { headers: { ...getAuthHeader() } })),
  activatechild: (id: string) => getStandardResponse<Spouse>(axios.patch(`/workers/children/${id}/activate`, null, { headers: { ...getAuthHeader() } })),
};
