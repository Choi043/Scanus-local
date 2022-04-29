import { Body, Controller, Post } from "@nestjs/common";
import { BrandRegisterService } from "../application/brand.register.service";
import { BrandRegisterDto } from "../application/dto/brand.register";

@Controller('brand')
export class BrandRegisterController {
    constructor(
        private readonly brandRegisterService: BrandRegisterService
    ) {}
    
    @Post('/register')
    // @UseGuards(JwtAuthGuard, RoleGuard)
    // @Roles(AdminType.MASTER)
    async registerCompany(@Body() brandRegisterDto: BrandRegisterDto): Promise<any> {
        return await this.brandRegisterService.register(brandRegisterDto);
    }
}