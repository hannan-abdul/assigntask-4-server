import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/Product/product.route';

const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

// routes
app.use('/api', ProductRoutes);

const getAController = (req: Request, res: Response) => {
  res.send('Fitness Equipment Server is Running');
};

app.get('/', getAController);

export default app;
