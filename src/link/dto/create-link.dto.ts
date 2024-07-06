import { IsString } from 'class-validator';

export class CreateLinkDto {
  @IsString({ message: 'link must be a string' })
  value: string;
}
