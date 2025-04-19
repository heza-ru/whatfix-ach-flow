import React, { useState } from 'react';
import { FileText, FileUp, Plus, Check, CheckCheck, Search, ChevronDown, Save, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Recipient } from '@/types/recipient';
import { PPDTemplate } from '@/types/ppdTemplate';
import { mockRecipients } from '@/utils/recipientMockData';
import Header from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const PPDTemplatePage = () => {
  const { toast } = useToast();
  const [isSelectRecipientOpen, setIsSelectRecipientOpen] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState<Recipient[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [ppdTemplate, setPpdTemplate] = useState<Partial<PPDTemplate>>({
    activationDate: new Date().toISOString().split('T')[0],
    name: '',
    originatingAccount: '',
    originatingAchCompanyId: '',
    companyEntryDescription: '',
    companyDiscretionaryData: '',
    templateLimit: undefined,
    recipients: []
  });
  
  const formSchema = z.object({
    activationDate: z.string().min(1, "Template activation date is required"),
    name: z.string().min(1, "Template name is required"),
    originatingAccount: z.string().min(1, "Originating account is required"),
    originatingAchCompanyId: z.string().min(1, "Originating ACH Company ID is required"),
    companyEntryDescription: z.string().min(1, "Company entry description is required"),
    companyDiscretionaryData: z.string().optional(),
    templateLimit: z.coerce.number().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      activationDate: new Date().toISOString().split('T')[0],
      name: '',
      originatingAccount: '',
      originatingAchCompanyId: '',
      companyEntryDescription: '',
      companyDiscretionaryData: '',
      templateLimit: undefined,
    },
  });

  const filteredRecipients = mockRecipients.filter(recipient => 
    recipient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.recipientId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    recipient.accountNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecipient = (recipient: Recipient) => {
    if (selectedRecipients.some(r => r.id === recipient.id)) {
      setSelectedRecipients(selectedRecipients.filter(r => r.id !== recipient.id));
    } else {
      setSelectedRecipients([...selectedRecipients, recipient]);
    }
  };

  const handleDoneSelectingRecipients = () => {
    setPpdTemplate({
      ...ppdTemplate,
      recipients: selectedRecipients
    });
    setIsSelectRecipientOpen(false);
    
    toast({
      title: "Recipients Selected",
      description: `Added ${selectedRecipients.length} recipients to the template.`,
    });
  };

  const handleSubmitPPDForm = (values: z.infer<typeof formSchema>) => {
    setPpdTemplate({
      ...ppdTemplate,
      ...values,
    });
    
    toast({
      title: "Template Information Updated",
      description: "Your PPD template information has been updated.",
    });
  };

  const handleCreateRecipient = () => {
    toast({
      title: "Create Recipient",
      description: "Redirecting to create recipient page...",
    });
  };

  const handleImportFromFile = () => {
    toast({
      title: "Import Recipients",
      description: "Import from file functionality would be implemented here.",
    });
  };

  const handleSaveIncomplete = () => {
    const draftTemplate = {
      ...ppdTemplate,
      status: 'draft',
      recipients: selectedRecipients
    };
    
    toast({
      title: "Draft Saved",
      description: "Your template has been saved as a draft.",
    });
  };

  return (
    <div className="min-h-screen bg-neutral-background">
      <Header />
      <Navigation />
      
      <div className="container mx-auto p-4">
        <div className="flex items-center mb-4">
          <div className="mr-4 text-gray-500">
            <FileText size={36} />
          </div>
          <div>
            <h1 className="text-2xl font-medium text-text-primary">CREATE PPD TEMPLATE</h1>
            <p className="text-sm text-text-secondary">Use this page to create a new ACH Prearranged Payment and Deposit template.</p>
          </div>
          <div className="ml-auto">
            <Button variant="outline" className="bg-white text-text-secondary border-neutral-divider">
              Help
            </Button>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-neutral-surface shadow-sm rounded-lg overflow-hidden">
            <div className="bg-bank-primary text-white px-6 py-3 flex justify-between items-center">
              <h2 className="text-lg font-medium">TEMPLATE INFORMATION</h2>
              <div className="text-sm">
                <span className="text-red-200">*</span> Required Fields
              </div>
            </div>
            
            <div className="p-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmitPPDForm)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="activationDate"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Template Activation <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Template Name <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter Template Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="originatingAccount"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Originating Account <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                  {field.value || "Select an Originating Account"}
                                  <ChevronDown size={16} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <div className="p-2">
                                  <div className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => form.setValue('originatingAccount', 'Account 1')}>
                                    Account 1
                                  </div>
                                  <div className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => form.setValue('originatingAccount', 'Account 2')}>
                                    Account 2
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="originatingAchCompanyId"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Originating ACH Company ID <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button variant="outline" className="w-full justify-between">
                                  {field.value || "Select an ACH Company ID"}
                                  <ChevronDown size={16} />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-full p-0">
                                <div className="p-2">
                                  <div className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => form.setValue('originatingAchCompanyId', '7451266791 - E2ETesting7')}>
                                    7451266791 - E2ETesting7
                                  </div>
                                  <div className="cursor-pointer p-2 hover:bg-gray-100" onClick={() => form.setValue('originatingAchCompanyId', '8862377892 - Test Company')}>
                                    8862377892 - Test Company
                                  </div>
                                </div>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyEntryDescription"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Company Entry Description <span className="text-red-500">*</span>
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter Description" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="companyDiscretionaryData"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Company Discretionary Data
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input placeholder="Enter Discretionary Data" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="templateLimit"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex justify-between">
                            <FormLabel className="text-sm font-medium">
                              Template Limit
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Input type="number" placeholder="Enter Template Limit" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </div>
          </div>
          
          <div className="bg-neutral-surface shadow-sm rounded-lg overflow-hidden">
            <div className="bg-bank-primary text-white px-6 py-3">
              <h2 className="text-lg font-medium">RECIPIENTS</h2>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap gap-2 justify-end mb-4">
                <Button 
                  variant="outline" 
                  className="bg-gray-400 text-white border-gray-400 hover:bg-gray-500 hover:border-gray-500 min-w-[120px]"
                  onClick={() => setIsSelectRecipientOpen(true)}
                >
                  Select Recipients
                </Button>
                <Button 
                  onClick={handleCreateRecipient}
                  variant="outline" 
                  className="bg-white text-gray-700 border-gray-300"
                >
                  <Plus size={16} className="mr-1" />
                  Create New
                </Button>
                <Button 
                  onClick={handleImportFromFile}
                  variant="outline" 
                  className="bg-white text-gray-700 border-gray-300"
                >
                  <FileUp size={16} className="mr-1" />
                  Import from File
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader className="bg-gray-500">
                    <TableRow>
                      <TableHead className="w-[250px]">Recipient Name<br/>Recipient ID</TableHead>
                      <TableHead>Bank ID<br/>Bank Name</TableHead>
                      <TableHead>Account Number<br/>Account Type</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>CR/DR</TableHead>
                      <TableHead>Disc. Data</TableHead>
                      <TableHead>Status<br/>Prenote Expiry</TableHead>
                      <TableHead>Addenda</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRecipients.length > 0 ? (
                      selectedRecipients.map((recipient) => (
                        <TableRow key={recipient.id}>
                          <TableCell className="font-medium">
                            {recipient.name}<br/>
                            <span className="text-gray-500">{recipient.recipientId}</span>
                          </TableCell>
                          <TableCell>
                            {recipient.bankId}<br/>
                            <span className="text-gray-500">{recipient.bankName || ''}</span>
                          </TableCell>
                          <TableCell>
                            {recipient.accountNumber}<br/>
                            <span className="text-gray-500">{recipient.accountType}</span>
                          </TableCell>
                          <TableCell>{recipient.amount || '0.00'}</TableCell>
                          <TableCell>{recipient.crdr || 'Credit'}</TableCell>
                          <TableCell>{recipient.discretionaryData || ''}</TableCell>
                          <TableCell>
                            {recipient.status || 'Active'}<br/>
                            <span className="text-gray-500">{recipient.prenoteExpiry || ''}</span>
                          </TableCell>
                          <TableCell>{recipient.addenda || ''}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                          NO RECIPIENT SELECTED
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
              
              <div className="flex justify-center mt-6 space-x-4">
                <Button variant="outline" className="bg-gray-400 text-white border-gray-400 hover:bg-gray-500 hover:border-gray-500 min-w-[120px]">
                  Cancel
                </Button>
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleSaveIncomplete}
                    variant="outline" 
                    className="bg-white text-gray-700 border-gray-300 min-w-[120px]"
                  >
                    <Save size={16} className="mr-1" />
                    Save Incomplete
                  </Button>
                  <Button 
                    type="submit"
                    onClick={() => form.handleSubmit(handleSubmitPPDForm)()}
                    className="bg-bank-accent text-white hover:bg-bank-primary min-w-[120px]"
                  >
                    Continue
                    <ArrowRight size={16} className="ml-1" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog 
        open={isSelectRecipientOpen} 
        onOpenChange={() => {}}
      >
        <DialogContent 
          className="max-w-4xl max-h-[90vh] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl bg-bank-primary text-white p-4 -mx-6 -mt-6 mb-4">
              SELECT RECIPIENTS
            </DialogTitle>
          </DialogHeader>
          
          <div className="flex items-center mb-4 gap-2">
            <div className="w-1/3">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    Show All
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-0">
                  <div className="p-2">
                    <div className="cursor-pointer p-2 hover:bg-gray-100">Show All</div>
                    <div className="cursor-pointer p-2 hover:bg-gray-100">Active Only</div>
                    <div className="cursor-pointer p-2 hover:bg-gray-100">Inactive Only</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="relative flex-1">
              <Input
                type="search"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
          
          <div className="overflow-auto flex-1 -mx-6 px-6">
            <Table>
              <TableHeader className="bg-bank-primary/20 sticky top-0">
                <TableRow>
                  <TableHead className="w-[40px]"></TableHead>
                  <TableHead>Recipient Name</TableHead>
                  <TableHead>Recipient ID</TableHead>
                  <TableHead>Bank ID</TableHead>
                  <TableHead>Account Number</TableHead>
                  <TableHead>Account Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.map((recipient) => (
                  <TableRow 
                    key={recipient.id} 
                    className="cursor-pointer hover:bg-gray-50"
                    onClick={() => handleSelectRecipient(recipient)}
                  >
                    <TableCell className="p-2">
                      <Checkbox 
                        checked={selectedRecipients.some(r => r.id === recipient.id)}
                        onCheckedChange={() => handleSelectRecipient(recipient)}
                      />
                    </TableCell>
                    <TableCell>{recipient.name}</TableCell>
                    <TableCell>{recipient.recipientId}</TableCell>
                    <TableCell>{recipient.bankId}</TableCell>
                    <TableCell>{recipient.accountNumber}</TableCell>
                    <TableCell>{recipient.accountType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-4 border-t">
            <div className="flex items-center">
              <span className="mr-2">Show</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-16 justify-between">
                    10
                    <ChevronDown size={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-16 p-0">
                  <div className="p-1">
                    <div className="cursor-pointer p-1 hover:bg-gray-100 text-center">5</div>
                    <div className="cursor-pointer p-1 hover:bg-gray-100 text-center">10</div>
                    <div className="cursor-pointer p-1 hover:bg-gray-100 text-center">25</div>
                    <div className="cursor-pointer p-1 hover:bg-gray-100 text-center">50</div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <DialogFooter className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsSelectRecipientOpen(false)}
                className="bg-bank-primary text-white border-[#8E9196] hover:bg-bank-primary/90 hover:border-[#8E9196]/90 min-w-[100px]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleDoneSelectingRecipients}
                className="bg-bank-primary text-white hover:bg-bank-primary min-w-[100px]"
              >
                <CheckCheck className="mr-2 h-4 w-4" />
                Done
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PPDTemplatePage;
