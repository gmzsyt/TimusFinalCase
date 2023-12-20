import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class DynamicDTO {
  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  value?: string;

  @IsOptional()
  @IsNumber()
  numericValue?: number;

  @IsOptional()
  @IsBoolean()
  booleanValue?: boolean;

  @IsOptional()
  isRequired?: boolean;
}
