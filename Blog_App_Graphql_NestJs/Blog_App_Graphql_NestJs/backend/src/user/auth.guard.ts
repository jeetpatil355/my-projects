/* eslint-disable prettier/prettier */
import { Injectable, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard as NestAuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard extends NestAuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const { req } = ctx.getContext();
    const authHeader = req.headers['authorization'];

    // Check if Authorization header is missing
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new Error('Authorization header is missing or invalid');
    }

    // Extract token from Authorization header
    const token = authHeader.split(' ')[1];

    // Verify and decode the token
    try {
      const decoded = this.jwtService.verify(token);
      
      // Add the decoded token to the request for later use
      req['decodedToken'] = decoded;

      return true;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
