export class Monitor {
  private baseURL: string = "";

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  reportData() {
    console.log("test");
  }
}