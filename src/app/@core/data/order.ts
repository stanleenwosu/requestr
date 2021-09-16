

export interface PurchaseOrder {
  id: string;
  rfoId: string
  createdOn: number
  createdBy: string
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
  amount?:string;
  attachment?: string;
  status?: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdOn: number;
  timestamp: number;
}
