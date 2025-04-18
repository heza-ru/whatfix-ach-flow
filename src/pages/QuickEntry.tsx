
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import QuickEntryTable from '@/components/payments/QuickEntryTable';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export interface Template {
  id: string;
  name: string;
  description: string;
  paymentDate: string;
  companyAccount: string;
  accountIdentifier: string;
  type: 'PPD' | 'CCD';
  recipient: string;
  recipientBank?: string;
  totalAmount: number;
}

const QuickEntry = () => {
  const [selectedTemplates, setSelectedTemplates] = useState<Template[]>([]);
  const navigate = useNavigate();

  const handleContinue = () => {
    if (selectedTemplates.length > 0) {
      navigate('/payments/quick-entry/preview', { state: { templates: selectedTemplates } });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<DollarSign className="h-6 w-6" />}
          title="ACH QUICK ENTRY"
          subtitle="Use this page to create ACH payments using existing ACH templates"
          showPrintButton={true}
          showHelpButton={true}
        />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 bg-bank-primary text-white text-lg font-medium">
              AVAILABLE TEMPLATES
            </div>
            
            <QuickEntryTable 
              onSelectedTemplatesChange={setSelectedTemplates}
              selectedTemplates={selectedTemplates}
            />

            <div className="p-4 border-t flex justify-end">
              <Button 
                onClick={handleContinue}
                disabled={selectedTemplates.length === 0}
              >
                Continue
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickEntry;
