export interface RFO {
  id: string;
  name: string;
  items: RItem[];
  detail?: string;
  createdBy: any;
  assignedTo?: any;
  status: RFO_Status;
  comment?: string[] | string;
  createdOn: number;
  deadline?:number;
  resolved?: boolean;
  resolvedOn?: number;
  active?:boolean;
  attachment?: any;
  timestamp: number;
}

export enum RFO_Status {
  APPROVED = 'approved',
  PENDING = 'pending',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled'
}

export interface RItem {
  name:string;
  price: string;
  quantity: number;
  total:string;
}
