import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { AdminEntity } from "src/domains/admin/domain/admin.entity";
import { AdminType } from "src/domains/admin/domain/admin.role";

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]> ('roles', context.getHandler());
        if(!roles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user as AdminEntity;
        const role: AdminType = user.admin_type;
        if (!(user && user.admin_type && roles.includes(role))) {
            throw new BadRequestException('접근 권한이 존재하지 않습니다.');
        }
        return true;
    }
}