import { Body, Controller, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { BrandEditService } from "../application/brand.edit.Service";
import { BrandEditDto } from "../application/dto/brand.edit";

@Controller('brand')
export class BrandEditController {
    constructor(
        private readonly brandEditService: BrandEditService
    ) {}
    
    @Patch('/edit/:id')
    @UsePipes(ValidationPipe)
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    async editCompany(
        @Param('id') id: number,
        @Body() brandEditDto: BrandEditDto
    ):Promise<BrandEditDto> {
        return this.brandEditService.editBrand(id, brandEditDto);
    }
}