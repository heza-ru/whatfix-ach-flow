
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
  achEnabled?: boolean;
};

export type RecipientType = 'Individual' | 'Business';
export type PaymentType = 'PPD' | 'CCD';

export interface CreateRecipientFormData {
  // Step 1
  recipientType: 'ACH Domestic';
  achRecipientType: RecipientType;
  paymentType: PaymentType;
  
  // Step 2
  name: string;
  recipientId: string;
  accountType: AccountType;
  accountNumber: string;
  bankSelectionMethod: 'List' | 'Manual';
  bankId: string;
  bankName: string;
  
  // Step 3
  addContactInfo: boolean;
  contactName?: string;
  contactEmail?: string;
  contactPhone?: string;
}
