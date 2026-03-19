import { dummyRequest, getStandardResponse } from '../../../extras/CommonHelpers';
import axios from 'axios';
const timeoutValue = 250;
export default {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBills: () =>
    getStandardResponse<FileObject[]>(
      dummyRequest<FileObject[]>({
        data: [
          // {
          //   _id: 'f02nuv3r',
          //   name: 'Sample Excel / Spreadsheet',
          //   size: 32443000,
          //   type: 'application/vnd.ms-excel',
          //   storage: 'Drive',
          //   fileId: '03v9runt3',
          //   downloadURL: '',
          //   private: false,
          //   createdAt: moment(),
          //   updatedAt: moment(),
          // },
          // {
          //   _id: '',
          //   name: 'Sample PDF',
          //   size: 356443000,
          //   type: 'application/pdf',
          //   storage: 'Drive',
          //   fileId: '03v9runt3',
          //   downloadURL: '',
          //   private: false,
          //   createdAt: moment(),
          //   updatedAt: moment(),
          // },
          // {
          //   _id: '',
          //   name: 'Food',
          //   size: 122443000,
          //   type: 'video/quicktime',
          //   storage: 'Drive',
          //   fileId: '03v9runt3',
          //   downloadURL: '',
          //   private: false,
          //   createdAt: moment(),
          //   updatedAt: moment(),
          // },
        ],
        message: 'Successfully fetched ',
        result: 'success',
        timeout: timeoutValue,
      }),
    ),
  //   getBills: () => getStandardResponse<FileObject[]>(
  //     dummyRequest<FileObject[]>({
  //       data: [],
  //       message: 'Network Error',
  //       result: 'fail',
  //       timeout: timeoutValue,
  //     }),
  //   ),
  // uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void):Promise<StandardResponse<FileObject>> => {
  //   return new Promise((resolve, reject) => {
  //     let percentage = 0;
  //     const iv = setInterval(() => {
  //       percentage += 4;
  //       onProgress({
  //         loaded: file.size/100*(percentage),
  //         percentage: percentage,
  //         total: file.size,
  //       });
  //       if (percentage === 100) {
  //         clearInterval(iv);
  //         resolve(
  //           getStandardResponse<FileObject>(
  //             dummyRequest<FileObject>({
  //               data: {
  //                 _id: '',
  //                 name: file.name,
  //                 size: file.size,
  //                 type: file.type as FileObjectType,
  //                 storage: 'Drive',
  //                 fileId: '03v9runt3',
  //                 downloadURL: '',
  //                 private: false,
  //                 createdAt: moment(),
  //                 updatedAt: moment(),
  //               },
  //               message: 'Successfully uploaded file!',
  //               result: 'success',
  //               timeout: 0,
  //             }),
  //           ),
  //         );
  //       }
  //     }, 100);
  //   });
  // },
  uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void) =>
    getStandardResponse<FileObject>(
      axios.post(
        '/test/upload',
        { file },
        {
          onUploadProgress: (progressEvent) => {
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
        },
      ),
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
  //       downloadURL: '',
  //       private: false,
  //       createdAt: moment(),
  //       updatedAt: moment(),
  //     },
  //     message: 'Successfully uploaded file!',
  //     result: 'success',
  //     timeout: 1100,
  //   }),
  // ),
  // deleteFile: (fileID: string) => getStandardResponse<void>(axios.delete('http://localhost:8080/'+fileID)),
  // renameFile: (fileID: string, newName: string) =>
  //   getStandardResponse<void>(
  //     dummyRequest<void>({
  //       result: 'success',
  //       timeout: timeoutValue,
  //     }),
  //   ),
  // deleteFile: (fileID: string) =>
  //   getStandardResponse<void>(
  //     dummyRequest<void>({
  //       result: 'success',
  //       timeout: timeoutValue,
  //     }),
  //   ),
  importStaffsExcel: (staff: IWorker, overwriteDuplicates: boolean) =>
    getStandardResponse<void>(
      dummyRequest<void>({
        result: 'success',
        timeout: timeoutValue,
      }),
    ),
};
