import axios from 'axios';
import { baseInstance } from './config';

export const qrCreateService = async () => {
  const response = await baseInstance.get(
    'http://www.everycare.site/api/v1/medicines/photoUpload',
    {
      withCredentials: true,
    },
  );
  return response.data.qrCode;
};
