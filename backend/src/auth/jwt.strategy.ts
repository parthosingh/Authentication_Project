import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    // Get the secret first and validate it
    const secret = configService.get<string>('MY_JWT_SECRET');
    
    // This check ensures TypeScript knows secret is NOT undefined
    if (!secret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    // Now pass the validated secret to super()
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // TypeScript now knows this is definitely a string
    });
  }

  async validate(payload: any) {
    if (!payload) {
      throw new UnauthorizedException();
    }
    return { id: payload.sub, email: payload.email, role: payload.role };
  }
}