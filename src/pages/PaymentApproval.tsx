import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { mockPayments } from '@/utils/paymentMockData';
import PaymentApprovalTable from '@/components/payments/PaymentApprovalTable';
import PaymentReversalConfirmation from '@/components/payments/PaymentReversalConfirmation';
import { useToast } from '@/hooks/use-toast';
import { Payment } from '@/types/payment';
import { PageHeader } from '@/components/layout/PageHeader';
import Header from '@/components/layout/Header';
import { Navigation } from '@/components/layout/Navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const PaymentApproval = () => {
  const { toast } = useToast();
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [showReversal, setShowReversal] = useState(false);
  const [selectedPaymentIds, setSelectedPaymentIds] = useState<string[]>([]);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const selectedPayments = payments.filter(payment => 
    selectedPaymentIds.includes(payment.id)
  );

  const handleApprove = (ids: string[]) => {
    setSelectedPaymentIds(ids);
    setShowApproveDialog(true);
  };

  const confirmApprove = () => {
    const updatedPayments = payments.map(payment => {
      if (selectedPaymentIds.includes(payment.id)) {
        return { ...payment, status: 'approved' as const };
      }
      return payment;
    });
    
    setPayments(updatedPayments);
    setSelectedPaymentIds([]);
    setShowApproveDialog(false);
    
    toast({
      title: "Payments Approved",
      description: `Successfully approved ${selectedPaymentIds.length} payment(s).`,
    });
  };

  const handleReject = (ids: string[]) => {
    setSelectedPaymentIds(ids);
    setShowRejectDialog(true);
  };

  const confirmReject = () => {
    const updatedPayments = payments.map(payment => {
      if (selectedPaymentIds.includes(payment.id)) {
        return { ...payment, status: 'rejected' as const };
      }
      return payment;
    });
    
    setPayments(updatedPayments);
    setSelectedPaymentIds([]);
    setShowRejectDialog(false);
    
    toast({
      title: "Payments Rejected",
      description: `Successfully rejected ${selectedPaymentIds.length} payment(s).`,
    });
  };

  const handleReverseTxns = (ids: string[]) => {
    setSelectedPaymentIds(ids);
    setShowReversal(true);
  };

  const handleReversePayment = (id: string) => {
    setSelectedPaymentIds([id]);
    setShowReversal(true);
  };

  const handleSubmitReversal = () => {
    const updatedPayments = payments.map(payment => {
      if (selectedPaymentIds.includes(payment.id)) {
        return { ...payment, status: 'reversed' as const };
      }
      return payment;
    });
    
    setPayments(updatedPayments);
    setShowReversal(false);
    setSelectedPaymentIds([]);
    
    toast({
      title: "Payments Reversed",
      description: `Successfully reversed ${selectedPaymentIds.length} payment(s).`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Navigation />
      <div>
        <PageHeader 
          icon={<ClipboardCheck />}
          title="Payment Approval"
          subtitle="Review and approve pending payments"
          showPrintButton={true}
          showHelpButton={true}
        />
        
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-sm rounded-lg p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Send Date</label>
                <div className="flex gap-2">
                  <input 
                    type="date" 
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" 
                  />
                  <input 
                    type="date" 
                    className="flex-1 h-10 rounded-md border border-input bg-background px-3 py-2 text-sm" 
                  />
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Types</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>All Payment Types</option>
                  <option>CCD - Corporate Credit or Debit</option>
                  <option>PPD - Prearranged Payment and Deposit</option>
                  <option>Tax</option>
                </select>
              </div>
              <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button className="h-10 bg-blue-600 text-white">
                  Search
                </Button>
              </div>
            </div>
            
            {showReversal ? (
              <PaymentReversalConfirmation 
                selectedPayments={selectedPayments}
                onCancel={() => setShowReversal(false)}
                onSubmit={handleSubmitReversal}
              />
            ) : (
              <PaymentApprovalTable 
                payments={payments}
                onApprove={handleApprove}
                onReject={handleReject}
                onReverseTxns={handleReverseTxns}
                onReversePayment={handleReversePayment}
              />
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Approve Payments</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to approve {selectedPaymentIds.length} payment(s)?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmApprove}>Approve</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Payments</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reject {selectedPaymentIds.length} payment(s)?
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReject}>Reject</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PaymentApproval;
