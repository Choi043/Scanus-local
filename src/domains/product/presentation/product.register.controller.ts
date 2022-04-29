import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { ProductRegisterDto } from "../application/dto/product.register";
import { ProductRegisterService } from "../application/product.register.service";

@Controller('product')
export class ProductRegisterController {
    constructor(
        private readonly productRegisterService: ProductRegisterService
    ) {}

    @Post('/register')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async registerCompany(@Body() productRegisterDto: ProductRegisterDto): Promise<any> {
        return await this.productRegisterService.register(productRegisterDto);
    }
}