import { Id, Nullable } from '@application/common/type/common_types'

export default interface ServiceModel {
    id: number;
    requester_id: Id;
    title: string;
    description: string;
    contact_info: string;
    category: string;
    phase: string;
    created_at: string;
    updated_at: string;
    provider_id: Nullable<Id>;
    canceled: boolean;
}