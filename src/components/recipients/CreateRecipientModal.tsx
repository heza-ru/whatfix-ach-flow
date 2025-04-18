
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CreateRecipientFormData, Recipient } from '@/types/recipient';
import { v4 as uuidv4 } from 'uuid';

interface CreateRecipientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipientCreated: (recipient: Recipient) => void;
}

const CreateRecipientModal: React.FC<CreateRecipientModalProps> = ({
  isOpen,
  onClose,
  onRecipientCreated,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<CreateRecipientFormData>({
    // Step 1
    recipientType: 'ACH Domestic',
    achRecipientType: 'Individual',
    paymentType: 'PPD',
    
    // Step 2
    name: '',
    recipientId: '',
    accountType: 'Checking',
    accountNumber: '',
    bankSelectionMethod: 'List',
    bankId: '',
    bankName: '',
    
    // Step 3
    addContactInfo: false
  });

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = () => {
    // Create a new recipient from the form data
    const newRecipient: Recipient = {
      id: uuidv4(),
      name: formData.name,
      recipientId: formData.recipientId,
      bankId: formData.bankId,
      bankName: formData.bankName,
      accountNumber: formData.accountNumber,
      accountType: formData.accountType,
      status: 'Active',
      achEnabled: true,
    };

    onRecipientCreated(newRecipient);
    
    // Reset form
    setFormData({
      recipientType: 'ACH Domestic',
      achRecipientType: 'Individual',
      paymentType: 'PPD',
      name: '',
      recipientId: '',
      accountType: 'Checking',
      accountNumber: '',
      bankSelectionMethod: 'List',
      bankId: '',
      bankName: '',
      addContactInfo: false
    });
    setCurrentStep(1);
  };

  const handleCancel = () => {
    onClose();
    setCurrentStep(1);
    setFormData({
      recipientType: 'ACH Domestic',
      achRecipientType: 'Individual',
      paymentType: 'PPD',
      name: '',
      recipientId: '',
      accountType: 'Checking',
      accountNumber: '',
      bankSelectionMethod: 'List',
      bankId: '',
      bankName: '',
      addContactInfo: false
    });
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Step 1: Use this page to add a new payment recipient</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start space-x-8">
          <div className="w-1/3 text-right pt-1">
            <label className="font-medium">
              Recipient Type <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="achDomestic" checked disabled />
            <Label htmlFor="achDomestic">ACH Domestic Recipient</Label>
          </div>
        </div>
        
        <div className="flex">
          <div className="w-1/3"></div>
          <div className="w-2/3 border-t border-gray-200 my-4"></div>
        </div>

        <div className="flex items-start space-x-8">
          <div className="w-1/3 text-right pt-1">
            <label className="font-medium">
              ACH Recipient Types <span className="text-red-500">*</span>
            </label>
          </div>
          <div>
            <RadioGroup
              value={formData.achRecipientType}
              onValueChange={(value) => handleRadioChange('achRecipientType', value)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Individual" id="individual" />
                <Label htmlFor="individual">Individual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Business" id="business" />
                <Label htmlFor="business">Business</Label>
              </div>
            </RadioGroup>
            
            <div className="mt-6 border-t border-dashed border-gray-300 pt-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="ppdPayment" 
                  checked={formData.paymentType === 'PPD'} 
                  onCheckedChange={() => handleRadioChange('paymentType', 'PPD')}
                />
                <Label htmlFor="ppdPayment">PPD - Prearranged Payment and Deposit</Label>
              </div>
              
              <div className="flex items-center space-x-2 mt-3">
                <Checkbox 
                  id="ccdPayment" 
                  checked={formData.paymentType === 'CCD'} 
                  onCheckedChange={() => handleRadioChange('paymentType', 'CCD')}
                />
                <Label htmlFor="ccdPayment">CCD - Corporate Credit or Debit</Label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Step 2: Use this page to add payment information for each payment type</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">
              Recipient Name <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <Input 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Enter Name" 
              required 
            />
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium">ACH RECIPIENT - ACCOUNT INFORMATION</h4>
            <div className="rounded-full bg-gray-300 p-1">-</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">
              ACH Recipient ID <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <Input 
              name="recipientId" 
              value={formData.recipientId} 
              onChange={handleInputChange} 
              placeholder="Enter ACH Recipient ID" 
              required 
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">
              Account Type <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <Select 
              value={formData.accountType} 
              onValueChange={(value) => handleSelectChange('accountType', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select an Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Checking">Checking</SelectItem>
                <SelectItem value="Savings">Savings</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">
              Account Number <span className="text-red-500">*</span>
            </label>
          </div>
          <div className="w-2/3">
            <Input 
              name="accountNumber" 
              value={formData.accountNumber} 
              onChange={handleInputChange} 
              placeholder="Enter Account Number" 
              required 
            />
          </div>
        </div>
        
        <div className="flex items-start space-x-8">
          <div className="w-1/3 text-right pt-1">
            <label className="font-medium">
              Bank <span className="text-red-500">*</span>
            </label>
          </div>
          <div>
            <RadioGroup
              value={formData.bankSelectionMethod}
              onValueChange={(value) => handleRadioChange('bankSelectionMethod', value)}
              className="flex flex-col space-y-3"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="List" id="selectFromList" />
                <Label htmlFor="selectFromList">Select from List</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Manual" id="enterManually" />
                <Label htmlFor="enterManually">Enter Bank Information with Bank ID</Label>
              </div>
            </RadioGroup>
            
            {formData.bankSelectionMethod === 'List' && (
              <div className="mt-4 bg-blue-50 p-4 rounded-md">
                <div className="flex justify-between mb-4">
                  <Button variant="default" className="bg-blue-600">
                    Preferred Bank List
                  </Button>
                  <Button variant="default" className="bg-blue-600">
                    Full Bank List
                  </Button>
                </div>
                
                {/* This would be a bank selection component in a real app */}
                <div className="mt-4">
                  <Select 
                    value={formData.bankId} 
                    onValueChange={(value) => {
                      handleSelectChange('bankId', value);
                      // In a real app, you would get the bank name from the selected bank
                      const bankNames: Record<string, string> = {
                        '221982389': '(AFCU) ACADEMIC FEDERAL CREDIT UNION',
                        '226077862': 'SEIU FEDERAL CREDIT UNION',
                        '263078950': 'FIRST NATIONAL BANK'
                      };
                      handleSelectChange('bankName', bankNames[value] || 'Unknown Bank');
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="221982389">(AFCU) ACADEMIC FEDERAL CREDIT UNION</SelectItem>
                      <SelectItem value="226077862">SEIU FEDERAL CREDIT UNION</SelectItem>
                      <SelectItem value="263078950">FIRST NATIONAL BANK</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            
            {formData.bankSelectionMethod === 'Manual' && (
              <div className="mt-4 space-y-4">
                <Input 
                  name="bankId" 
                  value={formData.bankId} 
                  onChange={handleInputChange} 
                  placeholder="Enter Bank ID"
                />
                <Input 
                  name="bankName" 
                  value={formData.bankName} 
                  onChange={handleInputChange} 
                  placeholder="Enter Bank Name"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-md">
        <h3 className="text-lg font-medium mb-2">Step 3: Before submitting, use this page to review the payment recipient information</h3>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Recipient Name</label>
          </div>
          <div className="w-2/3">
            <p>{formData.name}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium">ACH RECIPIENT - ACCOUNT INFORMATION</h4>
            <div className="rounded-full bg-gray-300 p-1">-</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">ACH Recipient Types</label>
          </div>
          <div className="w-2/3">
            <p>{formData.achRecipientType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Payment Types</label>
          </div>
          <div className="w-2/3">
            <p>{formData.paymentType === 'PPD' ? 'PPD - Prearranged Payment and Deposit' : 'CCD - Corporate Credit or Debit'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">ACH Recipient ID</label>
          </div>
          <div className="w-2/3">
            <p>{formData.recipientId}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Account Type</label>
          </div>
          <div className="w-2/3">
            <p>{formData.accountType}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Account Number</label>
          </div>
          <div className="w-2/3">
            <p>{formData.accountNumber}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Bank ID</label>
          </div>
          <div className="w-2/3">
            <p>{formData.bankId}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Bank Name</label>
          </div>
          <div className="w-2/3">
            <p>{formData.bankName}</p>
          </div>
        </div>
        
        <div className="bg-gray-100 p-4 rounded-md mt-6">
          <div className="flex items-center justify-between">
            <h4 className="text-md font-medium">ACH RECIPIENT - ADDITIONAL INFORMATION</h4>
            <div className="rounded-full bg-gray-300 p-1">-</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="w-1/3 text-right">
            <label className="font-medium">Recipient Contact</label>
          </div>
          <div className="w-2/3">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="addContactInfo" 
                checked={formData.addContactInfo} 
                onCheckedChange={(checked) => handleCheckboxChange('addContactInfo', checked === true)}
              />
              <Label htmlFor="addContactInfo">Add Contact Information</Label>
            </div>
          </div>
        </div>
        
        {formData.addContactInfo && (
          <div className="pl-[33%] space-y-4">
            <Input 
              name="contactName" 
              value={formData.contactName || ''} 
              onChange={handleInputChange} 
              placeholder="Contact Name" 
            />
            <Input 
              name="contactEmail" 
              value={formData.contactEmail || ''} 
              onChange={handleInputChange} 
              placeholder="Contact Email" 
              type="email"
            />
            <Input 
              name="contactPhone" 
              value={formData.contactPhone || ''} 
              onChange={handleInputChange} 
              placeholder="Contact Phone" 
              type="tel"
            />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) handleCancel();
    }}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white bg-blue-600 -m-6 p-6 flex items-center">
            {currentStep === 3 ? 'PREVIEW MASTER RECIPIENT' : 'CREATE MASTER RECIPIENT'}
            <div className="ml-auto text-sm font-normal">
              <span className="bg-red-500 text-white px-2 py-1 rounded-full">*</span> Required Fields
            </div>
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
        
        <div className="flex justify-between mt-8">
          <div>
            <Button variant="secondary" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
          </div>
          <div>
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handleBack} className="mr-2">
                Back
              </Button>
            )}
            {currentStep < 3 ? (
              <Button variant="default" onClick={handleNext} className="bg-blue-600">
                Next
              </Button>
            ) : (
              <Button variant="default" onClick={handleSubmit} className="bg-blue-600">
                Submit Recipient
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipientModal;
