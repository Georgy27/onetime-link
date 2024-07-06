import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LinkService {
  constructor(private readonly configService: ConfigService) {}

  public getLink(linkValue: string): string {
    const baseUrl = this.configService.get('BASE_URL');
    return `${baseUrl}/link/${linkValue}`;
  }

  public createLink(): string {
    const baseUrl = this.configService.get('BASE_URL');
    return `${baseUrl}/link/${uuidv4()}`;
  }
}
