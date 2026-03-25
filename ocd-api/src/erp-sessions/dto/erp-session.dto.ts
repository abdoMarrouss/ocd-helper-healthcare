import { IsInt, Min, Max, IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateErpSessionDto {
  @IsOptional()
  @IsUUID()
  hierarchyItemId?: string;

  @IsInt()
  @Min(0)
  @Max(100)
  sudsBaseline: number;

  @IsInt()
  @Min(0)
  @Max(100)
  sudsPeak: number;

  @IsInt()
  @Min(0)
  @Max(100)
  sudsEnd: number;

  @IsBoolean()
  compulsionResisted: boolean;

  @IsOptional()
  @IsInt()
  @Min(0)
  durationMinutes?: number;

  @IsOptional()
  @IsString()
  notes?: string;
}
