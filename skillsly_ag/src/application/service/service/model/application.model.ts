import { Id, Nullable } from '@application/common/type/common_types'

export default interface ApplicationModel {
    id: number;
    applicant_id: Id;
    message: Nullable<string>;
    created_at: string;
    updated_at: string;
    service_id: number;
}