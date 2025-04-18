
export type AccountType = 'Checking' | 'Savings';

export type Recipient = {
  id: string;
  name: string;
  recipientId: string;
  bankId: string;
  bankName?: string;
  accountNumber: string;
  accountType: AccountType;
  amount?: number;
  crdr?: 'Credit' | 'Debit';
  discretionaryData?: string;
  status?: string;
  prenoteExpiry?: string;
  addenda?: string;
};
