import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OneTimeLink } from '@prisma/client';

@Injectable()
export class LinkRepository {
  public constructor(private prisma: PrismaService) {}

  public async saveLink(link: string, value: string): Promise<string> {
    await this.prisma.oneTimeLink.create({
      data: {
        link,
        value,
      },
    });
    return link;
  }

  public async getValueByLink(link: string): Promise<OneTimeLink | null> {
    return this.prisma.oneTimeLink.findUnique({
      where: { link },
    });
  }

  public async updateLinkIsActive(
    link: string,
    isActive = false,
  ): Promise<void> {
    await this.prisma.oneTimeLink.update({
      where: { link },
      data: { isActive },
    });
  }
}
