import { Controller, Get, Inject } from '@nestjs/common';
import { DataSourceToken } from './dynds/constants/dynds.constants';
import { DataSource } from './dynds/interfaces/datasource.interface';

@Controller()
export class AppController {
  constructor(
    @Inject(DataSourceToken) private readonly dataSource: DataSource,
  ) {}

  @Get()
  getHello(): string {
    return this.dataSource.getData();
  }
}
