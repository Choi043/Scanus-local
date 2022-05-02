import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Cookies } from "src/commons/decorator/decorator.cookies";
import { RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { AuthSessionService } from "src/domains/auth/application/auth.session.service";
import { AdminSignOutService } from "../application/admin-sign-out.service";
import { REFRESH_TOKEN } from "../domain/admin.constrants";

@Controller('admin')
@UseGuards(RefreshGuard)
export class AdminSignOutController {
    constructor(
        private readonly adminSignOutService: AdminSignOutService,
        private readonly authSessionService: AuthSessionService,
    ) {}

    @Post('sign-out')
    async signOut(@Cookies(REFRESH_TOKEN) refreshToken: string, @Res() response) {
        response.clearCookie(REFRESH_TOKEN);
        return this.adminSignOutService.signOut(refreshToken);
    }

    @Post('/logout')
    logout(@Res() res: Response): any{
        res.cookie(REFRESH_TOKEN, '', {
            maxAge: 0
        })
        return res.send({
            message: 'success'
        })
    }
}