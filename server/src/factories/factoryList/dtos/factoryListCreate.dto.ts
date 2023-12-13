import { IsString, IsDate, IsNumber, IsBoolean } from 'class-validator';

export class FactoryListCreateDTO {
  @IsString()
  company_name: string;

  @IsDate()
  membership_start_date: Date;

  @IsDate()
  membership_end_date: Date;

  @IsNumber()
  employee_count: number;

  @IsBoolean()
  free_member: boolean;
}
