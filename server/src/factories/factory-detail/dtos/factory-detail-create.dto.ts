import { IsString, IsDateString, IsNumber, IsBoolean } from 'class-validator';

export class FactoryDetailCreateDTO {
  @IsString()
  using_unit: string;

  @IsDateString()
  start_date: string;

  @IsDateString()
  end_date: string;

  @IsNumber()
  usage_kw: number;

  @IsNumber()
  usage_fee: number;

  @IsBoolean()
  discounted_price: boolean;
}
