import { SchedulerRegistry } from '@nestjs/schedule';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { CronJob } from 'cron';
import { Socket } from 'socket.io';

let connectedClient: Socket;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection {
  constructor(private schedulerRegistry: SchedulerRegistry) {
    const job = new CronJob('*/30 * * * * *', this.create);
    this.schedulerRegistry.addCronJob('create', job);
  }

  handleConnection(client: Socket) {
    connectedClient = client;
    const job = this.schedulerRegistry.getCronJob('create');
    job.start();
  }

  async create() {
    connectedClient.emit('report');
  }
}
