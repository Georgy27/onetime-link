import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { LinkRepository } from '../../../repositories/link.repository';
import { CreateLinkCommand } from './create-link.command';
import { LinkService } from '../../link.service';

@CommandHandler(CreateLinkCommand)
export class CreateLinkCommandHandler
  implements ICommandHandler<CreateLinkCommand>
{
  constructor(
    private readonly linkRepository: LinkRepository,
    private readonly linkService: LinkService,
  ) {}
  async execute({ createLinkDto }: CreateLinkCommand): Promise<string> {
    // в теории тут еще можно проверять что в базе нету пользователя с такой-же ссылкой
    // но шанс у двух пользователей иметь один uuidv4 крайне мал
    const link = this.linkService.createLink();
    // тут также можно вызывать абстрактный метод, а не дергать репозиторий напрямую
    await this.linkRepository.saveLink(link, createLinkDto.value);

    return link;
  }
}
