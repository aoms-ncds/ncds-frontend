import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Delete as DeleteIcon } from '@mui/icons-material';
import FRServices from '../extras/FRServices';

const FRParticularList = () => {
  const [particulars, setParticulars] = useState<Particular[]>();
  useEffect(() => {
    // FRServices.getParticulars()
    //   .then((res) => {
    //     console.log(res);
    //     setParticulars(res.data);
    //   })
    //   .catch((res) => {
    //     console.log(res);
    //   });
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">S.No</TableCell>
              <TableCell align="center">Particulars</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Required Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {particulars &&
              particulars.map((item) => (
                <TableRow key={item._id}>
                  <TableCell component="th">
                    <DeleteIcon />
                  </TableCell>
                  <TableCell align="center">{item._id}</TableCell>
                  <TableCell align="center"> {`${item.mainCategory == 'Select'? '' : item.mainCategory } 
                            > ${item.subCategory1=='Select' ? '' : item.subCategory1} > 
                            ${item.subCategory2=='Select' ? '' : item.subCategory2} > ${item.subCategory3=='Select' ? '' : item.subCategory3}`}</TableCell>
                  <TableCell align="center">{item.quantity}</TableCell>
                  <TableCell align="center">{item.month}</TableCell>
                  <TableCell align="center">{item.requestedAmount}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FRParticularList;
