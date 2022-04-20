import { SetMetadata } from "@nestjs/common";
import { AdminRoleType } from "src/domains/admin/domain/admin.role";

export const Roles = (...roles: AdminRoleType[]): any =>
    SetMetadata('roles', roles);