import { IsOptional, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { VALIDATION_MESSAGES } from '../../lib/constants';
import { PaginationQueryDto } from '../../posts/dto/pagination-query-input.dto';

export class ListCommentsQueryDto extends PaginationQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1, { message: VALIDATION_MESSAGES.POST_ID_INVALID })
  postId?: number;
}

