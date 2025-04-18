import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';
import { mockPayments } from '@/utils/paymentMockData';
import PaymentApprovalTable from '@/components/payments/PaymentApprovalTable';
import PaymentReversalConfirmation from '@/components/payments/PaymentReversalConfirmation';
import { useToast } from '@/hooks/use-toast';
import { Payment } from '@/types/payment';
import { PageHeader } from '@/components/layout/PageHeader';
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
          <div className="flex justify-between mb-6">
            <div className="grid grid-cols-3 gap-4 w-full">
              <div>
                <label className="block text-sm font-medium mb-1">Send Date</label>
                <div className="flex gap-4">
                  <input type="date" className="border rounded p-2 w-full" />
                  <input type="date" className="border rounded p-2 w-full" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">All Payment Types</label>
                <select className="border rounded p-2 w-full">
                  <option>All Payment Types</option>
                  <option>CCD - Corporate Credit or Debit</option>
                  <option>PPD - Prearranged Payment and Deposit</option>
                  <option>Tax</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">All Statuses</label>
                <select className="border rounded p-2 w-full">
                  <option>All Statuses</option>
                  <option>Pending</option>
                  <option>Scheduled</option>
                  <option>Completed</option>
                  <option>Overdue</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <button className="bg-blue-600 text-white py-2 px-4 rounded">
                Search
              </button>
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
