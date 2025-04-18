
import { Recipient } from './recipient';

export type PPDTemplate = {
  id: string;
  activationDate: string;
  name: string;
  originatingAccount: string;
  originatingAchCompanyId: string;
  companyEntryDescription: string;
  companyDiscretionaryData?: string;
  templateLimit?: number;
  recipients: Recipient[];
};
