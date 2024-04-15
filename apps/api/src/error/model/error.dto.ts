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
