import { TableContainer, Paper,
  Table, TableHead, TableRow,
  TableCell, TableBody } from '@mui/material';
import React from 'react';
import {
  Delete as DeleteIcon,
} from '@mui/icons-material';

const FRParticularList = () => {
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell align="center">SI NO</TableCell>
              <TableCell align="center">Particulars</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Month</TableCell>
              <TableCell align="center">Required Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow >
              <TableCell component="th" >
                <DeleteIcon />
              </TableCell>
              <TableCell align="center">1</TableCell>
              <TableCell align="center">For the support of two pasters</TableCell>
              <TableCell align="center">2</TableCell>
              <TableCell align="center">july</TableCell>
              <TableCell align="center">20000</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default FRParticularList;
