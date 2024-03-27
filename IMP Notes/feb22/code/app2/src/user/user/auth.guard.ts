import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Request,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    console.log(request.headers);
    const token = request.headers['token'];

    // check if token is missing
    if (!token || token.length == 0) {
      console.log('missing token');
      throw new UnauthorizedException();
    }

    // if token is available, verify it
    try {
      const payload = this.jwtService.verify(token);

      // add the payload to the request
      request['user'] = payload;
    } catch (ex) {
      throw new UnauthorizedException(ex);
    }

    return true;
  }
}
