import axios from 'axios';

export const searchDrug = async (drugName: string) => {
  const response = await axios.get(
    `http://localhost:8080/api/v1/medicines/findName/${drugName}`,
  );

  console.log(response);
  console.log(response.data);
  console.log(response.data.data);
  console.log(response.data.data.data);

  return response.data.data;
};
