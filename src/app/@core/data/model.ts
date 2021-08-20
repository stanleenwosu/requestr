export interface Request {
  id: string;
  name: string;
  detail?: string;
  createdBy: any;
  assignedTo: any;
  status: RequestStatus;
  comment?: string[] | string;
  createdOn: number;
  deadline?:number;
  resolved?: boolean;
  resolvedOn?: number;
  active?:boolean;
  attachment?: any;
  timestamp: number;
}

export enum RequestStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}
