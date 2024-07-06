import { CreateLinkDto } from '../../../dto/create-link.dto';

export class CreateLinkCommand {
  constructor(public readonly createLinkDto: CreateLinkDto) {}
}
