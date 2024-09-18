import LottieContants from '../constants/Lottie.contants';
import LottieComponenet from './LottieComponent';

const DotsLottie = () => (
  <LottieComponenet
    source={LottieContants.Dots}
    loop={true}
    autoPlay={true}
    width={120}
    height={120}
  />
);

export default DotsLottie;
