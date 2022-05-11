import { Id } from "@application/common/type/common_types";

export default interface UpdateProviderServiceRequestInput {
    service_id: number,
    provider_id?: Id
}