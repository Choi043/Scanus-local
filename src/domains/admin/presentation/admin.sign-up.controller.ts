import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminSignUpService } from "../application/admin.sign-up.service";
import { AdminSignUpDto } from "../application/dto/admin.sign-up";
import { AdminType } from "../domain/admin.role";

@Controller('admin')
export class AdminSignUpController {
    constructor(private readonly adminSignUpService: AdminSignUpService) {}

    @Post('/register')
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Roles(AdminType.MASTER)
    async registerAdmin(@Body() adminSignUpDto: AdminSignUpDto): Promise<any> {
        return await this.adminSignUpService.signUp(adminSignUpDto);
    }
}