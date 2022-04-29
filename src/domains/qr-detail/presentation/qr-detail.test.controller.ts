import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { Request } from "express";
import { JwtAuthGuard } from "src/commons/jwt/jwt.auth.guard";
import { QRDetailColumnCreateService } from "../application/qr-detail.column-create.service";

@Controller('test')
export class TestController {
    constructor( private readonly qrDetailTest: QRDetailColumnCreateService) {}

    @Post('/secure')
    @UseGuards(JwtAuthGuard)
    async test(@Req() req:Request) {
        const { secure_cd } = req.body;

        return this.qrDetailTest.secureCode(secure_cd);
    }

    @Post('/furl')
    @UseGuards(JwtAuthGuard)
    async test2(@Req() req:Request) {
        const { cmpny_cd } = req.body

        // return this.qrDetailTest.fullUrl(cmpny_cd);
    }
}