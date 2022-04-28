import { AdminEntity } from '../../domain/admin.entity';
import { PickType } from '@nestjs/mapped-types';

export class AdminSignInResponse extends PickType(AdminEntity, [
    'admin_idx',
    'mn_nm',
    'mn_email',
    'admin_type',
] as const) {
    static of(adminEntity: AdminEntity): AdminSignInResponse {
        const response = new AdminSignInResponse();
        response.admin_idx = adminEntity.admin_idx;
        response.mn_nm = adminEntity.mn_nm;
        response.mn_email = adminEntity.mn_email;
        response.admin_type = adminEntity.admin_type;

        return response;
    }
}
