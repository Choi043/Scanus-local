import { EntityRepository, Repository } from "typeorm";
import { AdminSignUpDto } from "../application/dto/admin.sign-up";
import { AdminEntity } from "./admin.entity";
import * as bcrypt from 'bcryptjs';
import { AdminInfoDto } from "../application/dto/admin.info";
import { PaginationOptions } from "src/commons/typeorm/paginate/pagination.option";
import { Pagination } from "src/commons/typeorm/paginate";

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {

    async createAdmin(adminSignUpDto: AdminSignUpDto): Promise<AdminEntity> {
        const { admin_id, admin_pw, mn_nm, mn_tel, mn_email, admin_type } = adminSignUpDto

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(admin_pw, salt);

        const adminAccount: AdminEntity = this.create({
            admin_id,
            admin_pw: hashedPassword,
            mn_nm,
            mn_tel,
            mn_email,
            admin_type
        });

        return await this.save(adminAccount);
    }

    async findAll(
        adminList: AdminInfoDto,
        user: AdminEntity
    ): Promise<AdminInfoDto[]> {

        return
    }
}