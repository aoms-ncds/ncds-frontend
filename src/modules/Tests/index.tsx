import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import FileUploader from '../../components/FileUploader';
import { Button } from '@mui/material';
import TestsServices from './extras/TestsServices';

const index = () => {
  const [showFileUploader, setShowFileUploader] = useState(false);
  return (
    <CommonPageLayout title='Tests'>
      <FileUploader
        title='Upload bills'
        types={[
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/pdf',
          'video/quicktime',
        ]}
        accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        getFiles={() => TestsServices.getBills()}
        uploadFile={(file, onProgress) => TestsServices.uploadFile(file, onProgress)}
      />
      <Button
        variant='contained'
        onClick={() => setShowFileUploader(true)}
      >
          Show File Uploader
      </Button>
    </CommonPageLayout>
  );
};

export default index;
