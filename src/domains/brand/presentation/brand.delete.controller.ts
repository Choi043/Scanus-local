import { Controller } from "@nestjs/common";

@Controller('brand')
export class BrandDeleteController {
    constructor(
        private readonly brandDeleteService
    )
}