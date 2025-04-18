
import React, { useState } from 'react';
import { Payment } from '@/types/payment';
import StatusBadge from '@/components/common/StatusBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationNext, 
  PaginationPrevious,
  PaginationLink
} from '@/components/ui/pagination';
import { Button } from '@/components/ui/button';
import { Check, X, FileText, FileMinus, FileX } from 'lucide-react';

interface PaymentApprovalTableProps {
  payments: Payment[];
  onApprove: (selectedIds: string[]) => void;
  onReject: (selectedIds: string[]) => void;
  onReverseTxns: (selectedIds: string[]) => void;
  onReversePayment: (paymentId: string) => void;
}

export const PaymentApprovalTable: React.FC<PaymentApprovalTableProps> = ({
  payments,
  onApprove,
  onReject,
  onReverseTxns,
  onReversePayment
}) => {
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  const handleSelectAll = () => {
    if (selectedPayments.length === currentItems.length) {
      setSelectedPayments([]);
    } else {
      setSelectedPayments(currentItems.map(payment => payment.id));
    }
  };

  const handleSelectPayment = (id: string) => {
    if (selectedPayments.includes(id)) {
      setSelectedPayments(selectedPayments.filter(paymentId => paymentId !== id));
    } else {
      setSelectedPayments([...selectedPayments, id]);
    }
  };

  const formatAmount = (amount: number) => {
    return `$ ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedPayments.length === currentItems.length && currentItems.length > 0}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="whitespace-nowrap">Payment Date</TableHead>
              <TableHead className="whitespace-nowrap">
                Payment No.<br/>
                Name/Reference
              </TableHead>
              <TableHead className="whitespace-nowrap">
                Status<br/>
                Confirmation No.
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
                Amount (Items)<br/>
                Recipient Amount (Items)
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentItems.map((payment) => (
              <TableRow key={payment.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedPayments.includes(payment.id)}
                    onCheckedChange={() => handleSelectPayment(payment.id)}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap font-medium">
                  {payment.paymentDate}<br/>
                  <span className="text-sm text-gray-500">{payment.sendDate}</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="text-blue-500 font-medium">{payment.paymentNo}</span>
                    <FileText className="ml-2 text-blue-500 h-5 w-5" />
                  </div>
                  <span className="text-sm text-gray-600">{payment.name}</span>
                </TableCell>
                <TableCell>
                  <StatusBadge status={payment.status} /><br/>
                  {payment.confirmationNo && <span className="text-sm text-gray-500">{payment.confirmationNo}</span>}
                </TableCell>
                <TableCell>
                  {payment.companyAccount}<br/>
                  <span className="text-sm text-gray-500">{payment.companyIdentifier}</span>
                </TableCell>
                <TableCell>
                  {payment.type}<br/>
                  {payment.template && <span className="text-sm text-gray-500">{payment.template}</span>}
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <div className="flex space-x-2">
          <Button
            onClick={() => onReject(selectedPayments)}
            variant="outline"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            disabled={selectedPayments.length === 0}
          >
            <X className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button
            onClick={() => {}}
            variant="outline"
            className="bg-gray-300 hover:bg-gray-400 text-gray-800"
            disabled={selectedPayments.length === 0}
          >
            Delete
          </Button>
          <Button
            onClick={() => onApprove(selectedPayments)}
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={selectedPayments.length === 0}
          >
            <Check className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button
            variant="outline"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={selectedPayments.length === 0}
          >
            Export
          </Button>
          <Button
            onClick={() => onReverseTxns(selectedPayments)}
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={selectedPayments.length === 0}
          >
            <FileMinus className="mr-2 h-4 w-4" />
            Reverse TXNS
          </Button>
          <Button
            onClick={() => {
              if (selectedPayments.length === 1) {
                onReversePayment(selectedPayments[0]);
              }
            }}
            variant="default"
            className="bg-blue-500 hover:bg-blue-600"
            disabled={selectedPayments.length !== 1}
          >
            <FileX className="mr-2 h-4 w-4" />
            Reverse Payment
          </Button>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaymentApprovalTable;
