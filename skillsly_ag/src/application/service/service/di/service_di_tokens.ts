export class ServiceDITokens {
    public static readonly CreateServiceService: unique symbol = Symbol('CreateServiceService');
    public static readonly ListServiceService: unique symbol = Symbol('ListServiceService');
    public static readonly CreateApplicationService: unique symbol = Symbol('CreateApplicationService');
    public static readonly ServiceApplicationsService: unique symbol = Symbol('ServiceApplicationsService');
    public static readonly UpdateServiceService: unique symbol = Symbol('UpdateServiceService');
    public static readonly DeleteServiceService: unique symbol = Symbol('DeleteServiceService');
    public static readonly UpdatePhaseServiceService: unique symbol = Symbol('UpdatePhaseServiceService');
    public static readonly UpdateProviderServiceService: unique symbol = Symbol('UpdateProviderServiceService');
    public static readonly UpdateStatusServiceService: unique symbol = Symbol('UpdateStatusServiceService');
    public static readonly UpdateApplicationService: unique symbol = Symbol('UpdateApplicationService');
    public static readonly DeleteApplicationService: unique symbol = Symbol('DeleteApplicationService');
}