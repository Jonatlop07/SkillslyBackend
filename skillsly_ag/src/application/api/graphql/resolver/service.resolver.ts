import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Id } from '@application/common/type/common_types'
import { Service } from '../model/service/service'
import { Inject, Logger } from '@nestjs/common'
import { ServiceDITokens } from '@application/service/service/di/service_di_tokens'
import { CreateServiceService } from '@application/service/service/requester/create_service.service'
import { ServiceDetails } from '../model/service/input/service_details'
import { ServiceMapper } from '../mapper/service.mapper'
import { DeleteServiceService } from '@application/service/service/requester/delete_service.service'
import { ListServiceService } from '@application/service/service/requester/list_service.service'
import { ListServiceParams } from '../model/service/input/list_services_params'

@Resolver(() => Service)
export class ServiceResolver {
    private readonly logger: Logger = new Logger(ServiceResolver.name);

    constructor(
        @Inject(ServiceDITokens.CreateServiceService)
        private readonly create_service_service: CreateServiceService,
        @Inject(ServiceDITokens.DeleteServiceService)
        private readonly delete_service_service: DeleteServiceService,
        @Inject(ServiceDITokens.ListServiceService)
        private readonly list_service_service: ListServiceService
    ) {
    }

    @Mutation(() => Service)
    public async createService(
        @Args({ name: 'service_details', type: () => ServiceDetails }) service_details: ServiceDetails) {
            const { requester_id, title, description, contact_info, category } = service_details;
            this.logger.log('Creating a service in service service...');
            const { created_service } = await this.create_service_service.execute({
                requester_id,
                title,
                description,
                contact_info,
                category
            });
            this.logger.log('Service succesfully created in service service');
            return ServiceMapper.toGraphQLModel(created_service);
        }

    @Mutation(() => String)
    public async deleteService(
        @Args({ name: 'id' }) service_id: number) {
            this.logger.log('Deleting a service in service service...');
            const { deleted_service } = await this.delete_service_service.execute({ service_id });
            this.logger.log('Service succesfully deleted in service service');
            return 'deleted';
        }

    @Query(() => [Service])
    public async listService(
        @Args({ name: 'list_service_params', type: () => ListServiceParams }) list_service_params: ListServiceParams) {
            this.logger.log('Listing services...');
            const services  = await this.list_service_service.execute({
                ...list_service_params
            });
            this.logger.log('Listed services succesfully');
            return services.map(ServiceMapper.toGraphQLModel);
        }
}