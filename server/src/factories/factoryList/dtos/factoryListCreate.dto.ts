import { Transform, Type, plainToClass } from "class-transformer";
import { IsBoolean, IsNumber, IsString, ValidateNested } from "class-validator";
import { DynamicField } from "./dynamicField.dto"; 

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

  @ValidateNested({ each: true })
  dynamicFields?: DynamicField[];

  static fromPlain(plain: Record<string, any>): FactoryListCreateDTO {
    const dto = plainToClass(FactoryListCreateDTO, plain);
    return dto;
  }
}
