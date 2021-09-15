

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
  rfoId: string;
  comment: string;
  attachment: string;
  createdOn: number;
  timestamp: number;
}
