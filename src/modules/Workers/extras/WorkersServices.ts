import moment from 'moment';
import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
export default {
  /**
   * Retrieves the count of workers.
   * @param {unknown|null} conditions - Count based on a filter condition
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the count of workers.
   */
  getCount: (conditions?: unknown) => getStandardResponse<number>(axios.get('/workers/count', { params: conditions })),

  /**
   * Creates a new worker.
   * @param {CreatableIWorker} worker - The worker to be created.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the created worker.
   */
  create: (worker: CreatableIWorker) => getStandardResponse<IWorker>(axios.post('/workers', worker)),

  /**
   * Edits a worker.
   * @param {CreatableIWorker} worker - The worker to be edited.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the edited worker.
   */
  edit: (worker: CreatableIWorker) => getStandardResponse<IWorker>(axios.patch('/workers/' + worker._id, worker)),

  /**
   * Deletes a worker.
   * @param {string} workerId - The ID of the worker to be deleted.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the result of the deletion.
   */
  delete: (workerId: string) => getStandardResponse<number>(axios.delete('/workers/' + workerId)),

  /**
   * Retrieves all workers based on optional conditions.
   * @param {Object} conditions - Optional conditions to filter the workers (e.g., status).
   * @param {number} conditions.status - The status of the workers.
   * @return {Promise<StandardResponse<IWorker[]>>} A promise that resolves to the response containing the list of all workers.
   */
  getAll: (conditions?: { status?: number }) =>
    getStandardResponse<IWorker[]>(axios.get('/workers/', { params: conditions }), (workers) =>
      workers.map((worker: any) => ({
        ...worker,
        basicDetails: {
          ...worker.basicDetails,
          dateOfBirth: moment(worker.basicDetails.dateOfBirth),
        },
        officialDetails: {
          ...worker.officialDetails,
          dateOfJoining: moment(worker.basicDetails.dateOfJoining),
        },
        createdAt: moment(worker.createdAt),
        updatedAt: moment(worker.updatedAt),
      })),
    ),

  /**
   * Retrieves a worker by ID.
   * @param {string} workerId - The ID of the worker to retrieve.
   * @return {Promise<StandardResponse<IWorker|null>>} A promise that resolves to the response containing the retrieved worker or null if not found.
   */
  getById: (workerId: string) =>
    getStandardResponse<IWorker | null>(axios.get(`/workers/${workerId}`), (data) => ({
      ...data,
      basicDetails: {
        ...data.basicDetails,
        dateOfBirth: moment(data.basicDetails.dateOfBirth),
      },
      officialDetails: {
        ...data.officialDetails,
        dateOfJoining: data.basicDetails.dateOfJoining? moment(data.basicDetails.dateOfJoining):undefined,
        dateOfLeaving: data.basicDetails.dateOfLeaving?moment(data.basicDetails.dateOfLeaving):undefined,
        dateOfCurrentDivisionJoining: data.basicDetails.dateOfCurrentDivisionJoining? moment(data.basicDetails.dateOfCurrentDivisionJoining):undefined,
        dateOfPreviousDivisionLeaving: data.basicDetails.dateOfPreviousDivisionLeaving?moment(data.basicDetails.dateOfPreviousDivisionLeaving):undefined,
      },
      spouse: !data.spouse ? undefined : {
        ...data.spouse,
        dateOfBirth: data.spouse.dateOfBirth?moment(data.spouse.dateOfBirth):undefined,
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      children: !data.children ? undefined : data.children.map((child: any) => ({
        ...child,
        dateOfBirth: child.dateOfBirth? moment(child.dateOfBirth):undefined,
      })),
      createdAt: moment(data.createdAt),
      updatedAt: moment(data.updatedAt),
    })),


  /**
   * Approves a worker.
   * @param {string} id - The ID of the worker to approve.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the approved worker.
   */
  approve: (id: string) => getStandardResponse<Worker>(axios.patch(`/workers/${id}/approve`)),

  /**
   * Rejects a worker.
   * @param {string} id - The ID of the worker to reject.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the rejected worker.
   */
  reject: (id: string) => getStandardResponse<Worker>(axios.patch(`/workers/${id}/reject`)),
  activate: (id: string) => getStandardResponse<IWorker>(axios.patch(`/workers/${id}/activate`)),
  deactivate: (id: string) => getStandardResponse<IWorker>(axios.patch(`/workers/${id}/deactivate`)),
};
