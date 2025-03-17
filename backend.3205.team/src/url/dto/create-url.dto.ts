import { IsDateString, IsOptional, IsString, IsUrl, Matches, MaxLength } from 'class-validator';

export class CreateUrlDto {
  @IsString()
  @IsUrl({}, { message: 'Invalid URL format' })
  originalUrl: string;

  @IsOptional()
  @IsString()
  @MaxLength(20, { message: 'Alias должен содержать не более 20 символов' })
  @Matches(/^[a-zA-Z0-9_-]+$/, { message: 'Alias может содержать только буквы, цифры, дефис и подчеркивание' })
  alias?: string;

  @IsOptional()
  @IsDateString({}, { message: 'expiresAt должно быть корректной датой' })
  expiresAt?: Date;
}