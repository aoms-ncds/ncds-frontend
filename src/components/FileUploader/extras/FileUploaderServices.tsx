import axios from 'axios';
import { dummyRequest, getAuthHeader, getStandardResponse } from '../../../extras/CommonHelpers';

const timeoutValue = 250;

export default {

  uploadFile: (file: File, onProgress: (progress: AJAXProgress) => void, module?:string, filename?:string) =>
    getStandardResponse<FileObject>(
      axios.post(
        '/file/',
        { file, module, filename },
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
            ...getAuthHeader(),
            'Content-Type': 'multipart/form-data',
          },
        },
      ),
    ),

  renameFile: (fileId: string, newName: string) =>
    getStandardResponse<void>(axios.patch('/file/' + fileId, { newName }, { headers: { ...getAuthHeader() } })),

  deleteFile: (fileId:string)=>getStandardResponse<void>(axios.delete('/file/' + fileId, { headers: { ...getAuthHeader() } })),

};
