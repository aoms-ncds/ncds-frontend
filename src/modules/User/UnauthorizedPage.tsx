import { Typography } from '@mui/material';
import Lottie from 'react-lottie';
import Animations from '../../Animations';
import CommonPageLayout from '../../components/CommonPageLayout';

interface UnauthorizedPageProps{
  missingPermissions: Permission[];
}
const UnauthorizedPage = (props: UnauthorizedPageProps) => {
  return (
    <CommonPageLayout>
      <div style={{ height: '20vh' }}></div>
      <Lottie
        options={{
          loop: false,
          autoplay: true,
          animationData: Animations.accessDenied2,
          rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
          },
        }}
        height={200}
        width={200}
        // isStopped={.state.isStopped}
        // isPaused={.state.isPaused}
      />
      <br />
      <Typography
        variant="h4"
        sx={{ textAlign: 'center', color: 'red', fontWeight: 'bold' }}
      >
        You don&apos;t have permission to access this page!
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <Typography
          variant="caption"
          sx={{ textAlign: 'center', color: 'red' }}
        >
          <b>Missing permissions:</b> &quot;{props.missingPermissions.join('", "').replaceAll('_', ' ')}&quot;
        </Typography>
      </div>

    </CommonPageLayout>
  );
};

export default UnauthorizedPage;
