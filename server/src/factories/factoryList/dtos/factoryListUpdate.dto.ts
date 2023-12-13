import { IsString, IsDate, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class FactoryListUpdateDTO {
  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsDate()
  membership_start_date?: Date;

  @IsOptional()
  @IsDate()
  membership_end_date?: Date;

  @IsOptional()
  @IsNumber()
  employee_count?: number;

  @IsOptional()
  @IsBoolean()
  free_member?: boolean;
}
