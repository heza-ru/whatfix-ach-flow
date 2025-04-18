
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
          <Card>
            <CardHeader className="bg-bank-primary text-white">
              <div className="flex justify-between items-center">
                <CardTitle>SET CUSTOM LIMITS</CardTitle>
                <div className="text-sm">
                  <button className="mr-2 underline">Expand All</button>
                  |
                  <button className="ml-2 underline">Collapse All</button>
                </div>
              </div>
              <CardDescription className="text-gray-100">
                Leave blank lines for no limits and .01 for no authority
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <Label className="text-gray-700 mb-2 block">Limit Settings</Label>
                  <RadioGroup 
                    value={limits.limitSettings}
                    onValueChange={handleLimitSettingChange}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard">Standard</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="extended" id="extended" />
                      <Label htmlFor="extended">Extended</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div>
                  <Label className="text-gray-700 mb-2 block">Limits Currency</Label>
                  <div className="font-medium">USD</div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 mb-6 rounded-sm border border-blue-200">
                <h3 className="text-lg font-medium mb-2">US ACH</h3>
                
                <Tabs defaultValue="transaction">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="transaction">Transaction</TabsTrigger>
                    <TabsTrigger value="approval">Approval</TabsTrigger>
                    <TabsTrigger value="dailyCumulative">
                      Daily Cumulative
                      <div className="ml-2">
                        <InfoTooltip content="This is the daily approval limit based on the effective date." />
                      </div>
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="transaction" className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="all-transaction" className="text-gray-700 mb-2 block">SET / REMOVE ALL</Label>
                        <Input 
                          id="all-transaction" 
                          value={limits.achLimits.transaction.all}
                          onChange={(e) => handleLimitChange('transaction', 'all', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ccd-transaction" className="text-gray-700 mb-2 block">CCD - Corporate Credit or Debit</Label>
                        <Input 
                          id="ccd-transaction" 
                          value={limits.achLimits.transaction.ccd}
                          onChange={(e) => handleLimitChange('transaction', 'ccd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="child-support-transaction" className="text-gray-700 mb-2 block">Child Support</Label>
                        <Input 
                          id="child-support-transaction" 
                          value={limits.achLimits.transaction.childSupport}
                          onChange={(e) => handleLimitChange('transaction', 'childSupport', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ppd-transaction" className="text-gray-700 mb-2 block">PPD - Prearranged Payment & Deposit</Label>
                        <Input 
                          id="ppd-transaction" 
                          value={limits.achLimits.transaction.ppd}
                          onChange={(e) => handleLimitChange('transaction', 'ppd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tax-transaction" className="text-gray-700 mb-2 block">Tax</Label>
                        <Input 
                          id="tax-transaction" 
                          value={limits.achLimits.transaction.tax}
                          onChange={(e) => handleLimitChange('transaction', 'tax', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="approval" className="space-y-4">
                    {/* Similar structure as transaction tab */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="all-approval" className="text-gray-700 mb-2 block">SET / REMOVE ALL</Label>
                        <Input 
                          id="all-approval" 
                          value={limits.achLimits.approval.all}
                          onChange={(e) => handleLimitChange('approval', 'all', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ccd-approval" className="text-gray-700 mb-2 block">CCD - Corporate Credit or Debit</Label>
                        <Input 
                          id="ccd-approval" 
                          value={limits.achLimits.approval.ccd}
                          onChange={(e) => handleLimitChange('approval', 'ccd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="child-support-approval" className="text-gray-700 mb-2 block">Child Support</Label>
                        <Input 
                          id="child-support-approval" 
                          value={limits.achLimits.approval.childSupport}
                          onChange={(e) => handleLimitChange('approval', 'childSupport', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ppd-approval" className="text-gray-700 mb-2 block">PPD - Prearranged Payment & Deposit</Label>
                        <Input 
                          id="ppd-approval" 
                          value={limits.achLimits.approval.ppd}
                          onChange={(e) => handleLimitChange('approval', 'ppd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tax-approval" className="text-gray-700 mb-2 block">Tax</Label>
                        <Input 
                          id="tax-approval" 
                          value={limits.achLimits.approval.tax}
                          onChange={(e) => handleLimitChange('approval', 'tax', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="dailyCumulative" className="space-y-4">
                    {/* Similar structure as transaction tab */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="all-daily" className="text-gray-700 mb-2 block">SET / REMOVE ALL</Label>
                        <Input 
                          id="all-daily" 
                          value={limits.achLimits.dailyCumulative.all}
                          onChange={(e) => handleLimitChange('dailyCumulative', 'all', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="ccd-daily" className="text-gray-700 mb-2 block">CCD - Corporate Credit or Debit</Label>
                        <Input 
                          id="ccd-daily" 
                          value={limits.achLimits.dailyCumulative.ccd}
                          onChange={(e) => handleLimitChange('dailyCumulative', 'ccd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="child-support-daily" className="text-gray-700 mb-2 block">Child Support</Label>
                        <Input 
                          id="child-support-daily" 
                          value={limits.achLimits.dailyCumulative.childSupport}
                          onChange={(e) => handleLimitChange('dailyCumulative', 'childSupport', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div>
                        <Label htmlFor="ppd-daily" className="text-gray-700 mb-2 block">PPD - Prearranged Payment & Deposit</Label>
                        <Input 
                          id="ppd-daily" 
                          value={limits.achLimits.dailyCumulative.ppd}
                          onChange={(e) => handleLimitChange('dailyCumulative', 'ppd', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="tax-daily" className="text-gray-700 mb-2 block">Tax</Label>
                        <Input 
                          id="tax-daily" 
                          value={limits.achLimits.dailyCumulative.tax}
                          onChange={(e) => handleLimitChange('dailyCumulative', 'tax', e.target.value)}
                          className="border-gray-300"
                        />
                      </div>
                      <div></div>
                      <div></div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={handleCancel} className="bg-gray-500 text-white border-none hover:bg-gray-600">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-bank-primary hover:bg-bank-primary/90">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>
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
