import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface User {
  lastName: string;
  firstName: string;
  userId: string;
  entitlement: 'Full' | 'None' | 'Custom';
  isApprover: boolean;
  isAdmin: boolean;
  status: 'active' | 'pending' | 'incomplete' | 'error' | 'approved' | 'rejected' | 'draft' | 'complete';
}

interface EditUserProps {
  open: boolean;
  onClose: () => void;
  user: User | null;
}

const EditUser: React.FC<EditUserProps> = ({ open, onClose, user }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    status: 'active',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mobile: '',
    userId: '',
    language: 'English (United States)',
    securityLevel: 'system-admin',
    approvals: 'none',
    paymentLimits: 'unlimited',
    accessSchedule: 'unlimited',
    userEntitlements: 'full'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        status: user.status,
      }));
    }
  }, [user]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(prev => prev + 1);
    } else {
      handleSave();
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "User information has been updated successfully.",
    });
    onClose();
    setStep(1);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        {step === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>User Status</Label>
              <RadioGroup
                value={formData.status}
                onValueChange={(value) => handleInputChange('status', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="inactive" id="inactive" />
                  <Label htmlFor="inactive">Inactive</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange('firstName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange('lastName', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Additional Numbers</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="secondary" />
                  <Label htmlFor="secondary">Secondary Phone Number</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="fax" />
                  <Label htmlFor="fax">Fax</Label>
                </div>
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="userId">User ID *</Label>
              <Input
                id="userId"
                value={formData.userId}
                onChange={(e) => handleInputChange('userId', e.target.value)}
                readOnly
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="language">Default Language</Label>
              <Input
                id="language"
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Security Level</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="sysadmin" checked />
                <Label htmlFor="sysadmin">System Administrator</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="confidential" />
                <Label htmlFor="confidential">Manage Confidential Batches</Label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Approvals</Label>
              <RadioGroup
                value={formData.approvals}
                onValueChange={(value) => handleInputChange('approvals', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none">None</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom" />
                  <Label htmlFor="custom">Custom</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label>Payment Limits</Label>
              <RadioGroup
                value={formData.paymentLimits}
                onValueChange={(value) => handleInputChange('paymentLimits', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unlimited" id="unlimited" />
                  <Label htmlFor="unlimited">Unlimited</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom-limits" />
                  <Label htmlFor="custom-limits">Custom</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleNext}>
            {step === 3 ? 'Save' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
