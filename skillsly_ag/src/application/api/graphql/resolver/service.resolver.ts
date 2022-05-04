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
import { UpdatedPhaseServiceService } from '@application/service/service/requester/update_phase_service.service'
import { PhaseUpdates } from '../model/service/input/phase_updates'
import { UpdateProviderServiceService } from '@application/service/service/requester/update_provider_service.service'
import { ProviderUpdates } from '../model/service/input/provider_updates'
import { StatusUpdates } from '../model/service/input/status_updates'
import { UpdateStatusServiceService } from '@application/service/service/requester/update_status_service.service'
import { UpdateServiceService } from '@application/service/service/requester/update_service.service'
import { ServiceUpdates } from '../model/service/input/update_service_input'

@Resolver(() => Service)
export class ServiceResolver {
    private readonly logger: Logger = new Logger(ServiceResolver.name);

    constructor(
        @Inject(ServiceDITokens.CreateServiceService)
        private readonly create_service_service: CreateServiceService,
        @Inject(ServiceDITokens.DeleteServiceService)
        private readonly delete_service_service: DeleteServiceService,
        @Inject(ServiceDITokens.ListServiceService)
        private readonly list_service_service: ListServiceService,
        @Inject(ServiceDITokens.UpdatePhaseServiceService)
        private readonly update_phase_service_service: UpdatedPhaseServiceService,
        @Inject(ServiceDITokens.UpdateProviderServiceService)
        private readonly update_provider_service_service: UpdateProviderServiceService,
        @Inject(ServiceDITokens.UpdateStatusServiceService)
        private readonly update_status_service_service: UpdateStatusServiceService,
        @Inject(ServiceDITokens.UpdateServiceService)
        private readonly update_service_service: UpdateServiceService
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

        @Mutation(() => String)
        public async updatePhaseService(
            @Args({ name: 'service_id', type: () => Number}) service_id: number,
            @Args({ name: 'updates', type: () => PhaseUpdates }) updates: PhaseUpdates
        ) {
            this.logger.log('Updating phase from service...');
            await this.update_phase_service_service.execute({
                service_id,
                phase: updates.phase
            });
            this.logger.log('Phase from service updated succesfully');
            return 'Phase from service updated';
        }
    
        @Mutation(() => String)
        public async updateProviderService(
            @Args({ name: 'service_id', type: () => Number}) service_id: number,
            @Args({ name: 'updates', type: () => ProviderUpdates }) updates: ProviderUpdates
        ) {
            this.logger.log('Updating provider from service...');
            await this.update_provider_service_service.execute({
                service_id,
                provider_id: updates.provider_id
            });
            this.logger.log('Provider from service updated succesfully');
            return 'Provider from service updated';
        }
    
        @Mutation(() => String)
        public async updateStatusService(
            @Args({ name: 'service_id', type: () => Number}) service_id: number,
            @Args({ name: 'updates', type: () => StatusUpdates }) updates: StatusUpdates
        ) {
            this.logger.log('Updating status from service...');
            await this.update_status_service_service.execute({
                service_id,
                canceled: updates.canceled
            });
            this.logger.log('Status from service updated succesfully');
            return 'Status from service updated';
        }

        @Mutation(() => String)
        public async updateService(
            @Args({ name: 'service_id', type: () => Number}) service_id: number,
            @Args({ name: 'updates', type: () => ServiceUpdates }) updates: ServiceUpdates
        ) {
            this.logger.log('Updating service...');
            this.logger.log(updates.title);
            this.logger.log(updates.description);

            await this.update_service_service.execute({
                service_id,
                category: updates.category
            });

            this.logger.log('Service updated succesfully');
            return 'Service updated';
        }
}