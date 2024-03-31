import {
  HostComponentInfo,
  ContextId,
  ContextIdFactory,
  ContextIdStrategy,
} from '@nestjs/core';
import { Request } from 'express';

const tenants = new Map<string, ContextId>();

export class AggregateByTenantContextIdStrategy implements ContextIdStrategy {
  attach(contextId: ContextId, request: Request) {
    request;
    const tenantId = request.headers['x-tenant-id'] as string;
    let providerId: ContextId;

    if (tenants.has(tenantId)) {
      providerId = tenants.get(tenantId);
    } else {
      providerId = ContextIdFactory.create();
      tenants.set(tenantId, providerId);
    }

    return {
      resolve: (info: HostComponentInfo) => {
        const context = info.isTreeDurable ? providerId : contextId;
        return context;
      },
      payload: { providerId },
    };
  }
}
