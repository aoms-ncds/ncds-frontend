import React, { useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import FileUploader from '../../components/FileUploader/FileUploader';
import TestServices from './extras/TestServices';
import { Button } from '@mui/material';
import ExcelImporter from '../../components/ExcelImporter';
import DateFilter from '../../components/DateFilter';
import moment from 'moment';
import { MB } from '../../extras/CommonConfig';
import FileUploaderServices from '../../components/FileUploader/extras/FileUploaderServices';

const index = () => {
  const [showFileUploader, setShowFileUploader] = useState(false);
  const [showExcelImporter, setShowExcelImporter] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: moment(),
    endDate: moment(),
  });

  return (
    <CommonPageLayout title="Tests">
      {/* File uploader starts */}
      <FileUploader
        title="Upload bills"
        action='add'
        types={['application/vnd.ms-excel',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'application/pdf',
          'video/quicktime',
          'image/png',
          'video/mkv',
          'video/mp4',
          'image/jpg',
          'image/jpeg',
        ]}
        limits={{
          // types: [],
          maxItemSize: 5*MB,
          maxItemCount: 3,
          maxTotalSize: 15*MB,
        }}
        // accept={['video/*']}
        open={showFileUploader}
        onClose={() => setShowFileUploader(false)}
        getFiles={[]}
        uploadFile={(file: File, onProgress: (progress: AJAXProgress) => void) => {
          const res = FileUploaderServices.uploadFile(file, onProgress);
          return res;
        }}
        renameFile={FileUploaderServices.renameFile}
        deleteFile={(fileId: string) => {
          return FileUploaderServices.deleteFile(fileId);
        }}
      />
      <Button variant="contained" onClick={() => setShowFileUploader(true)}>
        Show File Uploader
      </Button>
      {/* File uploader ends.. */}
      {/* Excel importer starts */}
      <ExcelImporter<IWorker>
        title="Import staffs from excel"
        templateURL="https://google.com"
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
      <Button variant="contained" onClick={() => setShowExcelImporter(true)} sx={{ ml: 1 }}>
        Show Excel Importer
      </Button>
      {/* Excel importer ends.. */}
      <br />
      <br />
      {/* DateFilter starts  */}
      <DateFilter dateRage={dateRange} onChange={setDateRange} rangeTypes={['custom', 'days', 'weeks']} />
      {/* DateFilter ends..  */}
    </CommonPageLayout>
  );
};

export default index;
