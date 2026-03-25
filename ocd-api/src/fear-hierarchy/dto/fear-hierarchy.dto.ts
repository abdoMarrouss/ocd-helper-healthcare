import { IsString, IsInt, Min, Max, IsOptional, IsBoolean } from 'class-validator';

export class CreateFearHierarchyItemDto {
  @IsString()
  situation: string;

  @IsInt()
  @Min(0)
  @Max(100)
  sudsRating: number;

  @IsOptional()
  @IsInt()
  order?: number;
}

export class UpdateFearHierarchyItemDto {
  @IsOptional()
  @IsString()
  situation?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  sudsRating?: number;

  @IsOptional()
  @IsInt()
  order?: number;

  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
