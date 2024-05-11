export class Monitor {
  private baseURL: string = "";

  constructor(baseURL: string) {
    this.baseURL = baseURL;
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
