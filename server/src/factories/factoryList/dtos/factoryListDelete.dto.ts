import { IsNumber } from 'class-validator';

export class DeleteDTO {
  @IsNumber()
  id: number;
}
