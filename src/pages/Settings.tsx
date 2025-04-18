import React, { useState } from 'react';
import { Settings as SettingsIcon, Sliders } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import HelpSidebar from '@/components/layout/HelpSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import InfoTooltip from '@/components/common/InfoTooltip';
import AssignAchLimit from '@/components/settings/AssignAchLimit';

const SettingsPage = () => {
  const { toast } = useToast();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  
  const [limits, setLimits] = useState({
    limitSettings: 'standard',
    currency: 'USD',
    achLimits: {
      transaction: {
        all: '',
        ccd: '',
        childSupport: '',
        ppd: '',
        tax: ''
      },
      approval: {
        all: '',
        ccd: '',
        childSupport: '',
        ppd: '',
        tax: ''
      },
      dailyCumulative: {
        all: '',
        ccd: '',
        childSupport: '',
        ppd: '',
        tax: ''
      }
    }
  });

  const handleLimitSettingChange = (value: string) => {
    setLimits({ ...limits, limitSettings: value });
  };

  const handleLimitChange = (section: keyof typeof limits.achLimits, field: string, value: string) => {
    setLimits({
      ...limits,
      achLimits: {
        ...limits.achLimits,
        [section]: {
          ...limits.achLimits[section],
          [field]: value
        }
      }
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Settings Updated",
      description: "Your ACH limit settings have been successfully updated.",
    });
  };

  const handleCancel = () => {
    // Reset form or navigate back
  };

  const helpContent = (
    <div className="text-sm space-y-4">
      <p>This is the daily approval limit based on the effective date.</p>
      <div>
        <h3 className="font-medium mb-1">Setting ACH Limits</h3>
        <p>Leave blank lines for no limits and .01 for no authority.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Limit Types</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>Transaction:</strong> The maximum amount for a single transaction</li>
          <li><strong>Approval:</strong> The maximum amount that can be approved by this user</li>
          <li><strong>Daily Cumulative:</strong> The total amount allowed per day</li>
        </ul>
      </div>
      <div>
        <h3 className="font-medium mb-1">Payment Types</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>CCD:</strong> Corporate Credit or Debit</li>
          <li><strong>PPD:</strong> Prearranged Payment & Deposit</li>
          <li><strong>Child Support:</strong> Payments for child support</li>
          <li><strong>Tax:</strong> Tax-related payments</li>
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<SettingsIcon />}
          title="SET CUSTOM LIMITS"
          subtitle="Configure payment limits and approval thresholds."
          showPrintButton={false}
          showHelpButton={true}
        />
        
        <div className="p-4 md:p-6">
          <AssignAchLimit />
        </div>
      </main>
      
      <HelpSidebar
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="ACH Limits Help"
        content={helpContent}
      />
      
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="bg-bank-dark hover:bg-bank-dark/90 text-white rounded-full p-4 shadow-lg"
        >
          Help
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
