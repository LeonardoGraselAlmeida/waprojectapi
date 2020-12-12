export interface IOrder {
  id?: number;
  status: enStatus;
  total: number;
  createdDate?: Date;
  updatedDate?: Date;
}

export enum enStatus {
  created = 'created',
  analyzing = 'analyzing',
  done = 'done',
  canceled = 'canceled'
}

export function listStatus(): enStatus[] {
  return [enStatus.created, enStatus.analyzing, enStatus.done, enStatus.canceled];
}
