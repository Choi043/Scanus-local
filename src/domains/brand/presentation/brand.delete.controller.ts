import { Body, Controller, Delete, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { BrandDeleteService } from "../application/brand.delete.service";

@Controller('brand')
export class BrandDeleteController {
    constructor(
        private readonly brandDeleteService: BrandDeleteService
    ) {}

    @Delete('/delete')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    @UsePipes(ValidationPipe)
    async deleteBrand(
        @Body('brand_idx') brand_idx: number
    ):Promise<any> {
        return this.brandDeleteService.deleteBrand(brand_idx);
    }
}