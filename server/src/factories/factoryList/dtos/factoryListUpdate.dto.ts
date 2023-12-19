import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { DynamicField } from "./dynamicField.dto";

export class FactoryListUpdateDTO {
  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)

  @Type(() => Date)
  membership_start_date?: Date;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : undefined)
  @Type(() => Date)
  membership_end_date?: Date;

  @IsOptional()
  @IsNumber()
  employee_count?: number;

  @IsOptional()
  @IsBoolean()
  free_member?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  dynamicFields?: DynamicField[];
}