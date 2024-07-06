import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { LinkFacade } from '../services/link.facade';
import { CreateLinkDto } from '../dto/create-link.dto';

@Controller('link')
export class LinkController {
  constructor(private linkFacade: LinkFacade) {}

  @Post('/')
  async createLink(@Body() createLinkDto: CreateLinkDto): Promise<string> {
    return this.linkFacade.commands.createLink(createLinkDto);
  }

  @Get('/:value')
  async getLinkValue(@Param('value') linkValue: string): Promise<string> {
    return this.linkFacade.queries.getValueFromLink(linkValue)
  }
}
