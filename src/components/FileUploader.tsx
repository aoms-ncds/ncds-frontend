import { Dialog } from '@mui/material';
import React from 'react';

interface FileUploaderProps{
    open: boolean;
    onClose: () => void;
}
const FileUploader = (props: FileUploaderProps) => {
  return (
    <Dialog open={props.open} onClose={props.onClose}>

    </Dialog>
  );
};

export default FileUploader;
