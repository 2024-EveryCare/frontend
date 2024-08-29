import axios from 'axios';

export const qrCreateService = async () => {
  const response = await axios.get(
    'http://localhost:8080/api/v1/medicines/photoUpload',
    {
      withCredentials: true,
    },
  );
  return response.data.qrCode;
};
