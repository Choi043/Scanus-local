import { Body, Controller, Delete, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { Roles } from "src/commons/role/role.decorator";
import { RoleGuard } from "src/commons/role/role.guard";
import { AdminType } from "src/domains/admin/domain/admin.role";
import { ProductDeleteService } from "../application/product.delete.service";

@Controller('product')
export class ProductDeleteController {
    constructor(
        private readonly productDeleteService: ProductDeleteService
    ){}

    @Delete('/delete')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Roles(AdminType.MASTER)
    @UsePipes(ValidationPipe)
    async deleteProduct(
        @Body('product_idx') product_idx: number
    ):Promise<any> {
        return this.productDeleteService.deleteProduct(product_idx);
    }
}