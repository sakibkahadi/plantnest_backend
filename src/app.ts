import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

//parser
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [''],
    credentials: true,
  }),
);
// application Routes
app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from setup file');
});
app.use(globalErrorHandler);

app.use(notFound);

export default app;
