import { CreateLinkCommandHandler } from './create-link/create-link.command.handler';
import { ICommandHandler } from '@nestjs/cqrs';
import { Type } from '@nestjs/common';

// Экспорт всех commands
export const LINK_COMMANDS_HANDLERS: Type<ICommandHandler>[] = [
  CreateLinkCommandHandler,
];
