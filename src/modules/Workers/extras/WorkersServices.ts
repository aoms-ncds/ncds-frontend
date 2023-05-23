import moment from 'moment';
import { getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
import { CreatableIWorker, IWorker } from './WorkersTypes';

export default {
  /**
   * Retrieves the count of workers.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the count of workers.
   */
  getCount: () => getStandardResponse<number>(axios.get('/workers/')),

  /**
   * Creates a new worker.
   * @param {CreatableIWorker} worker - The worker to be created.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the created worker.
   */
  create: (worker: CreatableIWorker) =>
    getStandardResponse<IWorker>(axios.post('/workers', worker)),

  /**
   * Edits a worker.
   * @param {CreatableIWorker} worker - The worker to be edited.
   * @return {Promise<StandardResponse<IWorker>>} A promise that resolves to the response containing the edited worker.
   */
  edit: (worker: CreatableIWorker) =>
    getStandardResponse<IWorker>(axios.patch('/workers/' + worker._id, worker)),

  /**
   * Deletes a worker.
   * @param {string} workerId - The ID of the worker to be deleted.
   * @return {Promise<StandardResponse<number>>} A promise that resolves to the response containing the result of the deletion.
   */
  delete: (workerId: string) =>
    getStandardResponse<number>(axios.delete('/workers/' + workerId)),

  /**
   * Retrieves all workers based on optional conditions.
   * @param {Object} conditions - Optional conditions to filter the workers (e.g., status and kind).
   * @param {number} conditions.status - The status of the workers.
   * @param {UserKind} conditions.kind - The kind of the workers.
   * @return {Promise<StandardResponse<IWorker[]>>} A promise that resolves to the response containing the list of all workers.
   */
  getAll: (conditions?: { status?: number; kind?: UserKind }) =>
    getStandardResponse<IWorker[]>(
      axios.get('/workers/', { params: conditions }),
      (workers) =>
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
    getStandardResponse<IWorker | null>(
      axios.get(`/workers/${workerId}`),
      (data) => ({
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
      }),
    ),

  /**
   * Approves a worker.
   * @param {string} id - The ID of the worker to approve.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the approved worker.
   */
  approve: (id: string) =>
    getStandardResponse<Worker>(axios.patch(`/workers/${id}/approve`)),

  /**
   * Rejects a worker.
   * @param {string} id - The ID of the worker to reject.
   * @return {Promise<StandardResponse<Worker>>} A promise that resolves to the response containing the rejected worker.
   */
  reject: (id: string) =>
    getStandardResponse<Worker>(axios.patch(`/workers/${id}/reject`)),
};
