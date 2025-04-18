
import React, { useState } from 'react';
import { CalendarIcon } from 'lucide-react';
import { Template } from '@/pages/QuickEntry';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Bi-weekly payroll',
    description: 'Payroll',
    paymentDate: '',
    companyAccount: '*****2534',
    accountIdentifier: '7451266791 - E2ETesting7',
    type: 'PPD',
    recipient: 'View Recipients',
    totalAmount: 18.50
  },
  {
    id: '2',
    name: 'Invoices',
    description: 'Test',
    paymentDate: '',
    companyAccount: '*****8189',
    accountIdentifier: '6264419538 - E2ETesting2',
    type: 'CCD',
    recipient: 'View Recipients',
    totalAmount: 20.25
  }
];

interface QuickEntryTableProps {
  onSelectedTemplatesChange: (templates: Template[]) => void;
  selectedTemplates: Template[];
}

const QuickEntryTable: React.FC<QuickEntryTableProps> = ({
  onSelectedTemplatesChange,
  selectedTemplates
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCheckboxChange = (template: Template) => {
    const isSelected = selectedTemplates.some(t => t.id === template.id);
    if (isSelected) {
      onSelectedTemplatesChange(selectedTemplates.filter(t => t.id !== template.id));
    } else {
      onSelectedTemplatesChange([...selectedTemplates, template]);
    }
  };

  const handleSelectAll = () => {
    if (selectedTemplates.length === mockTemplates.length) {
      onSelectedTemplatesChange([]);
    } else {
      onSelectedTemplatesChange([...mockTemplates]);
    }
  };

  const isSelected = (template: Template) => 
    selectedTemplates.some(t => t.id === template.id);

  return (
    <div>
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left">
              <Checkbox 
                checked={selectedTemplates.length === mockTemplates.length}
                onCheckedChange={handleSelectAll}
              />
            </th>
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
          {mockTemplates.map((template) => (
            <tr key={template.id} className="border-t">
              <td className="px-4 py-3">
                <Checkbox 
                  checked={isSelected(template)}
                  onCheckedChange={() => handleCheckboxChange(template)}
                />
              </td>
              <td className="px-4 py-3">
                <div className="font-medium text-blue-600">{template.name}</div>
                <div className="text-sm text-gray-500">{template.description}</div>
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center space-x-2">
                  <input 
                    type="text" 
                    placeholder="mm/dd/yyyy"
                    className="border p-1 w-24"
                  />
                  <Button variant="ghost" size="icon">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </div>
              </td>
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

      <div className="p-4 border-t flex items-center justify-between text-sm">
        <div>
          Showing {Math.min(itemsPerPage, mockTemplates.length)} of {mockTemplates.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <select 
            className="border rounded p-1"
            value={itemsPerPage}
          >
            <option value={10}>Show 10</option>
            <option value={25}>Show 25</option>
            <option value={50}>Show 50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default QuickEntryTable;
