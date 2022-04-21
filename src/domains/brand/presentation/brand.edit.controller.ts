import { Body, Controller, Param, Patch, UsePipes, ValidationPipe } from "@nestjs/common";
import { BrandEditService } from "../application/brand.edit.Service";
import { BrandEditDto } from "../application/dto/brand.edit";

@Controller('brand')
export class BrandEditController {
    constructor(
        private readonly brandEditService: BrandEditService
    ) {}
    
    @Patch('/edit/:id')
    @UsePipes(ValidationPipe)
    async editCompany(
        @Param('id') id: number,
        @Body() brandEditDto: BrandEditDto
    ):Promise<BrandEditDto> {
        return this.brandEditService.edit(id, brandEditDto);
    }
}