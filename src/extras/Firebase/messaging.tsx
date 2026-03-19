import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import {
  getMessaging,
  isSupported as messagingIsSupported,
  getToken,
  onMessage,
} from 'firebase/messaging';
import app from './App';
import { Box, Typography } from '@mui/material';
import UserServices from '../../modules/User/extras/UserServices';

const messaging = getMessaging(app);

onMessage(messaging, (payload) => {
  enqueueSnackbar({
    message: (
      <Box sx={{ maxWidth: 500 }}>
        <Typography variant="h6">
          {payload.data?.title &&
            (payload.data?.title.length <= 50 ?
              payload.data?.title :
              payload.data?.title.substring(0, 47) + '...')}
        </Typography>
        <Typography variant="body1">
          {payload.data?.body &&
            (payload.data?.body.length <= 200 ?
              payload.data?.body :
              payload.data?.body.substring(0, 197) + '...')}
        </Typography>
      </Box>
    ),
    variant: 'info',
  });
});

export const subscribe = async () => {
  if (await messagingIsSupported()) {
    Notification.requestPermission().then((permission) => {
      console.log(permission);
      if (permission === 'granted') {
        console.log('Notification Permission granted');
        generateToken();
      }
    });
  }
};

const generateToken = () => {
  if (localStorage.getItem('fcm_token') === null) {
    getToken(messaging, {
      vapidKey:
        'BI-OOak0cIS1DJk1uLlSXMIQxg73BTLShc-Su-UfHDNAS49xQtKwtXIOaK-j2swyjYkk_i7Dlernvhqe3DV3YaQ',
    })
      .then((token) => {
        console.log({ token });
        UserServices.saveFCMToken(token)
          .then((res) => {
            localStorage.setItem('fcm_token', token);
            enqueueSnackbar({
              message: res.message,
              variant: 'success',
            });
          })
          .catch((res) => {
            enqueueSnackbar({
              message: res.error,
              variant: 'error',
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// export const unsubscribe = () => {
//   return new Promise((resolve, reject) => {
//     if (localStorage.getItem('fcm_token') !== null) {
//       getToken(messaging)
//       .then((token) => {
//         UserServices.deleteFCMToken(token)
//           .then((res) => {
//             localStorage.removeItem('fcm_token');
//             enqueueSnackbar({
//               message: res.message,
//               variant: 'success',
//             });
//             resolve(res);
//           })
//           .catch((res) => {
//             enqueueSnackbar({
//               message: res.error,
//               variant: 'error',
//             });
//             reject(res);
//           });
//       })
//       .catch((err) => {
//         console.log(err);
//         reject(err);
//       });
//     }
//   });
// };


export const unsubscribe = async () => {
  try {
    if (await messagingIsSupported()) {
      const permission = await Notification.requestPermission();

      if (permission === 'granted') {
        console.log('Notification Permission granted');
        const token = await getToken(messaging, {
          vapidKey:
            'BI-OOak0cIS1DJk1uLlSXMIQxg73BTLShc-Su-UfHDNAS49xQtKwtXIOaK-j2swyjYkk_i7Dlernvhqe3DV3YaQ',
        });
        const res = await UserServices.deleteFCMToken(token);
        localStorage.removeItem('fcm_token');
        enqueueSnackbar({
          message: res.message,
          variant: 'success',
        });
      }
    }

    return null;
  } catch (error) {
    return Promise.reject(error);
  }
};
