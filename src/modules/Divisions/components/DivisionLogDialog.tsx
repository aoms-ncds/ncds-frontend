import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import DivisionsServices from '../extras/DivisionsServices';


const DivisionLogDialog = (props:{open:boolean;onClose:()=>void;divId:string}) => {
  const [logs, setLogs] = useState<IDivisionUpdateLog[]>([]);
  useEffect(() => {
    const getLog=async ()=>{
      setLogs(((await DivisionsServices.getLogById(props.divId)).data));
    };
    if (props.divId) {
      getLog();
    }
  }, [props.divId]);

  return (
    <Dialog open={props.open} onClose={()=>props.onClose()} maxWidth='xl' >
      <DialogTitle >
        Log
      </DialogTitle>
      <DialogContent>
        <ul>
          {logs.map((log, index)=>(
            // eslint-disable-next-line react/jsx-no-comment-textnodes
            <li key={index}>
              <Typography variant="body1" color="initial" >
                {`Division ${log.divName} ${log.field} changed by 
                ${log.doneBy.basicDetails.firstName} ${log.doneBy.basicDetails.middleName?log.doneBy.basicDetails.middleName+' ':''}${log.doneBy.basicDetails.lastName}
                 on ${moment(log.createdAt).format('DD/MM/YYYY hh:mm:ss a')}` }
              </Typography>
            </li>
          ))}
        </ul>
        {(logs.length===0)&&<Typography variant="h5" color="initial">No Log Found</Typography>}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={()=>props.onClose()}
          color="primary"
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DivisionLogDialog;
