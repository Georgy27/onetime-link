import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { LinkFacade } from '../services/link.facade';

export const linkFacadeFactory = (
  commandBus: CommandBus,
  queryBus: QueryBus,
  eventBus: EventBus,
) => new LinkFacade(commandBus, queryBus, eventBus);
