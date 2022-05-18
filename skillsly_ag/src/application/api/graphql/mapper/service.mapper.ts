import { Service } from '../model/service/service';
import ServiceModel from '@application/service/service/model/service.model';

export class ServiceMapper {
  public static toGraphQLModel(service_model: ServiceModel): Service {
    const {
      id,
      requester_id,
      title,
      description,
      contact_info,
      category,
      phase,
      created_at,
      updated_at,
      provider_id,
      canceled
    } = service_model;
    return {
      id,
      requester_id,
      title,
      description,
      contact_info,
      category,
      phase,
      created_at,
      updated_at,
      provider_id,
      canceled
    };
  }
}