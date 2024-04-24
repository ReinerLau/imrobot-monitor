import { SchedulerRegistry } from '@nestjs/schedule';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  public connectedClient: Socket;

  handleConnection(client: Socket) {
    this.connectedClient = client;
    const job = this.schedulerRegistry.getCronJob('report');
    job.start();
  }

  handleDisconnect() {
    const job = this.schedulerRegistry.getCronJob('report');
    job.stop();
  }
}
