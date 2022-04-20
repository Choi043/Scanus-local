import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getMain(): string {
    return `Scanus Main Page!`
  }
}
