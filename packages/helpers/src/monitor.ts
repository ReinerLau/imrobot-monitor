import type { App } from "vue";

export class Monitor {
  private baseURL: string = "";

  public vueInstance: App;

  constructor(baseURL: string, vueInstance: App) {
    this.baseURL = baseURL;
    this.vueInstance = vueInstance;
  }

  reportData(url: string, data: Record<string, any>) {
    const headers = {
      type: "application/json",
    };
    const result = navigator.sendBeacon(
      `${this.baseURL}${url}`,
      new Blob([JSON.stringify(data)], headers)
    );
    if (!result) {
      requestIdleCallback(() => {
        fetch(`${this.baseURL}${url}`, {
          method: "post",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
      });
    }
  }
}
