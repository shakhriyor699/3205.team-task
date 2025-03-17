import { Body, Controller, Delete, Get, Param, Post, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { UrlService } from './url.service';
import { CreateUrlDto } from './dto/create-url.dto';
import { DeleteUrlDto } from './dto/delete-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) { }

  @Post('/shorten')
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async shorten(@Body() createUrlDto: CreateUrlDto) {
    return this.urlService.createShortUrl(createUrlDto.originalUrl, createUrlDto.alias, createUrlDto.expiresAt);
  }

  @Get('/info/all')
  async getAllUrls() {
    return this.urlService.getAllUrls();
  }

  @Get('/:shortUrl')
  async redirect(@Param('shortUrl') shortUrl: string, @Res() res) {
    const originalUrl = await this.urlService.getOriginalUrl(shortUrl);
    return res.redirect(originalUrl);
  }

  @Get('/info/:shortUrl')
  async getInfo(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getUrlInfo(shortUrl);
  }

  @Get('analytics/:shortUrl')
  async getAnalytics(@Param('shortUrl') shortUrl: string) {
    return this.urlService.getAnalytics(shortUrl);
  }

  @Delete('/delete/:shortUrl')
  @UsePipes(new ValidationPipe({ transform: true }))
  async delete(@Param() deleteUrlDto: DeleteUrlDto) {
    return this.urlService.deleteUrl(deleteUrlDto.shortUrl);
  }
}
