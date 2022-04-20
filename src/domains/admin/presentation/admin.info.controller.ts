import { Controller, Get, UseGuards } from "@nestjs/common";
import { CurrentUser } from "src/commons/decorator/decorator.current.user";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { AdminInfoService } from "../application/admin.info.service";
import { AdminEntity } from "../domain/admin.entity";

@Controller('admin')
export class AdminInfoController {
    constructor(private readonly adminInfoService: AdminInfoService) {}

    @Get('/info')
    @UseGuards(JwtAuthGuard)
    async getInfo(@CurrentUser() user: AdminEntity) {
        const { admin_idx } = user;
        return this.adminInfoService.getAdminInfo(admin_idx);
    }

    
}