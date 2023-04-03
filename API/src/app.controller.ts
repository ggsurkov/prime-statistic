import {Body, Controller, Get, Post} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('test')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): Object {
    return this.appService.getHello();
  }

  @Post('/token')
  getToken() {
    return this.appService.getToken();
  }

  @Post('/selling-list')
  getSellingList(@Body() data: {accessToken: string}) {
    return this.appService.getSellingList(data.accessToken);
  }
}
