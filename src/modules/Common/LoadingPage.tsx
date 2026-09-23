<<<<<<< HEAD
import Lottie from 'react-lottie';
import Animations from '../../Animations';

const LoadingPage = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: Animations.loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={200}
      width={200}
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      // isStopped={.state.isStopped}
      // isPaused={.state.isPaused}
    />
  );
};

export default LoadingPage;
=======
import Lottie from 'react-lottie';
import Animations from '../../Animations';

const LoadingPage = () => {
  return (
    <Lottie
      options={{
        loop: true,
        autoplay: true,
        animationData: Animations.loading,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      }}
      height={200}
      width={200}
      style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      // isStopped={.state.isStopped}
      // isPaused={.state.isPaused}
    />
  );
};

export default LoadingPage;
>>>>>>> 41531d0484f2a91a6b8c421d26685b73d8e8c7f0
