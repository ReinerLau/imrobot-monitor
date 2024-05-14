export class CreateScreenDto {
  timestamp: number;
  type: number;
  data: string;
  hash?: string;
}

export class CreateFullSnapshotDto {
  hash: string;
  data: string;
  timestamp: number;
}
