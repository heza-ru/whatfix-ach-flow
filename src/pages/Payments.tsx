
import React, { useState } from 'react';
import { DollarSign, Users, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import HelpSidebar from '@/components/layout/HelpSidebar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { mockRecipients } from '@/utils/mockData';

const PaymentsPage = () => {
  const { toast } = useToast();
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    paymentType: 'PPD',
    frequency: 'one-time',
    effectiveDate: '',
    approveOnSubmit: false,
    recipients: []
  });

  const handleInputChange = (field: string, value: any) => {
    setPaymentForm({
      ...paymentForm,
      [field]: value
    });
  };

  const handleSubmit = () => {
    toast({
      title: "Payment Created",
      description: "Your payment has been successfully created.",
    });
  };

  const helpContent = (
    <div className="text-sm space-y-4">
      <p>The payments screen allows you to create new ACH payments.</p>
      <div>
        <h3 className="font-medium mb-1">Payment Types</h3>
        <ul className="list-disc list-inside space-y-1">
          <li><strong>PPD:</strong> Prearranged Payment & Deposit - Used for payments to individuals</li>
          <li><strong>CCD:</strong> Corporate Credit or Debit - Used for business-to-business payments</li>
        </ul>
      </div>
      <div>
        <h3 className="font-medium mb-1">Frequency Options</h3>
        <p>Select "One-Time Only" for a single payment, or "Recurring" to set up repeating payments.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Recipient Selection</h3>
        <p>You can select existing recipients from your master list or import recipients from a file.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Transaction Codes</h3>
        <p>If you receive an error message about required transaction codes when importing recipient files, try the following:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Click on the pencil icon associated with your import profile.</li>
          <li>Select one of the three options for recipient imports (if an option isn't already selected).</li>
          <li>Save the updated import profile.</li>
          <li>Import the file again.</li>
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
          icon={<DollarSign />}
          title="CREATE NEW PAYMENT"
          subtitle="Fill out the form to create a new ACH payment."
          showPrintButton={false}
          showHelpButton={true}
        />
        
        <div className="p-4 md:p-6">
          <Card>
            <CardHeader className="bg-white border-b">
              <CardTitle className="text-xl">Payment Details</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-gray-700 mb-2 block">Frequency</Label>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full bg-bank-primary w-6 h-6 flex items-center justify-center text-white">
                          <span className="text-xs">●</span>
                        </div>
                        <Label>One-Time Only</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="rounded-full border-2 border-gray-300 w-6 h-6 flex items-center justify-center">
                          <span className="text-xs text-transparent">●</span>
                        </div>
                        <Label>Recurring</Label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-gray-700 mb-2 block">Workflow</Label>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="approve-on-submit" 
                        checked={paymentForm.approveOnSubmit}
                        onCheckedChange={(checked) => 
                          handleInputChange('approveOnSubmit', checked === true)
                        }
                      />
                      <Label htmlFor="approve-on-submit">Approve on Submit</Label>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-6">
            <Card>
              <CardHeader className="bg-bank-primary text-white">
                <CardTitle>RECIPIENTS</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex justify-end space-x-4 mb-6">
                  <Button variant="outline" className="bg-white border-gray-300">
                    Select Recipients
                  </Button>
                  <Button variant="outline" className="bg-white border-gray-300">
                    Import from File
                  </Button>
                </div>
                
                <table className="w-full bank-table">
                  <thead>
                    <tr>
                      <th className="text-left">Recipient Name</th>
                      <th className="text-left">Bank ID</th>
                      <th className="text-left">Account Number</th>
                      <th className="text-right">Amount</th>
                      <th>Disc. Data</th>
                      <th>Status</th>
                      <th>Addenda</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={7} className="text-center py-8 text-gray-500">
                        NO RECIPIENT SELECTED
                      </td>
                    </tr>
                  </tbody>
                </table>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="bg-gray-500 text-white border-none hover:bg-gray-600">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <HelpSidebar
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Payments Help"
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

export default PaymentsPage;
