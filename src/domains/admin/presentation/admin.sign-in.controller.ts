import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { AdminSignInService } from "../application/admin.sign-in.service";
import { AdminSignInDto } from "../application/dto/admin.sign-in";
import { REFRESH_TOKEN } from "../domain/admin.constrants";
import { AdminEntity } from "../domain/admin.entity";

@Controller('admin')
export class AdminSignInController {
    constructor(private readonly adminSignInService: AdminSignInService) { }

    @Post('/sign-in')
    async signIn(@Body() adminSignInDto: AdminSignInDto): Promise<{ accessToken: string }> {
        return this.adminSignInService.signIn(adminSignInDto);
    }

    @Post('/refresh')
    @UseGuards(RefreshGuard)
    async refreshToken(@CurrentUser() user: AdminEntity, @Res() response) {
        const { accessToken, refreshToken } =
            await this.adminSignInService.refreshToken(user);
        response.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true });
        return { accessToken };
    }
}