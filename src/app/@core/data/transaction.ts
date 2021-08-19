import { PaymentChannel, PaymentInfo, PaymentStatus, PaymentType } from './payment'

export const DATA: PaymentInfo[] = [
  {
    id: '001',
    userId: 'user001',
    amount: 5000,
    channel: PaymentChannel.bitcoin,
    type: PaymentType.DEPOSIT,
    dateOfPayment: 1626545033500,
    status: PaymentStatus.PROCESSING,
    paymentDetail: '',
    timestamp: 1626545033500
  },

  {
    id: '002',
    userId: 'user001',
    amount: 2000,
    channel: PaymentChannel.bitcoin,
    type: PaymentType.WITHDRAWAL,
    dateOfPayment: 1626545087000,
    status: PaymentStatus.PROCESSING,
    paymentDetail: '',
    timestamp: 1626545087000
  }
]
