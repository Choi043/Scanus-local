import { SetMetadata } from "@nestjs/common";
import { AdminType } from "src/domains/admin/domain/admin.role";

export const Roles = (...roles: AdminType[]): any =>
    SetMetadata('roles', roles);