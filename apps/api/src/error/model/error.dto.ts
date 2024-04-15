export class CreateErrorDto {
  message: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
}

export class CreateCodeDto {
  message: string;
  url: string;
  fileName: string;
  lineNumber: number;
  columnNumber: number;
  time: string;
}

export class CreateResourceDto {
  source: string;
  url: string;
  target: string;
  time: string;
}

export class CreateRequestDto {
  status: number;
  response?: string;
  elapsedTime: number;
  url: string;
  time: string;
  method: string;
  requestData: string;
  requestURL: string;
}
