export class CreateErrorDto {
  message: string;
  url: string;
  lineNumber?: number;
  columnNumber?: number;
}
