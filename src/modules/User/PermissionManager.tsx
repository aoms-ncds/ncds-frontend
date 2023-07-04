import { Checkbox, FormControl, FormControlLabel, Grid } from '@mui/material';
import CommonPageLayout from '../../components/CommonPageLayout';
import UserServices from './extras/UserServices';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { enqueueSnackbar } from 'notistack';

const PermissionManager = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<Staff|IWorker|null>(null);
  useEffect(() => {
    UserServices.getById(userId as string, { withPermissions: true })
    .then((res) => setUser(res.data))
    .catch((error) => enqueueSnackbar({
      variant: 'error',
      message: error.message,
    }));
  }, []);

  return (
    <CommonPageLayout title='Permission Manager'>
      <Grid container spacing={3}>
        {user?.permissions && Object.keys(user?.permissions).filter((key) => !['_id', '__v', 'createdAt', 'updatedAt'].includes(key)).map((key) => (
          <Grid key={key} item xs={12} md={6} lg={4} xl={3}>
            <FormControl>
              <FormControlLabel
                label={key.replaceAll('_', ' ')}
                control={
                  <Checkbox
                    checked={user?.permissions && user?.permissions[key as Permission]}
                    onChange={(e) =>{
                      const checked = e.target.checked;
                      setUser((user) => (!user || !user.permissions) ? null : ({
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
                        setUser((user) => (!user || !user.permissions) ? null : ({
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
    </CommonPageLayout>
  );
};

export default PermissionManager;

