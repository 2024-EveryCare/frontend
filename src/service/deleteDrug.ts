import axios from 'axios';
import { baseInstance } from './config';

export const deleteDrug = async (
  drugName: string,
  intakeStart: string,
  intakeEnd: string,
): Promise<void> => {
  await baseInstance.delete(`http://localhost:8080/api/v1/medicines/records`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,

    data: {
      drugName,
      intakeStart,
      intakeEnd,
    },
  });
};
