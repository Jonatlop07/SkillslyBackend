import { Id } from '@application/common/type/common_types';
import { Content } from './comment_content.model';

export interface CommentModel {
  _id: Id;
  owner_id: Id;
  post_id?: Id;
  content: Content;
  created_at: string;
  updated_at?: string;
  inner_comment_count?: number;
}
