import { Body, Controller, Post } from "@nestjs/common";
import { AdminSignInService } from "../application/admin.sign-in.service";
import { AdminSignInDto } from "../application/dto/admin.sign-in";

@Controller('admin')
export class AdminSignInController {
    constructor(private readonly adminSignInService: AdminSignInService) {}

    @Post('sign-in')
    async signIn(@Body() adminSignInDto: AdminSignInDto): Promise<{ accessToken: string }> {
        return this.adminSignInService.signIn(adminSignInDto);
    }
}