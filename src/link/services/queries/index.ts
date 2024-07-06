import { Type } from '@nestjs/common';
import { IQueryHandler } from '@nestjs/cqrs';
import { GetValueFromLinkQueryHandler } from './get-link/getValueFromLink.query.handler';

export const LINK_QUERIES_HANDLERS: Type<IQueryHandler>[] = [
  GetValueFromLinkQueryHandler,
];
