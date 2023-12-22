import { IsString, IsDateString, IsNumber, IsBoolean, IsOptional, Validate, ValidateNested } from 'class-validator';
import { Transform } from 'class-transformer';
import { DynamicField } from 'src/factories/factoryList/dtos/dynamicField.dto';

export class FactoryDetailUpdateDTO {
  @IsOptional()
  @IsString()
  using_unit?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value.toISOString(), { toClassOnly: true })
  start_date?: string;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => value.toISOString(), { toClassOnly: true })
  end_date?: string;

  @IsOptional()
  @Validate((value, object) => {
    if (value !== undefined && typeof value !== 'number' && typeof value !== 'string') {
      return [{ constraints: { isCustomType: 'employee_count must be a number or string' } }];
    }
    return undefined;
  })
  usage_kw?: number | string;

  @IsOptional()
  @Validate((value, object) => {
    if (value !== undefined && typeof value !== 'number' && typeof value !== 'string') {
      return [{ constraints: { isCustomType: 'employee_count must be a number or string' } }];
    }
    return undefined;
  })
  usage_fee?: number | string;

  @IsOptional()
  @IsBoolean({ each: true })
  discounted_price?: boolean | string;

  @IsOptional()
  @ValidateNested({ each: true })
  dynamicFields?: DynamicField[];

  @IsOptional()
  @Transform(({ value }) => value ? [new Date(value[0]), new Date(value[1])] : undefined, { toClassOnly: true })
  date_range?: [Date, Date];
}
