import { Id } from '@application/common/type/common_types';

export default interface CreateApplicationRequestInput {
  idService: number;
  applicant_id: Id;
  message: string;
}