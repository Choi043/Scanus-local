import { Controller, Get, Param, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { BrandInfoService } from "../application/brand.info.service";

@Controller('brand')
export class BrandInfoController {
    constructor(
        private readonly brandInfoService: BrandInfoService
    ) { }

    @Get('/info/:id')
    @UseGuards(JwtAuthGuard)
    async getInfo(@Param('id') id: number) {
        return this.brandInfoService.getBrandInfo(id);
    }

    @Get('/infolist')
    @UseGuards(JwtAuthGuard)
    async list(
        @Query('take') take: number,
        @Query('page') page: number,
    ) {
        return this.brandInfoService.list({ take, page });
    }
}