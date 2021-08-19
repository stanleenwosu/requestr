export interface Request {
  id: string;
  name: string;
  detail?: string;
  createdBy: any;
  assignedTo: any;
  status: RequestStatus;
  comment?: string[] | string;
  createdOn: number;
  resolved?: boolean;
  resolvedOn?: number;
  active?:boolean;
  timestamp: number;
}

export enum RequestStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}
