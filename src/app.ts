import express, { Application, Request, Response, NextFunction } from 'express';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', require('./routes'));

// Error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

export default app;
