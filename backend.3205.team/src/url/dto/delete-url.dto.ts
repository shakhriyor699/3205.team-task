import { IsString } from 'class-validator';

export class DeleteUrlDto {
  @IsString()
  shortUrl: string;
}