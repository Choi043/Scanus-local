import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { BrandRegisterService } from "../application/brand.register.service";
import { BrandRegisterDto } from "../application/dto/brand.register";

@Controller('brand')
export class BrandRegisterController {
    constructor(
        private readonly brandRegisterService: BrandRegisterService
    ) {}
    
    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async registerCompany(@Body() brandRegisterDto: BrandRegisterDto): Promise<any> {
        return await this.brandRegisterService.register(brandRegisterDto);
    }
}