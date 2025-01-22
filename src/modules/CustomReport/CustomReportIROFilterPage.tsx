import React, { useEffect, useState } from 'react';
import { TextField, MenuItem, Button, Grid, Checkbox, FormControlLabel, Typography, Container, Autocomplete, FormControl, InputLabel, Select } from '@mui/material';
import DivisionsServices from '../Divisions/extras/DivisionsServices';
import { useAuth } from '../../hooks/Authentication';
import { enqueueSnackbar } from 'notistack';
import FRServices from '../FR/extras/FRServices';

const IROReportFilter = () => {
  // State management for filters
  const [divisions, setDivisions] = useState<any[] | null>(null);
  const [division, setDivision] = useState<any[] | null>(null);
  const [subDivisions, setSubDivisions] = useState<any[] | null>(null);
  const [mainCategories, setMainCategories] = useState<any[]>();
  const [selectedMainCategory, setSelectedMainCategory] = useState<MainCategory | undefined>();
  const [selectedSubCategory1, setSelectedSubCategory1] = useState<any | null>(null);
  const [selectedSubCategory2, setSelectedSubCategory2] = useState<any | null>(null);
  const [selectedSubCategory3, setSelectedSubCategory3] = useState<SubCategory3 | null>(null);
  const [IRO, setIRO] = useState<any>();
  const user = useAuth();
  const [filters, setFilters] = useState<any>({
    division: '',
    subdivision: '',
    allDivisions: false,
    iroStatus: '',
    sanctionedAsPer: '',
    iroDateFrom: '',
    iroDateTo: '',
    reqAmountFrom: '',
    reqAmountTo: '',
    sanctAmountFrom: '',
    sanctAmountTo: '',
    mainCategory: '',
    subCategory1: '',
    subCategory2: '',
    subCategory3: '',
    beneficiaryName: '',
    sanctionedBank: '',
  });

  useEffect(()=>{
    DivisionsServices.getDivisions().then((res) => {
    //   setDivision(res.data ?? null);
      setDivisions(res.data);
    });
    FRServices.getMainCategory()
          .then((res) => {
            setMainCategories(res.data);
          })
          .catch((res) => {
            console.log(res);
          });

    FRServices.getById(IRO).then((res) =>{
      setIRO(res.data);
    }); // TODO: Implement REST API Call
  }, []);
  useEffect(()=>{
    DivisionsServices.getSubDivisionsByDivisionId(filters.division?._id ?? '')
              .then((res2) => setSubDivisions(res2.data))
              // .then((res) => console.log(res.data, 'sec'))
              .catch((error) =>
                enqueueSnackbar({
                  variant: 'error',
                  message: error.message,
                }),
              );
  }, [filters.division]);
  console.log(divisions, 'DIVISION77');
  //   console.log(filters, 'DIVISION77');
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFilters((prev: any) => ({ ...prev, [name]: checked }));
  };

  return (
    <Container>

      <div style={{ padding: '16px' }}>
        <Typography sx={{ fontWeight: '600' }} variant="h4" gutterBottom>
        IRO Report Filter
        </Typography>

        {/* Division Details Section */}
        <section>
          <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
          Division Details:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Autocomplete
                aria-required
                options={divisions ?? []} // Ensure options are not null or undefined
                getOptionLabel={(option) => option.details?.name || ''} // Fallback to an empty string if name is undefined
                value={divisions?.find((div) => div.id === filters.division) || null} // Match the value to an option in the divisions array
                onChange={(event, newValue) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    division: newValue?? '', // Store the ID of the selected division
                  }))
                  // setDivision(newValue),
                }
                disabled={filters.allDivisions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Division"
                    name="division"
                    variant="outlined"
                  />
                )}
              />

            </Grid>

            <Grid item xs={12} sm={4}>
              <Autocomplete
                options={subDivisions ?? []} // Ensure options are not null or undefined
                getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)} // Adjust for plain strings or objects
                value={
                  subDivisions?.find((sub) => sub.id === filters.subdivision) || null
                } // Match the value to the corresponding object
                onChange={(event, newValue) =>
                  setFilters((prev: any) => ({
                    ...prev,
                    subdivision: newValue ? newValue.id : '',
                  }))
                }
                disabled={filters.allDivisions}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    fullWidth
                    label="Sub-division"
                    name="subdivision"
                    variant="outlined"
                  />
                )}
              />

            </Grid>

            <Grid item xs={12} sm={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="allDivisions"
                    checked={filters.allDivisions}
                    onChange={handleCheckboxChange}
                  />
                }
                label="All Divisions"
              />
            </Grid>
          </Grid>
        </section>

        {/* IRO Details Section */}
        <section>
          <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
          IRO Details:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="IRO Status"
                name="iroStatus"
                value={filters.iroStatus}
                onChange={handleInputChange}
              >
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="inactive">Inactive</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Sanctioned As Per"
                name="sanctionedAsPer"
                value={filters.sanctionedAsPer}
                onChange={handleInputChange}
              >
                <MenuItem value="rule1">Rule 1</MenuItem>
                <MenuItem value="rule2">Rule 2</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="IRO Date From"
                name="iroDateFrom"
                value={filters.iroDateFrom}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="date"
                fullWidth
                label="IRO Date To"
                name="iroDateTo"
                value={filters.iroDateTo}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="Req. Amount From"
                name="reqAmountFrom"
                value={filters.reqAmountFrom}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="Req. Amount To"
                name="reqAmountTo"
                value={filters.reqAmountTo}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="Sanct. Amount From"
                name="sanctAmountFrom"
                value={filters.sanctAmountFrom}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                fullWidth
                label="Sanct. Amount To"
                name="sanctAmountTo"
                value={filters.sanctAmountTo}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        </section>

        {/* Category Details Section */}
        <section>
          <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
          Category Wise:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={selectedMainCategory ?? null}
                options={mainCategories ?? []}
                getOptionLabel={(mainCategory) => mainCategory.name}
                onChange={(e, selectedMainCategory) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    mainCategory: selectedMainCategory, // Store the ID of the selected division
                  }));
                  setSelectedMainCategory(selectedMainCategory);
                  setSelectedSubCategory1(null);
                  setSelectedSubCategory1(null);
                  setSelectedSubCategory1(null);
                }}
                renderInput={(params) => <TextField {...params} label="Choose Main Category"/>}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                value={selectedSubCategory1}
                options={selectedMainCategory?.subcategory1 ?? []}
                getOptionLabel={(subcategory2) => subcategory2.name}
                onChange={(_e, selectedSubCategory1) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    subCategory1: selectedSubCategory1.name, // Store the ID of the selected division
                  }));
                  setSelectedSubCategory1(selectedSubCategory1);
                }}
                renderInput={(params) => <TextField {...params} label="Sub Category 1" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                // disabled={props.disable==true}
                value={selectedSubCategory2}
                options={selectedSubCategory1?.subcategory2 ?? []}
                getOptionLabel={(subcategory2) => subcategory2.name ?? ''}
                onChange={(_e, selectedSubCategory2) => {
                  if (selectedSubCategory2) {
                    setFilters((prev: any) => ({
                      ...prev,
                      subCategory2: selectedSubCategory2.name, // Store the ID of the selected division
                    }));
                    setSelectedSubCategory2(selectedSubCategory2);
                  }
                  //   const subcat2 =selectedSubCategory2?.subcategory3.map((e)=>e.name);

                //   if (subcat2?.includes('Select')) {
                //     console.log('Select');
                //     if (selectedSubCategory2) {
                //       setNewParticular((particularDetails) => ({
                //         ...particularDetails,
                //         narration: selectedSubCategory2?.subcategory3[0].narration,
                //       }));
                //       setSelectedSubCategory3(selectedSubCategory3);
                //     }
                //   }
                }}
                renderInput={(params) => <TextField {...params} label="Sub Category 2" required />}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Autocomplete
                // disabled={props.disable==true}
                value={selectedSubCategory3}
                options={selectedSubCategory2?.subcategory3 ?? []}
                getOptionLabel={(subCategory3) => subCategory3.name}
                onChange={(e, selectedSubCategory3) => {
                  if (selectedSubCategory3) {
                    setFilters((prev: any) => ({
                      ...prev,
                      subCategory3: selectedSubCategory3.name, // Store the ID of the selected division
                    }));
                    setSelectedSubCategory3(selectedSubCategory3);
                  }
                }}
                renderInput={(params) => <TextField {...params} label="Sub Category 3" />}
                fullWidth
              />
            </Grid>
          </Grid>
        </section>

        {/* Bank Details Section */}
        <section>
          <Typography sx={{ fontWeight: '600' }} variant="h6" gutterBottom>
          Bank Details:
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="Beneficiary_bank">Beneficiary Bank</InputLabel>
                <Select
                  labelId="sanctioned_bank"
                  label="Sanctioned Bank"
                  value={filters.sanctionedBank ?? ''}
                  required
                  onChange={((e:any)=>{
                    setFilters((prev: any) => ({
                      ...prev,
                      sanctionedBank: e, // Store the ID of the selected division
                    }));
                  })}
                >
                  <MenuItem value={filters.sanctionedBank}>{filters.sanctionedBank}</MenuItem>
                  {filters.division?.DivisionBankFCRA?.bankName !='' || filters.division?.FCRABankDetails?.bankName!='' ? (
                    <MenuItem value={`FCRA-${filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}`}>
                      {filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.DivisionBankLocal?.bankName || filters.division?.localBankDetails?.bankName ? (
                    <MenuItem value={`Local Bank-${filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}`}>
                      {filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank1?.bankName || filters.division?.otherBankDetails?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 1-${filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank2?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 2-${filters.division?.BeneficiaryBank2?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank2?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank3?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 3-${filters.division?.BeneficiaryBank3?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank3?.beneficiary}
                    </MenuItem>
                  ) : '1'}

                  {filters.division?.BeneficiaryBank4?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 4-${filters.division?.BeneficiaryBank4?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank4?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank5?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 5-${filters.division?.BeneficiaryBank5?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank5?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank6?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 6-${filters.division?.BeneficiaryBank6?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank6?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank7?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 7-${filters.division?.BeneficiaryBank7?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank7?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank8?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 8-${filters.division?.BeneficiaryBank8?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank8?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank9?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 9-${filters.division?.BeneficiaryBank9?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank9?.beneficiary}
                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank10?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 10-${filters.division?.BeneficiaryBank10?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank10?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank10?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 11-${filters.division?.BeneficiaryBank11?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank11?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank12?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 12-${filters.division?.BeneficiaryBank12?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank12?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank13?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 13-${filters.division?.BeneficiaryBank13?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank13?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank14?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 14-${filters.division?.BeneficiaryBank14?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank14?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank15?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 15-${filters.division?.BeneficiaryBank15?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank15?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank16?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 16-${filters.division?.BeneficiaryBank16?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank16?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank17?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 17-${filters.division?.BeneficiaryBank17?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank17?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank18?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 18-${filters.division?.BeneficiaryBank18?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank18?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank19?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 19-${filters.division?.BeneficiaryBank19?.beneficiary}`}>
                      {filters.division?.BeneficiaryBank19?.beneficiary}
                    </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank20?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 20-${filters.division?.BeneficiaryBank20?.beneficiary}`}>
                      {filter.division?.BeneficiaryBank20?.beneficiary}
                    </MenuItem>
                  ) : ''}


                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="sanctioned_bank">Sanctioned Bank</InputLabel>
                <Select
                  labelId="sanctioned_bank"
                  label="Sanctioned Bank"
                  value={filters.sanctionedBank ?? ''}
                  required
                  onChange={((e:any)=>{
                    setFilters((prev: any) => ({
                      ...prev,
                      sanctionedBank: e, // Store the ID of the selected division
                    }));
                  })}
                >
                  <MenuItem value={filters.sanctionedBank}>{filters.sanctionedBank}</MenuItem>
                  {filters.division?.DivisionBankFCRA?.bankName !='' || filters.division?.FCRABankDetails?.bankName!='' ? (
                    <MenuItem value={`FCRA-${filters.division?.DivisionBankFCRA?.beneficiary || filters.division?.FCRABankDetails?.beneficiary}`}>
                  Division Bank FCRA                   </MenuItem>
                  ) : ''}

                  {filters.division?.DivisionBankLocal?.bankName || filters.division?.localBankDetails?.bankName ? (
                    <MenuItem value={`Local Bank-${filters.division?.DivisionBankLocal?.beneficiary || filters.division?.localBankDetails?.beneficiary}`}>
                  Division Bank Local                     </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank1?.bankName || filters.division?.otherBankDetails?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 1-${filters.division?.BeneficiaryBank1?.beneficiary || filters.division?.otherBankDetails?.beneficiary}`}>
                  Beneficiary Bank 1                    </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank2?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 2-${filters.division?.BeneficiaryBank2?.beneficiary}`}>
                  Beneficiary Bank 2                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank3?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 3-${filters.division?.BeneficiaryBank3?.beneficiary}`}>
                  Beneficiary Bank 3                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank4?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 4-${filters.division?.BeneficiaryBank4?.beneficiary}`}>
                  Beneficiary Bank 4                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank5?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 5-${filters.division?.BeneficiaryBank5?.beneficiary}`}>
                  Beneficiary Bank 5                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank6?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 6-${filters.division?.BeneficiaryBank6?.beneficiary}`}>
                  Beneficiary Bank 6                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank7?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 7-${filters.division?.BeneficiaryBank7?.beneficiary}`}>
                  Beneficiary Bank 7                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank8?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 8-${filters.division?.BeneficiaryBank8?.beneficiary}`}>
                  Beneficiary Bank 8                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank9?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 9-${filters.division?.BeneficiaryBank9?.beneficiary}`}>
                  Beneficiary Bank 9                 </MenuItem>
                  ) : ''}

                  {filters.division?.BeneficiaryBank10?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 10-${filters.division?.BeneficiaryBank10?.beneficiary}`}>
                  Beneficiary Bank 10                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank10?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 11-${filters.division?.BeneficiaryBank11?.beneficiary}`}>
                  Beneficiary Bank 11                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank12?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 12-${filters.division?.BeneficiaryBank12?.beneficiary}`}>
                  Beneficiary Bank 12                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank13?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 13-${filters.division?.BeneficiaryBank13?.beneficiary}`}>
                  Beneficiary Bank 13                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank14?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 14-${filters.division?.BeneficiaryBank14?.beneficiary}`}>
                  Beneficiary Bank 14                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank15?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 15-${filters.division?.BeneficiaryBank15?.beneficiary}`}>
                  Beneficiary Bank 15                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank16?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 16-${filters.division?.BeneficiaryBank16?.beneficiary}`}>
                  Beneficiary Bank 16                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank17?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 17-${filters.division?.BeneficiaryBank17?.beneficiary}`}>
                  Beneficiary Bank 17                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank18?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 18-${filters.division?.BeneficiaryBank18?.beneficiary}`}>
                  Beneficiary Bank 18                 </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank19?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 19-${filters.division?.BeneficiaryBank19?.beneficiary}`}>
                  Beneficiary Bank 19                  </MenuItem>
                  ) : ''}
                  {filters.division?.BeneficiaryBank20?.bankName ? (
                    <MenuItem value={`Beneficiary Bank 20-${filters.division?.BeneficiaryBank20?.beneficiary}`}>
                  Beneficiary Bank 20
                    </MenuItem>
                  ) : ''}


                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </section>

        {/* Action Buttons */}
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => console.log(filters)}
            >
            Apply Filters
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setFilters({
                division: '',
                subdivision: '',
                allDivisions: false,
                iroStatus: '',
                sanctionedAsPer: '',
                iroDateFrom: '',
                iroDateTo: '',
                reqAmountFrom: '',
                reqAmountTo: '',
                sanctAmountFrom: '',
                sanctAmountTo: '',
                mainCategory: '',
                subCategory1: '',
                subCategory2: '',
                subCategory3: '',
                beneficiaryName: '',
                sanctionedBank: '',
              })}
            >
            Reset
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default IROReportFilter;

