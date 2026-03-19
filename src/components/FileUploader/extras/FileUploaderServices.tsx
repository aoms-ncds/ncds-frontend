import axios from 'axios';
import { getAuthHeader, getStandardResponse } from '../../../extras/CommonHelpers';


export default {

  uploadFile: (file: File, onProgress?: (progress: AJAXProgress) => void, module?:string, filename?:string, iroId?:string) =>
    getStandardResponse<FileObject>(
      axios.post(
        '/file/',
        { file, module, filename, iroId },
        {
          onUploadProgress: (progressEvent) => {
            if (progressEvent && progressEvent.total) {
              onProgress && onProgress({
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
  getFile: (fileId:string)=>getStandardResponse<FileObject>(axios.get('/file/' + fileId, { headers: { ...getAuthHeader() } })),

  manageFile: (fileId: string, operation:string)=>getStandardResponse<void>(axios.patch(`/file/${fileId}/${operation}`, null, { headers: { ...getAuthHeader() } })),
};
