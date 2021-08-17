import { ApiProperty } from '@nestjs/swagger';

import { IsString } from 'class-validator';

export class SenderDto {
  @ApiProperty({ required: true })
  @IsString()
  topic: string;

  @ApiProperty({ required: true })
  value: any;
}
