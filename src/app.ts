import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';

const app: Application = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'https://travel-budyy-client.vercel.app',
      '*',
    ],
    credentials: true,
  }),
);

app.get('/', (req: Request, res: Response) => {
  res.send({
    Message: 'Trip Buddy server...',
  });
});

app.use('/api/v1', router);

app.use(globalErrorHandler);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Api not found!!!',
    error: {
      path: req.originalUrl,
      message: 'Requested path is not found!',
    },
  });
});

export default app;
