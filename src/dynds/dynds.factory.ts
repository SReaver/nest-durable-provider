import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Source01Service } from './services/service1.service';
import { Source02Service } from './services/service2.service';

@Injectable({ scope: Scope.REQUEST })
export class DataSourceFactory {
  constructor(
    @Inject(REQUEST) private request: Request,
    private source01Service: Source01Service,
    private source02Service: Source02Service,
  ) {}

  create() {
    const sourceParam = this.request.headers['x-tenant-id'];
    switch (sourceParam) {
      case 'source01':
        return this.source01Service;
      case 'source02':
        return this.source02Service;
      default:
        return this.source01Service;
    }
  }
}
