export const BASE_URL = 'https://api.bananatv.uz/api';
export const VIDEO_BASE_URL = `${BASE_URL}/video-stream/watch`;

const GOOGLE = {
  android:
    '622012536210-t8vlj88apopk6tfkeumum8grpamj1t4j.apps.googleusercontent.com',
  ios: '622012536210-95iakmt1ncea65ourkk96ofbgef738gb.apps.googleusercontent.com',
  web: '622012536210-7qjb208n14o4qvk6mojoq31gf7014p4c.apps.googleusercontent.com',
};

export default {
  BASE_URL: `${BASE_URL}/client`,
  IMAGE_URL: `${BASE_URL}/image`,
  GOOGLE,
};
