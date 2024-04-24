import { SchedulerRegistry } from '@nestjs/schedule';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
} from '@nestjs/websockets';
import { CronJob } from 'cron';
import { Socket } from 'socket.io';

let connectedClient: Socket;
let cronJob: CronJob;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  handleConnection(client: Socket) {
    if (!cronJob) {
      cronJob = new CronJob(
        client.handshake.query.cronTime as string,
        this.create,
      );
      this.schedulerRegistry.addCronJob('create', cronJob);
    }
    connectedClient = client;
    const job = this.schedulerRegistry.getCronJob('create');
    job.start();
  }

  handleDisconnect() {
    const job = this.schedulerRegistry.getCronJob('create');
    job.stop();
  }

  async create() {
    connectedClient.emit('report');
  }
}
