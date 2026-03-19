import { Checkbox, FormControl, FormControlLabel, Grid, Typography } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import UserServices from './extras/UserServices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const PermissionManager = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    UserServices.getById(userId as string, { withPermissions: true })
    .then((res) => setUser(res.data))
    .catch((error) => enqueueSnackbar({
      variant: 'error',
      message: error.message,
    }));
  }, []);
  // console.log(user?.permissions.map((e)=>e.Settings), 'user?.permissions');
  const settingKeys = Object.keys(user?.permissions || {}).filter(
    (key) =>
      !['_id', '__v', 'createdAt', 'updatedAt'].includes(key) &&
      key.startsWith('SETTINGS'),
  );

  const allChecked = settingKeys.every((key) => user?.permissions?.[key]);
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (settingKeys.length > 0) {
      const allChecked = settingKeys.every((key) => user?.permissions?.[key]);
      setSelectAll(allChecked);
    }
  }, [user?.permissions]); // Recalculate whenever permissions change
  const handleSelectAll = (e: { target: { checked: any } }) => {
    const checked = e.target.checked;
    setSelectAll(checked);

    const updatedPermissions = settingKeys.reduce(
      (acc, key) => ({ ...acc, [key]: checked }),
      {},
    );

    setUser((user: { permissions: any}) =>
      !user || !user.permissions ?
        null :
        { ...user, permissions: { ...user.permissions, ...updatedPermissions } },
    );

    // Update all permissions in the backend
    Promise.all(
      settingKeys.map((key) =>
        UserServices.editPermission(user._id, { name: key, value: checked }),
      ),
    )
      .then(() => {
        enqueueSnackbar({
          variant: 'success',
          message: `All SETTINGS permissions have been ${checked ? 'enabled' : 'disabled'}.`,
        });
      })
      .catch((error) => {
        enqueueSnackbar({
          variant: 'error',
          message: error.message,
        });

        // Revert changes on failure
        setUser((user:any) =>
          !user || !user.permissions ?
            null :
            {
              ...user,
              permissions: settingKeys.reduce(
                (acc, key) => ({ ...acc, [key]: !checked }),
                {},
              ),
            },
        );
      });
  };
  return (
    <CommonPageLayout title='Permission Manager'>
      <Grid container spacing={3}>
        {user?.permissions && Object.keys(user?.permissions).filter((key) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)&& !key.startsWith('SETTINGS')).map((key) => (
          <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
            <FormControl>
              <FormControlLabel
                label={key.replaceAll('_', ' ')}
                control={
                  <Checkbox
                    checked={user?.permissions && user?.permissions[key as Permission]}
                    onChange={(e) =>{
                      const checked = e.target.checked;
                      setUser((user: { permissions: IUserPermissions}) => (!user || !user.permissions) ? null : ({
                        ...user,
                        permissions: { ...(user.permissions as IUserPermissions), [key]: checked },
                      }));
                      UserServices.editPermission(user._id as string, { name: key, value: checked })
                      .then((res)=>{
                        enqueueSnackbar({
                          variant: 'success',
                          message: res.message,
                        });
                      }) .catch((error) => {
                        enqueueSnackbar({
                          variant: 'error',
                          message: error.message,
                        });
                        setUser((user: { permissions: IUserPermissions }) => (!user || !user.permissions) ? null : ({
                          ...user,
                          permissions: { ...(user.permissions as IUserPermissions), [key]: !checked },
                        }));
                      });
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
      <br />
      <Typography sx={{ fontSize: 20, fontWeight: 800 }} variant='h6'>Settings Permissions</Typography>
      <br />
      <Grid container spacing={3}>
        {/* Select All Checkbox */}
        {settingKeys.length > 0 && (
          <Grid item xs={12}>
            <FormControl sx={{ color: 'red' }}>
              <FormControlLabel
                sx={{ color: 'red' }}
                label="SELECT All SETTINGS PERMISSIONS"
                control={
                  <Checkbox sx={{ color: 'red' }} checked={selectAll} onChange={handleSelectAll} />
                }
              />
            </FormControl>
          </Grid>
        )}

        {/* Individual Permission Checkboxes */}
        {settingKeys.map((key) => (
          <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
            <FormControl>
              <FormControlLabel
                label={key.replace('SETTINGS_', '').replaceAll('_', ' ')}
                control={
                  <Checkbox
                    checked={user?.permissions?.[key] || false}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setUser((user: { permissions: any }) =>
                        !user || !user.permissions ?
                          null :
                          {
                            ...user,
                            permissions: { ...user.permissions, [key]: checked },
                          },
                      );

                      UserServices.editPermission(user._id, { name: key, value: checked })
                      .then(() => {
                        enqueueSnackbar({
                          variant: 'success',
                          message: `${key.replaceAll('_', ' ')} permission updated.`,
                        });
                      })
                      .catch((error) => {
                        enqueueSnackbar({
                          variant: 'error',
                          message: error.message,
                        });

                        // Revert on failure
                        setUser((user: { permissions: any }) =>
                          !user || !user.permissions ?
                            null :
                            {
                              ...user,
                              permissions: { ...user.permissions, [key]: !checked },
                            },
                        );
                      });
                    }}
                  />
                }
              />
            </FormControl>
          </Grid>
        ))}
      </Grid>
    </CommonPageLayout>
  );
};

export default PermissionManager;

