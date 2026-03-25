import { IsString, IsInt, Min, Max, IsBoolean, IsOptional } from 'class-validator';

export class CreateThoughtRecordDto {
  @IsString()
  intrusiveThought: string;

  @IsInt()
  @Min(0)
  @Max(10)
  anxietyLevel: number;

  @IsOptional()
  @IsString()
  compulsionPerformed?: string;

  @IsBoolean()
  resisted: boolean;
}
