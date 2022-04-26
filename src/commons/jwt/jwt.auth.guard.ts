import { ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt-access') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context)
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw (
                err || new UnauthorizedException('액세스 토큰이 유효하지 않습니다.')
            );
        }
        return user;
    }
}

@Injectable()
export class RefreshGuard extends AuthGuard('jwt-refresh') {
    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }

    handleRequest(err: any, user: any, info: any) {
        if (err || !user) {
            throw (
                err || new UnauthorizedException('리프레시 토큰이 유효하지 않습니다.')
            );
        }
        return user;
    }
}