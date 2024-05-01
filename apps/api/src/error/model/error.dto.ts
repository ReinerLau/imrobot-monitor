export class CreateCodeDto {
  message: string;
  url: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  time: number;
  code: string;
}

export class CreateResourceDto {
  source: string;
  url: string;
  target: string;
  time: number;
}

export class CreateRequestDto {
  status: number;
  response?: string;
  elapsedTime: number;
  url: string;
  time: number;
  method: string;
  requestData: string;
  requestURL: string;
}
