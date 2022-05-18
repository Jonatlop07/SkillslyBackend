import ServiceModel from '../model/service.model';

export default interface ListServiceRequestResponse {
  services: Array<ServiceModel>
}