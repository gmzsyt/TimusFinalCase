import { Transform, Type } from "class-transformer";
import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, ValidateNested, Validate } from "class-validator";
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
  @Validate((value, object) => {
    if (value !== undefined && typeof value !== 'number' && typeof value !== 'string') {
      return [{ constraints: { isCustomType: 'employee_count must be a number or string' } }];
    }
    return undefined;
  })
  employee_count?: number | string;

  @IsOptional()
  @IsBoolean()
  free_member?: boolean;

  @IsOptional()
  @ValidateNested({ each: true })
  dynamicFields?: DynamicField[];
}
