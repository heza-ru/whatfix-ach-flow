import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

const defaultFormState = {
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
  userEntitlements: 'full',
  customApprovalLimit: '',
  customPaymentLimit: '',
  customAccessSchedule: ''
};

const EditUser: React.FC<EditUserProps> = ({ open, onClose, user }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(defaultFormState);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        firstName: user.firstName,
        lastName: user.lastName,
        userId: user.userId,
        status: user.status,
        userEntitlements: user.entitlement.toLowerCase(),
        approvals: user.isApprover ? 'custom' : 'none',
      }));
    } else {
      setFormData(defaultFormState);
    }
    setStep(1);
  }, [user, open]);

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

  const resetForm = () => {
    setStep(1);
    setFormData(defaultFormState);
    setIsProcessing(false);
  };

  const handleSave = () => {
    setIsProcessing(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      toast({
        title: "Success",
        description: "User information has been updated successfully.",
      });
      
      setIsProcessing(false);
      resetForm();
      onClose();
    }, 1000);
  };

  const handleDialogClose = () => {
    resetForm();
    onClose();
  };

  const progressPercentage = ((step - 1) / 2) * 100;

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{user ? 'Edit User' : 'Add User'}</DialogTitle>
          <DialogDescription>
            Step {step} of 3
          </DialogDescription>
        </DialogHeader>

        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-sm font-medium">
            <span className={step >= 1 ? "text-primary" : "text-muted-foreground"}>User Details</span>
            <span className={step >= 2 ? "text-primary" : "text-muted-foreground"}>System Access</span>
            <span className={step >= 3 ? "text-primary" : "text-muted-foreground"}>Permissions</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

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
                  <RadioGroupItem value="pending" id="pending" />
                  <Label htmlFor="pending">Inactive</Label>
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
                readOnly={!!user}
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

            <div className="space-y-2">
              <Label>User Entitlements</Label>
              <RadioGroup
                value={formData.userEntitlements}
                onValueChange={(value) => handleInputChange('userEntitlements', value)}
                className="space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="full" id="full-access" />
                  <Label htmlFor="full-access">Full Access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="none" id="no-access" />
                  <Label htmlFor="no-access">No Access</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom-access" />
                  <Label htmlFor="custom-access">Custom Access</Label>
                </div>
              </RadioGroup>
              
              {formData.userEntitlements === 'custom' && (
                <div className="border p-3 rounded-md mt-2 bg-gray-50">
                  <Tabs defaultValue="payment" className="w-full">
                    <TabsList className="w-full grid grid-cols-3">
                      <TabsTrigger value="payment">Payment</TabsTrigger>
                      <TabsTrigger value="reporting">Reporting</TabsTrigger>
                      <TabsTrigger value="admin">Admin</TabsTrigger>
                    </TabsList>
                    <TabsContent value="payment" className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="view-payments" defaultChecked />
                        <Label htmlFor="view-payments">View Payments</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="create-payments" />
                        <Label htmlFor="create-payments">Create Payments</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="approve-payments" />
                        <Label htmlFor="approve-payments">Approve Payments</Label>
                      </div>
                    </TabsContent>
                    <TabsContent value="reporting" className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="view-reports" defaultChecked />
                        <Label htmlFor="view-reports">View Reports</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="create-reports" />
                        <Label htmlFor="create-reports">Create Reports</Label>
                      </div>
                    </TabsContent>
                    <TabsContent value="admin" className="space-y-2 pt-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="manage-users" />
                        <Label htmlFor="manage-users">Manage Users</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="system-settings" />
                        <Label htmlFor="system-settings">System Settings</Label>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label>Access Schedule</Label>
              <RadioGroup
                value={formData.accessSchedule}
                onValueChange={(value) => handleInputChange('accessSchedule', value)}
                className="flex gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unlimited" id="unlimited-access" />
                  <Label htmlFor="unlimited-access">Unlimited</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="custom" id="custom-schedule" />
                  <Label htmlFor="custom-schedule">Custom</Label>
                </div>
              </RadioGroup>
              
              {formData.accessSchedule === 'custom' && (
                <div className="border p-3 rounded-md mt-2 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input 
                        id="start-time" 
                        type="time" 
                        value={formData.customAccessSchedule || "09:00"} 
                        onChange={(e) => handleInputChange('customAccessSchedule', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="end-time">End Time</Label>
                      <Input 
                        id="end-time" 
                        type="time" 
                        defaultValue="17:00" 
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Security Level</Label>
              <div className="flex items-center space-x-2">
                <Checkbox id="sysadmin" defaultChecked />
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
              
              {formData.approvals === 'custom' && (
                <div className="border p-3 rounded-md mt-2 bg-gray-50 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="approval-limit">Approval Limit ($)</Label>
                    <Input 
                      id="approval-limit" 
                      type="number" 
                      placeholder="Enter limit amount"
                      value={formData.customApprovalLimit}
                      onChange={(e) => handleInputChange('customApprovalLimit', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="multiple-approvals" />
                    <Label htmlFor="multiple-approvals">Allow Multiple Approvals</Label>
                  </div>
                </div>
              )}
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
              
              {formData.paymentLimits === 'custom' && (
                <div className="border p-3 rounded-md mt-2 bg-gray-50 space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="payment-limit">Payment Limit ($)</Label>
                    <Input 
                      id="payment-limit" 
                      type="number" 
                      placeholder="Enter limit amount"
                      value={formData.customPaymentLimit}
                      onChange={(e) => handleInputChange('customPaymentLimit', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="per-payment" defaultChecked />
                    <Label htmlFor="per-payment">Per Payment</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="daily-limit" />
                    <Label htmlFor="daily-limit">Daily Limit</Label>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-6">
          {step > 1 && (
            <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleDialogClose} disabled={isProcessing}>
            Cancel
          </Button>
          <Button onClick={handleNext} disabled={isProcessing}>
            {isProcessing ? "Processing..." : step === 3 ? 'Save' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditUser;
