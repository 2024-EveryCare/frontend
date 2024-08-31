import axios from 'axios';

export const deleteDrug = async (
  drugName: string,
  intakeStart: string,
  intakeEnd: string,
): Promise<void> => {
  await axios.delete(`http://localhost:8080/api/v1/medicines/records`, {
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
