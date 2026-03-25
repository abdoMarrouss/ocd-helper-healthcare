import { IsArray, ArrayMinSize, ArrayMaxSize, Min, Max, IsInt } from 'class-validator';

// 10 questions, each scored 0-4 — Goodman et al. 1989
export class SubmitYbocsDto {
  @IsArray()
  @ArrayMinSize(10)
  @ArrayMaxSize(10)
  @IsInt({ each: true })
  @Min(0, { each: true })
  @Max(4, { each: true })
  answers: number[];
}
