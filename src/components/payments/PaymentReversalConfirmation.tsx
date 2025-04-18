
import React from 'react';
import { Payment } from '@/types/payment';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

interface PaymentReversalConfirmationProps {
  selectedPayments: Payment[];
  onCancel: () => void;
  onSubmit: () => void;
}

export const PaymentReversalConfirmation: React.FC<PaymentReversalConfirmationProps> = ({
  selectedPayments,
  onCancel,
  onSubmit
}) => {
  const formatAmount = (amount: number) => {
    return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div>
      <div className="bg-yellow-100 p-4 mb-4 rounded flex items-start">
        <div className="bg-yellow-400 p-2 rounded-full mr-3 mt-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h3 className="text-yellow-800 font-bold">Notice</h3>
          <p className="text-yellow-800">Reversal entries must be initiated within 5 days from the 'effective date' of the original entry.</p>
        </div>
      </div>
      
      <div className="bg-blue-600 p-3 mb-4">
        <h2 className="text-white font-bold text-lg">SELECTED PAYMENTS</h2>
      </div>
      
      <div className="rounded-md border mb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap">
                Payment No.<br/>
                Name/Reference
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Send Date<br/>
                Payment Date
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Status<br/>
                Authorization Memo
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Co. Account<br/>
                Co. Account Identifier
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Type<br/>
                Created By Template
              </TableHead>
              <TableHead className="whitespace-nowrap">Recipient</TableHead>
              <TableHead className="whitespace-nowrap text-right">
                Amount (Items)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedPayments.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <span className="text-blue-500 font-medium">{payment.paymentNo}</span>
                  <br/>
                  <span className="text-sm text-gray-600">{payment.name}</span>
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {payment.sendDate}<br/>
                  <span>{payment.paymentDate}</span>
                </TableCell>
                <TableCell>
                  {payment.status}
                </TableCell>
                <TableCell>
                  {payment.companyAccount}<br/>
                  <span className="text-sm">{payment.companyIdentifier}</span>
                </TableCell>
                <TableCell>
                  {payment.type}<br/>
                  {payment.template && <span className="text-sm">{payment.template}</span>}
                </TableCell>
                <TableCell className="whitespace-nowrap">
                  {payment.recipient.startsWith('View') ? (
                    <span className="text-blue-500 cursor-pointer">{payment.recipient}</span>
                  ) : (
                    payment.recipient
                  )}
                </TableCell>
                <TableCell className="text-right whitespace-nowrap">
                  {formatAmount(payment.amount)}
                  {payment.name === 'MonthlyPay' && <span className="ml-1">(2)</span>}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex justify-end space-x-3">
        <Button
          onClick={onCancel}
          variant="outline"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800"
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="default"
          className="bg-blue-500 hover:bg-blue-600"
        >
          Submit Reversal
        </Button>
      </div>
    </div>
  );
};

export default PaymentReversalConfirmation;
