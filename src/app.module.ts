import { Module, Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { DataSourceToken } from './dynds/constants/dynds.constants';
import { DataSourceFactory } from './dynds/dynds.factory';
import { Source01Service } from './dynds/services/service1.service';
import { Source02Service } from './dynds/services/service2.service';
import { AggregateByTenantContextIdStrategy } from './strategies/aggregation.startegy';
import { ContextIdFactory } from '@nestjs/core';
ContextIdFactory.apply(new AggregateByTenantContextIdStrategy());

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    {
      provide: DataSourceToken,
      scope: Scope.REQUEST,
      durable: true,
      useFactory: (dataSourceFactory: DataSourceFactory) => {
        return dataSourceFactory.create();
      },
      inject: [DataSourceFactory],
    },
    DataSourceFactory,
    Source01Service,
    Source02Service,
  ],
})
export class AppModule {}
