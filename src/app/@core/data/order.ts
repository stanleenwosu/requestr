

export interface PurchaseOrder {
  id: string;
  rfoId: string
  createdOn: number
  createdBy: string
  approvedBy:string
  bids: string[]
  status: PurchaseOrderStatus
  timestamp: number
}


export enum PurchaseOrderStatus {
  BIDDING = 'bidding',
  PAUSED = 'paused',
  ASSIGNED = 'assigned',
  CANCELLED = 'cancelled'
}

export interface Bid {
  id: string,
  vendorId: string;
  orderId: string;
  details: string;
  amount?: string;
  attachment?: string;
  status?: IStatus;
  createdOn: number;
  timestamp: number;
  staffDecision?: IDecision;
  adminDecision?: IDecision;
  superDecision?: IDecision;
}

export interface IDecision {
  userId: string;
  status: IStatus;
  timestamp: number
}

export enum IStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED'
}
