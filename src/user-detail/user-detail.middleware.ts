import { Injectable, NestMiddleware } from '@nestjs/common';
import type { Request, Response, NextFunction } from 'express';

@Injectable()
export class UserDetailMiddleware implements NestMiddleware {
  use(req: Request, _: Response, next: NextFunction) {

    const userToken = req.headers['x-user-id'];

    next();
  }
}
