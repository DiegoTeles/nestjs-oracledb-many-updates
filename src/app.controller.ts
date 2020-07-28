import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.appService.getHello();
  }
}



  /*   @Post()
  // @ApiOkResponse({ description: 'Successfully.' })
  // @ApiInternalServerErrorResponse({ description: 'Internal Server error.' })
  async updateTable(@Res() res, @Body() data: AppService): Promise<AppService> {
    try {
      const result = await this.appService.updateTable();
      console.log('aqui', result);
      return res.status(HttpStatus.OK).json(result);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ error: error.message.error.toString(), stack: error.stack });
    }
  } */