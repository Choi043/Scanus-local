import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { ProductInfoService } from "../application/product.info.service";

@Controller('product')
export class ProductInfoController {
    constructor(
        private readonly productInfoService : ProductInfoService
    ) {}
    
    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.productInfoService.getProductInfo(id);
    }
}