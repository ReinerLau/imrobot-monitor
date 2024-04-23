import { SchedulerRegistry } from '@nestjs/schedule';
import { OnGatewayConnection, WebSocketGateway } from '@nestjs/websockets';
import { CronJob } from 'cron';
import { Socket } from 'socket.io';

let myClient: Socket;

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnGatewayConnection {
  constructor(private schedulerRegistry: SchedulerRegistry) {
    const job = new CronJob('* * * * * *', this.scheduleJob);
    this.schedulerRegistry.addCronJob('test', job);
  }
  handleConnection(client: Socket) {
    myClient = client;
    const job = this.schedulerRegistry.getCronJob('test');
    job.start();
  }

  scheduleJob() {
    console.log(Date.now());
    myClient.emit(
      'acknowledgement',
      'Your message was received loud and clear!',
    );
  }
}
