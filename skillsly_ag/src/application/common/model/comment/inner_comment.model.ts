import { Id } from '@application/common/type/common_types';
import { Content } from './comment_content.model';

export interface InnerCommentModel {
  _id: Id;
  owner_id?: Id;
  comment_id?: Id;
  content: Content;
  created_at: string;
  updated_at?: string;
}
