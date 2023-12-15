import { IsString, IsNumber, IsBoolean } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class FactoryListCreateDTO {
  @IsString()
  company_name: string;

  @Transform(({ value }) => new Date(value)) 
  @Type(() => Date)
  membership_start_date: Date;

  @Transform(({ value }) => new Date(value)) 
  @Type(() => Date)
  membership_end_date: Date;

  @IsNumber()
  employee_count: number;

  @IsBoolean()
  free_member: boolean;
}
