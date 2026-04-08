import React, { useState } from 'react';
import {
  TextField,
  Grid,
  Typography,
  Paper,
  Button,
  Box,
  Divider,
  MenuItem,
} from '@mui/material';
import Section from './Section';


const WelfareForm = () => {
  const [form, setForm] = useState<any>({});
  console.log(form, '  ');

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ background: '#f5f7fa', minHeight: '100vh', py: 5 }}>
      <Box maxWidth="900px" mx="auto" px={2}>

        {/* Header */}
        <Paper sx={{ p: 3, mb: 3, textAlign: 'center', bgcolor: '#1976d2', color: '#fff' }}>
          <Typography variant="h5">Welfare Ministry</Typography>
          <Typography>Medical Financial Assistance Form</Typography>
        </Paper>

        {/* Basic */}
        <Section title="Basic Information">
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Division" name="division" onChange={handleChange} />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField fullWidth label="Ailment No" name="ailmentNo" onChange={handleChange} />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              select
              fullWidth
              label="Ailment For"
              name="ailmentType"
              onChange={handleChange}
            >
              <MenuItem value="self">Self</MenuItem>
              <MenuItem value="spouse">Spouse</MenuItem>
              <MenuItem value="children">Children</MenuItem>
            </TextField>
          </Grid>
        </Section>

        {/* Personal */}
        <Section title="Personal Details">
          <Grid item xs={12}>
            <TextField fullWidth label="Applicant Name" name="name" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Worker Code" name="workerCode" onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Welfare Scheme ID" name="schemeId" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Joining Date" InputLabelProps={{ shrink: true }} name="joiningDate" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Spouse Name" name="spouse" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Number of Children" name="children" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Ministry */}
        <Section title="Ministry Details">
          <Grid item xs={6}>
            <TextField fullWidth label="Present Ministry" name="ministry" onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Place of Ministry" name="place" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Mobile Number" name="mobile" onChange={handleChange} />
          </Grid>
          <Grid item xs={6}>
            <TextField fullWidth label="Email" name="email" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Medical */}
        <Section title="Medical Details">
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={3} label="Sickness Details" name="sickness" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Treatment Start Date" InputLabelProps={{ shrink: true }} name="treatmentDate" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Hospital Name" name="hospital" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Doctor Name" name="doctor" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Financial */}
        <Section title="Financial Details">
          <Grid item xs={6}>
            <TextField fullWidth label="Bills Attached" name="bills" onChange={handleChange} helperText="Attach bills if available" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Doctor Fee (Rs)" name="doctorFee" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Hospital Charges (Rs)" name="hospitalCharges" onChange={handleChange} helperText="Attach discharge certificate if admitted" />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Investigations (Rs)" name="investigation" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Medicines (Rs)" name="medicines" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Other Expenses (Rs)" name="other" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Total Expenses (Rs)" name="total" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Requested Amount (Rs)" name="requested" onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Funds Received (Church/Family/NGO/Govt)" name="received" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Recommendations */}
        <Section title="Recommendations">
          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Supervisor Comments" name="supervisor" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Supervisor Name & Signature" name="supervisorSign" onChange={handleChange} />
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth multiline rows={2} label="Coordinator Comments" name="coordinator" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Recommended Amount (Rs)" name="recommendAmount" onChange={handleChange} />
          </Grid>

          <Grid item xs={3}>
            <TextField fullWidth label="Signature" name="signature" onChange={handleChange} />
          </Grid>

          <Grid item xs={3}>
            <TextField type="date" fullWidth label="Date" InputLabelProps={{ shrink: true }} name="date" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Office Use */}
        <Section title="Office Use Only">
          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Application Received On" InputLabelProps={{ shrink: true }} name="receivedDate" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Amount Sanctioned (Rs)" name="sanctioned" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Fund Release Date" InputLabelProps={{ shrink: true }} name="releaseDate" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField type="date" fullWidth label="Applicant Informed Date" InputLabelProps={{ shrink: true }} name="informedDate" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Dealing Person Signature" name="dealingSign" onChange={handleChange} />
          </Grid>

          <Grid item xs={6}>
            <TextField fullWidth label="Authorized Person Signature" name="authSign" onChange={handleChange} />
          </Grid>
        </Section>

        {/* Submit */}
        <Button variant="contained" fullWidth size="large">
          Save
        </Button>

      </Box>
    </Box>
  );
};

export default WelfareForm;
