import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import FileUploader from '../../components/FileUploader';
import TestServices from './extras/TestServices';
import { Button } from '@mui/material';
import ExcelImporter from '../../components/ExcelImporter';

const index = () => {
  const [loadCount, setLoadCount] = useState(0);
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showExcelImporter, setShowExcelImporter] = useState(false);

  return (
    <CommonPageLayout title='Tests' loadCount={loadCount}>
      {/* File uploader starts */}
      <FileUploader
        title='Upload bills'
        types={[
          'application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/pdf',
          'video/quicktime',
          'image/png',
        ]}
        accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        getFiles={TestServices.getBills}
        uploadFile={TestServices.uploadFile}
        renameFile={TestServices.renameFile}
        deleteFile={(fileId: string) => {
          return TestServices.deleteFile(fileId);
        }}
        onLoad={() => setLoadCount((count) => count+1)}
        afterLoad={() => setLoadCount((count) => count-1)}
      />
      <Button
        variant='contained'
        onClick={() => setShowFileUploader(true)}
      >
          Show File Uploader
      </Button>
      {/* File uploader ends.. */}
      {/* Excel importer starts */}
      <ExcelImporter<Staff>
        title='Import staffs from excel'
        templateURL='https://google.com'
        show={showExcelImporter}
        onClose={() => setShowExcelImporter(false)}
        onFinish={() => setShowExcelImporter(false)}
        // validator={(row, rowNumber) => {
        //   return true;
        // }}
        validator={() => {
          return true;
        }}
        parser={(row) => ({ ...row })}
        uploader={(row, overwriteDuplicates) => TestServices.importStaffsExcel(row, overwriteDuplicates)}
      />
      <Button variant='contained' onClick={() => setShowExcelImporter(true)} sx={{ ml: 1 }}>
        Show Excel Importer
      </Button>
      {/* Excel importer ends.. */}
    </CommonPageLayout>
  );
};

export default index;
