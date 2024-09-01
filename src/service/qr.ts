import axios from 'axios';
import { baseInstance } from './config';

export const qrCreateService = async () => {
  const response = await baseInstance.get(
    'https://www.everycare.site/api/v1/medicines/photoUpload',
    {
      withCredentials: true,
    },
  );
  return response.data.qrCode;
};
