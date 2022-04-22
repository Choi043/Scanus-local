import { Body, Controller, Param, Patch, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { ProductEditDto } from "../application/dto/product.edit";
import { ProductEditService } from "../application/product.edit.service";

@Controller('product')
export class ProductEditController {
    constructor(
        private readonly productEditService: ProductEditService
    ){}
    
    @Patch('/edit/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(ValidationPipe)
    async editCompany(
        @Param('id') id: number,
        @Body() productEditDto: ProductEditDto
    ) {
        return this.productEditService.editProduct(id, productEditDto);
    }
}