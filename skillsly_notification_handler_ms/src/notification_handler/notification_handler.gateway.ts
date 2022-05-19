import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { CACHE_MANAGER, Inject, Logger } from '@nestjs/common'
import { SocketEvents } from './constants/socket_events'
import NotificationDTO from './dto/notification.dto'
import SocketJoinDTO from './dto/socket_join.dto'
import { Cache } from 'cache-manager'

@WebSocketGateway({
  cors: {
    origin: '*'
  },
})
export class NotificationHandlerGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(NotificationHandlerGateway.name);

  @WebSocketServer() server: Server;

  constructor(
    @Inject(CACHE_MANAGER) private readonly cache_manager: Cache
  ) {
  }

  public handleConnection(client: Socket) {
    this.logger.log(`Client ${client.id} connected`);
  }

  public handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }

  @SubscribeMessage('join')
  public async handleJoin(client: Socket, payload: SocketJoinDTO) {
    client.join(client.id);
    await this.cache_manager.set(payload.user_id, client.id);
  }

  @SubscribeMessage('leave')
  public async handleLeave(client: Socket, payload: SocketJoinDTO) {
    client.leave(client.id);
    await this.cache_manager.del(payload.user_id);
  }

  public async sendNotification(notification: NotificationDTO): Promise<boolean> {
    const { notifier_id } = notification;
    this.logger.log("Sending notification...");
    const destination_socket_id = await this.cache_manager.get(notifier_id);
    if (destination_socket_id) {
      this.logger.log("Sending notification...");
      this.server
        .to(await this.cache_manager.get(notifier_id))
        .emit(SocketEvents.NewNotification, notification);
    }
    return !!destination_socket_id;
  }
}
