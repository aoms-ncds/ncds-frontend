import moment from 'moment';
import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';

export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBills: () => getStandardResponse<FileObject[]>(
    dummyRequest<FileObject[]>({
      data: [
        {
          _id: 'f02nuv3r',
          name: 'Sample Excel / Spreadsheet',
          size: 32443000,
          type: 'application/vnd.ms-excel',
          storage: 'Drive',
          fileId: '03v9runt3',
          downloadURL: 'fwe0nvifjr',
          private: false,
          createdAt: moment(),
          updatedAt: moment(),
        },
        {
          _id: 'f02nuvert3r',
          name: 'Sample PDF',
          size: 356443000,
          type: 'application/pdf',
          storage: 'Drive',
          fileId: '03v9runt3',
          downloadURL: 'fwe0nvifjr',
          private: false,
          createdAt: moment(),
          updatedAt: moment(),
        },
        {
          _id: 'f02nusddvert3r',
          name: 'Food',
          size: 122443000,
          type: 'video/quicktime',
          storage: 'Drive',
          fileId: '03v9runt3',
          downloadURL: 'fwe0nvifjr',
          private: false,
          createdAt: moment(),
          updatedAt: moment(),
        },
      ],
      message: 'Successfully fetched list of bills',
      result: 'success',
      timeout: 500,
    }),
  ),
  //   getBills: () => getStandardResponse<FileObject[]>(
  //     dummyRequest<FileObject[]>({
  //       data: [],
  //       message: 'Network Error',
  //       result: 'fail',
  //       timeout: 500,
  //     }),
  //   ),
  uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void) => getStandardResponse<FileObject>(
    axios.post('http://localhost:8080/', { file }, {
      onUploadProgress: function(progressEvent) {
        if (progressEvent && progressEvent.total) {
          onProgress({
            loaded: progressEvent.loaded,
            total: progressEvent.total,
            percentage: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          });
        }
      },
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  ),
  // uploadFile: (file: File) => getStandardResponse<FileObject>(
  //   dummyRequest<FileObject>({
  //     data: {
  //       _id: (new Date()).getTime().toString(),
  //       name: file.name,
  //       type: file.type as FileObjectType,
  //       size: file.size,
  //       storage: 'Drive',
  //       fileId: '03v9runt3',
  //       downloadURL: 'fwe0nvifjr',
  //       private: false,
  //       createdAt: moment(),
  //       updatedAt: moment(),
  //     },
  //     message: 'Succesfully uploaded file!',
  //     result: 'success',
  //     timeout: 1100,
  //   }),
  // ),
};
