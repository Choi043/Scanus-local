import { Body, Controller, Post } from "@nestjs/common";
import { AdminSignUpService } from "../application/admin.sign-up.service";
import { AdminSignUpDto } from "../application/dto/admin.sign-up";

@Controller('admin')
export class AdminSignUpController {
    constructor(private readonly adminSignUpService: AdminSignUpService) {}

    @Post('register')
    async registerAdmin(@Body() adminSignUpDto: AdminSignUpDto): Promise<any> {
        return await this.adminSignUpService.signUp(adminSignUpDto);
    }
}