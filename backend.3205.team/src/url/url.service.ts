import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as shortid from 'shortid';

@Injectable()
export class UrlService {
  constructor(private readonly prisma: PrismaService) { }

  async createShortUrl(originalUrl: string, alias?: string, expiresAt?: Date) {
    const shortUrl = alias || shortid.generate();
    return this.prisma.url.create({
      data: { originalUrl, shortUrl, alias, expiresAt },
    });
  }

  async incrementClickCount(shortUrl: string) {
    await this.prisma.url.update({
      where: { shortUrl },
      data: { clickCount: { increment: 1 } },
    });
  }

  async getAllUrls() {
    return this.prisma.url.findMany();
  }

  async getOriginalUrl(shortUrl: string) {
    const url = await this.prisma.url.findUnique({ where: { shortUrl } });
    if (!url) throw new NotFoundException('URL адрес недоступен');
    await this.incrementClickCount(shortUrl);
    return url.originalUrl;
  }

  async getUrlInfo(shortUrl: string) {
    const url = await this.prisma.url.findUnique({ where: { shortUrl } });
    if (!url) throw new NotFoundException('URL адрес недоступен')
    return url;
  }


  async getAnalytics(shortUrl: string) {
    const url = await this.prisma.url.findUnique({
      where: { shortUrl },
      include: {
        clicks: {
          orderBy: { clickedAt: 'desc' },
          take: 5,
        }
      }
    });
    if (!url) throw new NotFoundException('URL адрес недоступен')
    return { clickCount: url.clickCount, recentClicks: url.clicks.map((click) => click.ip) };
  }

  async deleteUrl(shortUrl: string) {
    await this.prisma.url.delete({ where: { shortUrl } }).catch(() => {
      throw new NotFoundException('URL адрес недоступен')
    });
    return { message: 'Успешно удален!' }
  }
}
