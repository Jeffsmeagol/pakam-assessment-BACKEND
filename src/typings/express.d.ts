import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: any; // Adjust the type as needed
    }
  }
}