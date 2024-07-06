import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetValueFromLinkQuery } from './getValueFromLink.query';
import { LinkRepository } from '../../../repositories/link.repository';
import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { LinkService } from '../../link.service';

@QueryHandler(GetValueFromLinkQuery)
export class GetValueFromLinkQueryHandler
  implements IQueryHandler<GetValueFromLinkQuery>
{
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly linkService: LinkService,
  ) {}
  async execute({ linkValue }: GetValueFromLinkQuery): Promise<string> {
    const link = this.linkService.getLink(linkValue);
    const oneTimeLink = await this.linkRepository.getValueByLink(link);

    if (!oneTimeLink) {
      throw new NotFoundException('Link was not found');
    }

    if (!oneTimeLink.isActive) {
      throw new ForbiddenException(
        'Link was already used and is no longer active',
      );
    }

    // тут тоже можно вызывать абстрактный метод, а не дергать репозиторий напрямую
    await this.linkRepository.updateLinkIsActive(link);

    return oneTimeLink.value;
  }
}
