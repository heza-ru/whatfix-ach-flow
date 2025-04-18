
import React from 'react';
import { DollarSign } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import { Button } from '@/components/ui/button';
import { Template } from './QuickEntry';

const QuickEntryPreview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const templates = (location.state?.templates || []) as Template[];

  const handleCancel = () => {
    navigate('/payments/quick-entry');
  };

  const handleEditPayment = () => {
    navigate('/payments/quick-entry');
  };

  const handleSubmitPayment = () => {
    // Handle submit payment logic here
    navigate('/payments/history');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<DollarSign className="h-6 w-6" />}
          title="PREVIEW ACH QUICK ENTRY PAYMENTS"
          subtitle="Use this page to preview ACH payments using existing ACH templates"
          showPrintButton={true}
          showHelpButton={true}
        />
        
        <div className="p-6">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 bg-bank-primary text-white text-lg font-medium">
              PAYMENTS
            </div>
            
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left">
                    Template Name
                    <div className="text-xs text-gray-500">Description</div>
                  </th>
                  <th className="px-4 py-3 text-left">Payment Date</th>
                  <th className="px-4 py-3 text-left">
                    Company Account
                    <div className="text-xs text-gray-500">Co. Account Identifier</div>
                  </th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">
                    Recipient
                    <div className="text-xs text-gray-500">Recipient Bank</div>
                  </th>
                  <th className="px-4 py-3 text-right">Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {templates.map((template) => (
                  <tr key={template.id} className="border-t">
                    <td className="px-4 py-3">
                      <div className="font-medium text-blue-600">{template.name}</div>
                      <div className="text-sm text-gray-500">{template.description}</div>
                    </td>
                    <td className="px-4 py-3">{template.paymentDate || 'Not set'}</td>
                    <td className="px-4 py-3">
                      <div>{template.companyAccount}</div>
                      <div className="text-sm text-gray-500">{template.accountIdentifier}</div>
                    </td>
                    <td className="px-4 py-3">{template.type}</td>
                    <td className="px-4 py-3">
                      <div className="text-blue-600">{template.recipient}</div>
                      {template.recipientBank && (
                        <div className="text-sm text-gray-500">{template.recipientBank}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">{template.totalAmount.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 border-t flex justify-end space-x-4">
              <Button 
                variant="secondary"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button 
                variant="outline"
                onClick={handleEditPayment}
              >
                Edit Payment
              </Button>
              <Button 
                onClick={handleSubmitPayment}
              >
                Submit Payment
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuickEntryPreview;
