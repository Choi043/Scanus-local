import { Controller, Get, Param, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { CurrentRequest } from "src/commons/decorator/decorator.current.req";
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

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async getInfoList(
        @CurrentRequest() req: Request
    ) {        
        let condition
        let find
        if( req === undefined ) {
            condition = 'pro_idx'
            find = ''
        } else {
            condition = req[0]
            find = String(req[1])
        }
        return await this.productInfoService.infoChannel( condition, find );
    }
}