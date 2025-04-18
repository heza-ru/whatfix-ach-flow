
// Types for our data models
export type PaymentType = 'PPD' | 'CCD';
export type PaymentStatus = 'approved' | 'pending' | 'rejected' | 'incomplete' | 'draft' | 'complete';
export type AccountType = 'Checking' | 'Savings';
export type Frequency = 'One-Time' | 'Weekly' | 'Bi-Weekly' | 'Monthly' | 'Quarterly' | 'Annually';

export interface Template {
  id: string;
  name: string;
  description: string;
  status: PaymentStatus;
  companyAccount: string;
  type: PaymentType;
  recipient: string;
  amount: number;
  createdAt: string;
  modifiedAt: string;
  modifiedBy: string;
}

export interface Recipient {
  id: string;
  name: string;
  status: PaymentStatus;
  accountNumber: string;
  routingNumber: string;
  accountType: AccountType;
  email: string;
  phone: string;
  achEnabled: boolean;
  addedAt: string;
  address?: string;
}

export interface Payment {
  id: string;
  templateId?: string;
  recipientId: string;
  amount: number;
  type: PaymentType;
  status: PaymentStatus;
  effectiveDate: string;
  frequency: Frequency;
  createdAt: string;
  createdBy: string;
  description?: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  achLimits: {
    transaction: number;
    approval: number;
    dailyCumulative: number;
  };
}

// Mock data
export const mockTemplates: Template[] = [
  {
    id: 'temp-001',
    name: 'ABC DEMO',
    description: 'DEMO',
    status: 'incomplete',
    companyAccount: '******4019',
    type: 'PPD',
    recipient: 'Scott Thompson',
    amount: 1000,
    createdAt: '2023-01-15',
    modifiedAt: '2023-02-01',
    modifiedBy: 'Sanjna C'
  },
  {
    id: 'temp-002',
    name: 'BD Review Template',
    description: 'BD Review',
    status: 'approved',
    companyAccount: '******0361',
    type: 'PPD',
    recipient: 'Joe Wells',
    amount: 2500,
    createdAt: '2023-01-10',
    modifiedAt: '2023-01-25',
    modifiedBy: 'Sanjna C'
  },
  {
    id: 'temp-003',
    name: 'Monthly Vendor Payment',
    description: 'Regular payment to main vendor',
    status: 'approved',
    companyAccount: '******1234',
    type: 'CCD',
    recipient: 'Acme Supplies',
    amount: 4750.50,
    createdAt: '2023-02-05',
    modifiedAt: '2023-02-15',
    modifiedBy: 'Sanjna C'
  },
  {
    id: 'temp-004',
    name: 'Office Rent',
    description: 'Monthly office rent payment',
    status: 'approved',
    companyAccount: '******5678',
    type: 'PPD',
    recipient: 'Property Management LLC',
    amount: 3200,
    createdAt: '2023-01-20',
    modifiedAt: '2023-02-10',
    modifiedBy: 'Sanjna C'
  }
];

export const mockRecipients: Recipient[] = [
  {
    id: 'rec-001',
    name: 'Chemical Strategies',
    status: 'approved',
    accountNumber: '123456789',
    routingNumber: '987654321',
    accountType: 'Checking',
    email: 'accounting@chemicalstrategies.com',
    phone: '(555) 123-4567',
    achEnabled: true,
    addedAt: '2023-01-05'
  },
  {
    id: 'rec-002',
    name: 'dfg',
    status: 'approved',
    accountNumber: '987654321',
    routingNumber: '123456789',
    accountType: 'Savings',
    email: 'contact@dfg.com',
    phone: '(555) 987-6543',
    achEnabled: true,
    addedAt: '2023-01-10'
  },
  {
    id: 'rec-003',
    name: 'Acme Supplies',
    status: 'approved',
    accountNumber: '456123789',
    routingNumber: '789123456',
    accountType: 'Checking',
    email: 'ar@acmesupplies.com',
    phone: '(555) 222-3333',
    achEnabled: true,
    addedAt: '2023-01-15'
  },
  {
    id: 'rec-004',
    name: 'Property Management LLC',
    status: 'approved',
    accountNumber: '789456123',
    routingNumber: '456789123',
    accountType: 'Checking',
    email: 'billing@propertymanagement.com',
    phone: '(555) 444-5555',
    achEnabled: true,
    addedAt: '2023-01-20'
  }
];

export const mockPayments: Payment[] = [
  {
    id: 'pay-001',
    templateId: 'temp-001',
    recipientId: 'rec-001',
    amount: 1000,
    type: 'PPD',
    status: 'pending',
    effectiveDate: '2023-03-01',
    frequency: 'One-Time',
    createdAt: '2023-02-15',
    createdBy: 'Sanjna C'
  },
  {
    id: 'pay-002',
    templateId: 'temp-002',
    recipientId: 'rec-002',
    amount: 2500,
    type: 'PPD',
    status: 'approved',
    effectiveDate: '2023-03-05',
    frequency: 'Monthly',
    createdAt: '2023-02-10',
    createdBy: 'Sanjna C'
  },
  {
    id: 'pay-003',
    recipientId: 'rec-003',
    amount: 4750.50,
    type: 'CCD',
    status: 'complete',
    effectiveDate: '2023-02-20',
    frequency: 'One-Time',
    createdAt: '2023-02-05',
    createdBy: 'Sanjna C'
  },
  {
    id: 'pay-004',
    templateId: 'temp-004',
    recipientId: 'rec-004',
    amount: 3200,
    type: 'PPD',
    status: 'complete',
    effectiveDate: '2023-02-25',
    frequency: 'Monthly',
    createdAt: '2023-02-01',
    createdBy: 'Sanjna C'
  }
];

export const mockUsers: User[] = [
  {
    id: 'user-001',
    firstName: 'Sanjna',
    lastName: 'C',
    email: 'sanjna.c@whatfixbank.com',
    role: 'Administrator',
    achLimits: {
      transaction: 10000,
      approval: 25000,
      dailyCumulative: 50000
    }
  }
];
