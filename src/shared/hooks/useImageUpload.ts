import { useCallback, useState } from 'react';
import { pickImageFromDevice } from '../utils/image-picker';
import ApiClient from '@/store/services/ApiClient';
import { default_API_URL } from '@/config';
import { AxiosResponse } from 'axios';

export const getFileNameFromPath = (path: string) =>
  path.substring(path.lastIndexOf('/') + 1, path.length);

const useImageUpload = (props: {
  height: number;
  width: number;
  withCircleOverlay?: boolean;
}) => {
  const [image, setImage] = useState<{ filename: string; url: string } | null>(
    null,
  );
  const [error, setError] = useState<any>(null);

  const uploadImageApi = useCallback(
    async (file: { uri: string; type: string; name: string }) => {
      const formData = new FormData();

      // @ts-expect-error
      formData.append('image', file);
      try {
        const res: AxiosResponse<{ filename: string; url: string }, {}> =
          await ApiClient({
            baseURL: default_API_URL + '/image/upload',
            method: 'POST',
            data: formData,
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });

        return res.data;
      } catch (err) {
        err && setError(err);
        return null;
      }
    },
    [],
  );
  const uploadImage = useCallback(async () => {
    try {
      const asset = await pickImageFromDevice(props);

      if (asset) {
        const response = await uploadImageApi({
          name: asset.filename || getFileNameFromPath(asset.path),
          type: asset.mime,
          uri: asset.path,
        });

        if (response) {
          setImage(response);
        }
      }
    } catch (err) {
      err && setError(err);
    }
  }, [props, uploadImageApi]);

  const clear = useCallback(() => {
    setError(null);
    setImage(null);
  }, []);
  return {
    uploadImage,
    data: image,
    error,
    clear,
  };
};

export default useImageUpload;
