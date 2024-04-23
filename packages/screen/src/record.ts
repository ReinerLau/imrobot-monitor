import { reportData } from "@imrobot/shared";
import { record } from "rrweb";

export const events: any[] = [];

export const onScreen = () => {
  record({
    emit(event) {
      events.push(event);
    },
  });
};

export const install = () => {
  onScreen();
};

export const afterEvent = (time: number) => {
  if (events.length > 0) {
    const data = { time, data: [...events] };
    reportData("/screen", data);
    events.length = 0;
    record.takeFullSnapshot(true);
  }
};
