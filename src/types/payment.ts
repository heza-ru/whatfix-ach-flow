
import { StatusType } from './status';

export type PaymentType = 
  | 'CCD - Corporate Credit or Debit' 
  | 'PPD - Prearranged Payment and Deposit'
  | 'Tax';

export type Payment = {
  id: string;
  paymentNo: string;
  name: string;
  status: StatusType;
  confirmationNo?: string;
  sendDate: string;
  paymentDate: string;
  companyAccount: string;
  companyIdentifier: string;
  type: PaymentType;
  template: string;
  recipient: string;
  amount: number;
  currency?: string;
};
