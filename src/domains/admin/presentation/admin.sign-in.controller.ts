import { Body, Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { Request, Response, response } from "express";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard, RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
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
        @Res() response: Response
    ):
        // Promise<{ accessToken: string }> 
        Promise<any> {
        const { adminSignInResponse, accessToken, refreshToken } =
            await this.adminSignInService.signIn(adminSignInDto);

        response.cookie(REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            // secure: true,
        })

        return response.send({ ...adminSignInResponse, accessToken, refreshToken })
        // return { ...adminSignInResponse, accessToken, refreshToken }
    }

    @Get('/cookies')
    getCookies(@Req() req: Request, @Res() res: Response): any {
        const jwt = req.cookies[REFRESH_TOKEN]
        return res.send(jwt);
    }

    @Get('/refresh')
    @UseGuards(RefreshGuard)
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