import { Body, Controller, Get, Post, Res, UseGuards } from "@nestjs/common";
import { response } from "express";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { AuthSessionService } from "src/domains/auth/application/auth.session.service";
import { AdminInfoService } from "../application/admin.info.service";
import { AdminSignInService } from "../application/admin.sign-in.service";
import { AdminSignInDto } from "../application/dto/admin.sign-in";
import { REFRESH_TOKEN } from "../domain/admin.constrants";
import { AdminEntity } from "../domain/admin.entity";

@Controller('admin')
export class AdminSignInController {
    constructor(
        private readonly adminSignInService: AdminSignInService,
        private readonly authSessionService: AuthSessionService,
        private readonly adminInfoService: AdminInfoService,
    ) { }

    @Post('/sign-in')
    async signIn(
        @Body() adminSignInDto: AdminSignInDto,
        // @Res() response
    ): Promise<{ accessToken: string }> {
        const { adminSignInResponse, accessToken, refreshToken } =
            await this.adminSignInService.signIn(adminSignInDto);

        // response.cookie(REFRESH_TOKEN, refreshToken, {
        //     httpOnly: true,
        //     secure: true,
        // })

        // console.log('response: ', response);
        // console.log("Test")
        // this.authSessionService.printSession();

        return { ...adminSignInResponse, accessToken }
    }

    @Get('/refresh')
    // @UseGuards(RefreshGuard)
    async refreshToken(
        @CurrentUser() user: AdminEntity,
        @Res() response
    ) {
        const { accessToken, refreshToken } =
            await this.adminSignInService.refreshToken(user);
        response.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true });
        return { accessToken };
    }

}