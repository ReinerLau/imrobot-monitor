import type { App } from "vue";
import { InstallOptions } from "../types";

export class Monitor {
  public vueInstance: App;
  public baseURL: string = "";
  public appId: string = "";

  constructor(vueInstance: App, options: InstallOptions) {
    this.vueInstance = vueInstance;
    this.baseURL = options.baseURL;
    this.appId = options.appId;
  }

  reportData(url: string, data: Record<string, any>) {
    const headers: any = {
      "Content-Type": "application/json",
    };
    const payload = {
      ...data,
      token: this.appId,
    };
    const result = navigator.sendBeacon(
      `${this.baseURL}${url}`,
      new Blob([JSON.stringify(payload)], headers)
    );
    if (!result) {
      requestIdleCallback(() => {
        fetch(`${this.baseURL}${url}`, {
          method: "post",
          body: JSON.stringify(payload),
          headers,
        });
      });
    }
  }
}
