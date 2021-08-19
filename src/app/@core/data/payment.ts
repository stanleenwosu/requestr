export interface PaymentInfo {
  id: string
  userId: string,
  amount: number,
  channel: PaymentChannel,
  type: PaymentType,
  dateOfPayment: number
  status: PaymentStatus,
  paymentDetail?: string,
  comment?: string
  dateConfirmed?: number
  dateCancelled?: number
  timestamp: number
}

export enum PaymentStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED"
}

export enum PaymentType {
  DEPOSIT = "DEPOSIT",
  WITHDRAWAL = "WITHDRAWAL",
  REFUND = "REFUND"
}

export enum PaymentChannel {
  bitcoin = "Bitcoin",
  ethereum = "Ethereum",
  litecoin = "Litecoin",
  bitcoin_cash = "Bitcoin Cash",
  bank_wire = "Bank Wire"
}

export const PaymentChannelArr = [
  "Bitcoin",
  "Ethereum",
  "Litecoin",
  "Bitcoin Cash",
  "Bank Wire",
];


export class Payment {
  readonly paymentInfo: PaymentInfo
  constructor(userId: string, amount: number, channel: PaymentChannel, type: PaymentType) {
    const d = Date.now()
    this.paymentInfo = {
      id: `${d}`,
      userId: userId,
      amount: amount,
      channel: channel,
      type: type,
      status: PaymentStatus.PROCESSING,
      dateOfPayment: d,
      comment: '',
      timestamp: d
    }
  }
}
