import { EntityRepository, Repository } from "typeorm";
import { AdminSignUpDto } from "../application/dto/admin.sign-up";
import { AdminEntity } from "./admin.entity";
import * as bcrypt from 'bcryptjs';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {

    async createAdmin(adminSignUpDto: AdminSignUpDto): Promise<AdminEntity> {
        const { userId, password, manager, phone, email } = adminSignUpDto

        const salt = await bcrypt.genSalt({})
        const hashedPassword = await bcrypt.hash(password, salt);

        const adminAccount: AdminEntity = this.create({
            userId,
            password: hashedPassword,
            manager,
            phone,
            email
        });

        return await this.save(adminAccount);
    }
}