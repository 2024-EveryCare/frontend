import { setupWorker } from 'msw/browser';
import { pillSearchHandler } from './handler/PillSearchHandler';
import { ocrReturnhandler } from './handler/OcrReturnHandler';
import { drugDataSubmitHandler } from './handler/DrugDataSubmitHandler';

export const worker = setupWorker(
  ...pillSearchHandler,
  ...ocrReturnhandler,
  ...drugDataSubmitHandler,
);

worker.start();
