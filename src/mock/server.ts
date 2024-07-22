import { setupServer } from 'msw/node';
import { pillSearchHandler } from './handler/PillSearchHandler';
import { ocrReturnhandler } from './handler/OcrReturnHandler';
import { drugDataSubmitHandler } from './handler/DrugDataSubmitHandler';
export const server = setupServer(
  ...pillSearchHandler,
  ...ocrReturnhandler,
  ...drugDataSubmitHandler,
);
