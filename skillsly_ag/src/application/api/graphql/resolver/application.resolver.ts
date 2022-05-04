import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql'
import { Id } from '@application/common/type/common_types'
import { Application } from '../model/service/application'
import { Inject, Logger } from '@nestjs/common'
import { ServiceDITokens } from '@application/service/service/di/service_di_tokens'
import { CreateApplicationService } from '@application/service/service/requester/create_application.service'
import { ApplicationDetails } from '../model/service/input/application_details'
import { ApplicationMapper } from '../mapper/application.mapper'
import { DeleteApplicationService } from '@application/service/service/requester/delete_application.service'
import { ServiceApplicationsService } from '@application/service/service/requester/service_applications.service'
import { UpdateApplicationService } from '@application/service/service/requester/update_application.service'
import { ApplicationUpdates } from '../model/service/input/update_application_input'
import { UpdatedPhaseServiceService } from '@application/service/service/requester/update_phase_service.service'
import { PhaseUpdates } from '../model/service/input/phase_updates'
import { UpdateProviderServiceService } from '@application/service/service/requester/update_provider_service.service'
import { ProviderUpdates } from '../model/service/input/provider_updates'
import { StatusUpdates } from '../model/service/input/status_updates'
import { UpdateStatusServiceService } from '@application/service/service/requester/update_status_service.service'

@Resolver(() => Application)
export class ApplicationResolver {
    private readonly logger: Logger = new Logger(ApplicationResolver.name);

    constructor(
        @Inject(ServiceDITokens.CreateApplicationService)
        private readonly create_application_service: CreateApplicationService,
        @Inject(ServiceDITokens.DeleteApplicationService)
        private readonly delete_application_service: DeleteApplicationService,
        @Inject(ServiceDITokens.ServiceApplicationsService)
        private readonly service_applications_service: ServiceApplicationsService,
        @Inject(ServiceDITokens.UpdateApplicationService)
        private readonly update_application_service: UpdateApplicationService,
        @Inject(ServiceDITokens.UpdatePhaseServiceService)
        private readonly update_phase_service_service: UpdatedPhaseServiceService,
        @Inject(ServiceDITokens.UpdateProviderServiceService)
        private readonly update_provider_service_service: UpdateProviderServiceService,
        @Inject(ServiceDITokens.UpdateStatusServiceService)
        private readonly update_status_service_service: UpdateStatusServiceService
    ) {
    }

    @Mutation(() => Application)
    public async createApplication(
        @Args({ name: 'application_details', type: () => ApplicationDetails }) application_details: ApplicationDetails) {
            const { idService, applicant_id, message } = application_details;
            this.logger.log('Creating an application in application service...');
            const { created_application } = await this.create_application_service.execute({
                idService,
                applicant_id,
                message
            });
            this.logger.log('Application succesfully created in application service');
            return ApplicationMapper.toGraphQLModel(created_application);
        }

    @Mutation(() => String)
    public async deleteApplication(
        @Args({ name: 'id' }) application_id: number) {
            this.logger.log('Deleting an application in service service...');
            const { deleted_application } = await this.delete_application_service.execute({ application_id });
            this.logger.log('Application succesfully deleted in service service');
            return 'deleted';
        }

    @Query(() => [Application])
    public async serviceApplications(
        @Args({ name: 'service_id' }) service_id: number) {
            this.logger.log('Listing applications from a service...');
            const applications = await this.service_applications_service.execute({
                service_id
            });
            this.logger.log('Listed applications succesfully');
            return applications.map(ApplicationMapper.toGraphQLModel);
        }

    @Mutation(() => String)
    public async updateApplication(
        @Args({ name: 'application_id', type: () => Number }) application_id: number,
        @Args({ name: 'updates', type: () => ApplicationUpdates }) updates: ApplicationUpdates
    ) {
        this.logger.log('Updating application...');
        await this.update_application_service.execute({
            application_id,
            message: updates.message
        });
        this.logger.log('Application updated succesfully');
        return 'Application updated';
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
}