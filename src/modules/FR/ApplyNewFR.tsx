import React from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table, TableBody,
  TableCell, TableContainer,
  TableHead, TableRow,
  TextField, Typography } from '@mui/material';
import FRParticularList from './components/FRParticularList';
import AddFRRequests from './components/AddFRRequests';
const ApplyNewFR = () => {
  return (
    <CommonPageLayout title='Apply New FR'>
      <Card style={{ width: '100%' }}>
        <AddFRRequests />
      </Card>

    </CommonPageLayout>
  );
};

export default ApplyNewFR;
