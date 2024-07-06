import { Injectable } from '@nestjs/common';
import { CommandBus, EventBus, QueryBus } from '@nestjs/cqrs';
import { CreateLinkDto } from '../dto/create-link.dto';
import { CreateLinkCommand } from './commands/create-link/create-link.command';
import { GetValueFromLinkQuery } from './queries/get-link/getValueFromLink.query';

@Injectable()
export class LinkFacade {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly eventBus: EventBus,
  ) {}

  commands = {
    createLink: (linkDto: CreateLinkDto) => this.createLink(linkDto),
  };
  queries = {
    getValueFromLink: (value: string) => this.getValueFromLink(value),
  };
  events = {};

  private createLink(createLinkDto: CreateLinkDto): Promise<string> {
    return this.commandBus.execute<CreateLinkCommand, string>(
      new CreateLinkCommand(createLinkDto),
    );
  }

  private getValueFromLink(linkValue: string): Promise<string> {
    return this.queryBus.execute<GetValueFromLinkQuery, string>(
      new GetValueFromLinkQuery(linkValue),
    );
  }
}
