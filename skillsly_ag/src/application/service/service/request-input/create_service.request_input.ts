import { Id } from "@application/common/type/common_types";

export default interface CreateServiceRequestInput {
    requester_id: Id,
    title: string,
    description: string,
    contact_info: string,
    category: string
}