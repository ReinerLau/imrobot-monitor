export class CreateScreenDto {
  time: number;
  data: Record<string, any>;
  hash: string;
}

export class CreateFullSnapshotDto {
  hash: string;
  data: Record<string, any>;
}
