import express from 'express';
import cors from 'cors';
import { errorMiddleware } from './shared/middlewares/error.middleware';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './shared/docs/swagger';
import setupRoutes from './routes';
export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

setupRoutes(app);
app.use(errorMiddleware);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));