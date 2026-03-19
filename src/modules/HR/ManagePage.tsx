import React, { useEffect, useState } from 'react';
import CommonPageLayout from '../../components/CommonPageLayout';
import { Button, Card, Grid } from '@mui/material';
import { Add as AddIcon, Download as DownloadIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import UsersList from '../User/components/UsersList';
import StaffServices from './extras/StaffServices';
import PermissionChecks from '../User/components/PermissionChecks';
import * as XLSX from 'xlsx';
import UserLifeCycleStates from '../User/extras/UserLifeCycleStates';

const HRManagePage = () => {
  const [staffs, setStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    StaffServices.getAll()
      .then((staffsRes) => setStaffs(staffsRes.data))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <CommonPageLayout title="Manage Staff">
      <Grid item xs={12} md={12}>
        <Card sx={{ maxWidth: '78vw', alignItems: 'center' }}>
          {/* <Grid item xs={12} lg={3} sx={{ px: 5, py: 2 }}>
            <PermissionChecks
              permissions={['WRITE_STAFFS']}
              granted={(
                <>
                  <Button
                    onClick={async () => {
                      const sheet =
                        staffs ?
                          staffs.map((user: Staff) => ([
                            user.staffCode,
                            user.basicDetails.firstName,
                            user.basicDetails.lastName,
                            user.supportDetails.designation?.name,
                            user.supportDetails.department?.name,
                            user.officialDetails.divisionHistory[user.officialDetails.divisionHistory.length - 1].subDivision,
                            user.basicDetails.phone,
                            user.basicDetails.email,
                            user.basicDetails.alternativePhone,
                            user.basicDetails.dateOfBirth,
                            user.basicDetails.field,
                            user.basicDetails.martialStatus,
                            user.basicDetails.knownLanguages?.map((lang) => lang.name)?.join(', '),
                            user.basicDetails.highestQualification,
                            user.status && UserLifeCycleStates.getStatusNameByCode(user.status as number),
                            user.officialDetails.dateOfJoining?.format('DD/MM/YYYY'),
                            user.officialDetails.status == 'Left' && user.officialDetails.dateOfLeaving ?
                              user.officialDetails.dateOfLeaving?.from(user.officialDetails.dateOfJoining, true) :
                              (user.officialDetails.dateOfJoining?.fromNow(true)),
                            ((user.supportStructure?.basic ?? 0) +
                              (user.supportStructure?.HRA ?? 0) +
                              (user.supportStructure?.spouseAllowance ?? 0) +
                              (user.supportStructure?.positionalAllowance ?? 0) +
                              (user.supportStructure?.specialAllowance ?? 0) +
                              (user.supportStructure?.telAllowance ?? 0)),
                            user.insurance?.impactNo,
                          ])) :
                          [];
                      const headers = [
                        'Staff Code',
                        'First Name',
                        'Last Name',
                        'Designation',
                        'Department',
                        'Mobile No',
                        'Email ID',
                        'Alt Phone',
                        'DOB',
                        'Field',
                        'Status',
                        'Date of Joining',
                        'No of year in Org',
                        'Net Support',
                      ];
                      const worksheet = XLSX.utils.json_to_sheet(sheet);
                      const workbook = XLSX.utils.book_new();
                      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet');
                      XLSX.utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1' });
                      XLSX.writeFile(workbook, 'Staff_Report.xlsx', { compression: true });
                    }}
                    startIcon={<DownloadIcon />}
                    color="primary" sx={{ float: 'right', marginBottom: 3, mr: 2 }}
                    variant="contained"
                  >Export</Button>
                  <Button variant="contained" sx={{ float: 'right', marginBottom: 3, mr: 2 }} startIcon={<AddIcon />} component={Link} to="/hr/add">
                    Add new
                  </Button>
                </>
              )}
            />
          </Grid> */}
          <UsersList<Staff> value={staffs} onChange={(newStaffs) => setStaffs(newStaffs)} action={'view'} options={{ kind: 'staff' }} />
        </Card>
      </Grid>
    </CommonPageLayout>
  );
};

export default HRManagePage;
