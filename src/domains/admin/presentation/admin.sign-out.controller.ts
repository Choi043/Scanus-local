import { Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { Cookies } from "src/commons/decorator/decorator.cookies";
import { RefreshGuard } from "src/commons/jwt/jwt.auth.guard";
import { AdminSignOutService } from "../application/admin-sign-out.service";
import { REFRESH_TOKEN } from "../domain/admin.constrants";

@Controller('admin')
@UseGuards(RefreshGuard)
export class AdminSignOutController {
    constructor(
        private readonly adminSignOutService: AdminSignOutService,
    ) {}

    // 세션에서 검증 후 db에 빈 값을 upsert 해주는 방식
    @Post('sign-out')
    async signOut(@Cookies(REFRESH_TOKEN) refreshToken: string, @Res() response: Response) {
        response.clearCookie(REFRESH_TOKEN);
        return this.adminSignOutService.signOut(refreshToken);
    }

    // response cookie에서 값을 비워주는 방식
    @Post('/logout')
    logout(@Res() response: Response): any{
        response.cookie(REFRESH_TOKEN, '', {
            maxAge: 0
        })
        return response.send({
            message: 'logout-success'
        })
    }
}