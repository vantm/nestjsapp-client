import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { UserAttributesDto } from '@app/auth/dto/user-attributes.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy<
  typeof Strategy,
  UserAttributesDto
>(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKeyProvider: (request, rawJwtToken, done) => {
        done(null, 'your-secure-secret-key');
      },
      issuer: 'nestjsapp-client',
      algorithms: ['HS256'],
    });
  }

  validate(payload: any, done: VerifiedCallback): UserAttributesDto | null {
    if (!this.isValidSubject(payload)) {
      done(new Error('Invalid token payload: missing sub claim'), false);
      return null;
    }
    const attrs = new UserAttributesDto(payload.sub);
    done(null, attrs);
    return attrs;
  }

  isValidSubject(payload: any): payload is { sub: string } {
    return (
      typeof payload === 'object' &&
      payload !== null &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      typeof payload.sub === 'string' &&
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      payload.sub.length > 0
    );
  }
}
