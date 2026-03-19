import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, LinearProgress, Checkbox, Typography, FormControlLabel, Alert, AlertTitle } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import XLSX from 'xlsx';

interface Props<T> {
  onFinish: () => void;
  onClose: () => void;
  show: boolean;
  title: string;
  templateURL: string;
  validator: (row: any, rowNumber: number) => string | true;
  parser: (row: any) => T;
  uploader: (row: T, overwriteDuplicates: boolean) => Promise<StandardResponse<void>>;
}
const ExcelImporter = <T, >(props: Props<T>) => {
  const [overwriteDuplicates, setOverwriteDuplicates] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [importCompleted, setImportCompleted] = useState(false);
  const [totalRows, setTotalRows] = useState<number | null>(null);
  const [finishedRows, setFinishedRows] = useState<number | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files[0];
    if (
      droppedFile.type === 'application/vnd.ms-excel' ||
      droppedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      droppedFile.name.endsWith('.xls') ||
      droppedFile.name.endsWith('.xlsx')
    ) {
      setFile(droppedFile);
      readFileContent(droppedFile);
    } else {
      // Show error message
      enqueueSnackbar({
        message: ' Please Drop an Excel file Only',
        variant: 'info',
      });
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
    if (selectedFile) readFileContent(selectedFile);
  };

  const readFileContent = (file: File) => {
    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target?.result as ArrayBuffer);
      const workbook = XLSX.read(data, { type: 'array', cellDates: true, dateNF: 'yyyy-mm-dd HH:mm:ss' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const sheetRows = XLSX.utils.sheet_to_json<any>(worksheet, {
        header: 0,
        raw: false,
        dateNF: 'yyyy-mm-dd HH:mm:ss',
      });
      setTotalRows(sheetRows.length);
      setFinishedRows(0);
      // Now validate each row and start sending request to server for importing data.
      for (let i = 0; i < sheetRows.length; i++) {
        const row = sheetRows[i];
        const validateResult = props.validator(row, i + 1);
        if (validateResult === true) {
          const parsedRow = props.parser(row);
          try {
            await props.uploader(parsedRow, overwriteDuplicates);
            setFinishedRows((count) => (count ? count + 1 : 1));
          } catch (error: any) {
            setFinishedRows((count) => (count ? count + 1 : 1));
            setErrors((errors) => [...errors, error.message]);
            console.log({ Newerrors: [...errors, error.message]});
          }
        } else {
          setErrors((errors) => [...errors, validateResult]);
          setFinishedRows((count) => (count ? count + 1 : 1));
        }
      }
      setImportCompleted(true);
      console.log({ errors });
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Dialog open={props.show && file == null} fullWidth>
        <DialogTitle>{props.title}</DialogTitle>
        <DialogContent onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
          <label htmlFor="file-input">
            <div style={{ height: 80, width: 550, backgroundColor: 'gray' }} onDragStart={(event) => event.preventDefault()}>
              <DialogContentText sx={{ textAlign: 'center', pt: 4, color: 'black' }}>Choose an Excel file and drag and drop it here.</DialogContentText>
            </div>
          </label>
          <input type="file" id="file-input" accept=".xlsx,.xls" onChange={handleFileInputChange} style={{ display: 'none' }} />
          <FormControlLabel control={<Checkbox value={overwriteDuplicates} onChange={(e) => setOverwriteDuplicates(e.target.checked)} />} label="Overwrite duplicates" />
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            onClick={() => {
              setOverwriteDuplicates(false);
              setFile(null);
              setImportCompleted(false);
              setTotalRows(null);
              setFinishedRows(null);
              setErrors([]);
              props.onClose();
            }}
          >
            close
          </Button>
          &nbsp; &nbsp;
          <Button variant="contained" component="a" href={props.templateURL}>
            Download Template
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={props.show && file !== null} fullWidth>
        <DialogTitle> Uploading...</DialogTitle>
        <DialogContent>
          <LinearProgress variant="determinate" value={((finishedRows ?? 0) / (totalRows ?? 0)) * 100} />
          <br />
          <Typography>
            Finished {finishedRows} items out of {totalRows}
          </Typography>
        </DialogContent>
      </Dialog>

      <Dialog open={props.show && importCompleted == true} fullWidth>
        <DialogTitle> Done</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <div>
              {(totalRows ?? 0) - errors.length} items were uploaded
              {errors && errors.length > 0 && `, but ${errors.length} of them failed`}
              <br /> <br />
              {errors && errors.length > 0 && (
                <Alert severity="error">
                  <AlertTitle>Errors: </AlertTitle>
                  {errors.map((err, index) => (
                    <Typography key={index}>
                      <b>{index + 1}.</b> {err}
                    </Typography>
                  ))}
                </Alert>
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOverwriteDuplicates(false);
              setFile(null);
              setImportCompleted(false);
              setTotalRows(null);
              setFinishedRows(null);
              setErrors([]);
              props.onFinish();
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ExcelImporter;
