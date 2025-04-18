
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface AchLimitForm {
  approvalsPerDay: string;
  paymentLimit: string;
  dailyCumulation: string;
}

export const AssignAchLimit = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<AchLimitForm>({
    approvalsPerDay: '',
    paymentLimit: '',
    dailyCumulation: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (step < 8) {
      setStep(prev => prev + 1);
    }
  };

  const handleSave = () => {
    toast({
      title: "Success",
      description: "ACH limits have been successfully updated.",
    });
    // Reset the form
    setStep(1);
    setFormData({
      approvalsPerDay: '',
      paymentLimit: '',
      dailyCumulation: ''
    });
  };

  return (
    <div className="space-y-6">
      {step === 8 ? (
        <Card>
          <CardHeader>
            <CardTitle>Required Fields</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="approvalsPerDay">No. of approvals per day</Label>
                <Input
                  id="approvalsPerDay"
                  name="approvalsPerDay"
                  value={formData.approvalsPerDay}
                  onChange={handleInputChange}
                  placeholder="Enter number of approvals"
                />
              </div>
              
              <div>
                <Label htmlFor="paymentLimit">Payment limit</Label>
                <Input
                  id="paymentLimit"
                  name="paymentLimit"
                  value={formData.paymentLimit}
                  onChange={handleInputChange}
                  placeholder="Enter payment limit"
                />
              </div>
              
              <div>
                <Label htmlFor="dailyCumulation">Daily Cumulation</Label>
                <Input
                  id="dailyCumulation"
                  name="dailyCumulation"
                  value={formData.dailyCumulation}
                  onChange={handleInputChange}
                  placeholder="Enter daily cumulation limit"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setStep(prev => prev - 1)}
              >
                Back
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              Step {step} of 8
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                {step === 1 && "Click Administration to begin"}
                {step === 2 && "Select Users from the menu"}
                {step === 3 && "Click on the Action dropdown button"}
                {step === 4 && "Click Edit User"}
                {step === 5 && "Check all the information and proceed"}
                {step === 6 && "Review the information"}
                {step === 7 && "Click Next to continue"}
              </p>
              
              <div className="flex justify-end">
                <Button onClick={handleNext}>
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AssignAchLimit;
