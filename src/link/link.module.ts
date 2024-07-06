import { Module, OnModuleInit } from '@nestjs/common';
import { LinkController } from './api/link.controller';
import { CommandBus, CqrsModule, EventBus, QueryBus } from '@nestjs/cqrs';
import { LINK_COMMANDS_HANDLERS } from './services/commands';
import { LinkFacade } from './services/link.facade';
import { linkFacadeFactory } from './providers/link-facade.factory';
import { LinkRepository } from './repositories/link.repository';
import { PrismaService } from '../prisma/prisma.service';
import { LINK_QUERIES_HANDLERS } from './services/queries';
import { LinkService } from './services/link.service';

@Module({
  imports: [CqrsModule],
  providers: [
    ...LINK_COMMANDS_HANDLERS,
    ...LINK_QUERIES_HANDLERS,
    LinkRepository,
    PrismaService,
    LinkService,
    {
      provide: LinkFacade,
      inject: [CommandBus, QueryBus, EventBus],
      useFactory: linkFacadeFactory,
    },
  ],
  controllers: [LinkController],
})
export class LinkModule implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}
  onModuleInit() {
    this.commandBus.register(LINK_COMMANDS_HANDLERS);
    this.queryBus.register(LINK_QUERIES_HANDLERS);
  }
}
