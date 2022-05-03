import { Application } from "../model/service/application";
import ApplicationModel from "@application/service/service/model/application.model";

export class ApplicationMapper {
    public static toGraphQLModel(application_model: ApplicationModel): Application {
        const {
            id,
            applicant_id,
            message,
            created_at,
            updated_at,
            service_id,
        } = application_model;
        return {
            id,
            applicant_id,
            message,
            created_at,
            updated_at,
            service_id,
        }
    }
}