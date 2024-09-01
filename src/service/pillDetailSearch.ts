import axios from 'axios';
import { baseInstance } from './config';

export interface DrugData {
  itemName: string;
  etcOtcCode: string;
  chart: string;
  storageMethod: string;
  validTerm: string;
  eeDocData: string;
  udDocData: string;
  nbDocData: string;
}

export const pillDetailSearch = async (drugName: string): Promise<DrugData> => {
  return baseInstance
    .get('https://www.everycare.site/api/v1/medicines/details', {
      params: { drugName },
    })
    .then((response) => response.data);
};
