import React, { useState } from 'react';
import { Payment } from '@/types/payment';
import StatusBadge from '@/components/common/StatusBadge';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Check, X, FileText, FileMinus, FileX, ChevronDown } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  PaginationLink,
} from '@/components/ui/pagination';

interface Column {
  id: string;
  label: string;
  visible: boolean;
}

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
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [columns, setColumns] = useState<Column[]>([
    { id: 'paymentDate', label: 'Payment Date', visible: true },
    { id: 'paymentNo', label: 'Payment No./Name/Reference', visible: true },
    { id: 'status', label: 'Status/Confirmation No.', visible: true },
    { id: 'companyAccount', label: 'Co. Account/Co. Account Identifier', visible: true },
    { id: 'type', label: 'Type/Created By Template', visible: true },
    { id: 'recipient', label: 'Recipient', visible: true },
    { id: 'amount', label: 'Amount (Items)', visible: true },
  ]);

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

  const toggleColumnVisibility = (columnId: string) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, visible: !col.visible } : col
    ));
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = payments.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(payments.length / itemsPerPage);

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4 mt-8">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Show/Hide Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[200px]">
            {columns.map(column => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.visible}
                onCheckedChange={() => toggleColumnVisibility(column.id)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Show</span>
          <Select
            value={itemsPerPage.toString()}
            onValueChange={(value) => setItemsPerPage(Number(value))}
          >
            <SelectTrigger className="w-[70px]">
              <SelectValue>{itemsPerPage}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-sm text-gray-500">entries</span>
        </div>
      </div>

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
              {columns.map(column => column.visible && (
                <TableHead key={column.id} className="whitespace-nowrap">
                  {column.label}
                </TableHead>
              ))}
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
                {columns.find(col => col.id === 'paymentDate')?.visible && (
                  <TableCell className="whitespace-nowrap font-medium">
                    {payment.paymentDate}<br/>
                    <span className="text-sm text-gray-500">{payment.sendDate}</span>
                  </TableCell>
                )}
                {columns.find(col => col.id === 'paymentNo')?.visible && (
                  <TableCell>
                    <div className="flex items-center">
                      <span className="text-blue-500 font-medium">{payment.paymentNo}</span>
                      <FileText className="ml-2 text-blue-500 h-5 w-5" />
                    </div>
                    <span className="text-sm text-gray-600">{payment.name}</span>
                  </TableCell>
                )}
                {columns.find(col => col.id === 'status')?.visible && (
                  <TableCell>
                    <StatusBadge status={payment.status} /><br/>
                    {payment.confirmationNo && <span className="text-sm text-gray-500">{payment.confirmationNo}</span>}
                  </TableCell>
                )}
                {columns.find(col => col.id === 'companyAccount')?.visible && (
                  <TableCell>
                    {payment.companyAccount}<br/>
                    <span className="text-sm text-gray-500">{payment.companyIdentifier}</span>
                  </TableCell>
                )}
                {columns.find(col => col.id === 'type')?.visible && (
                  <TableCell>
                    {payment.type}<br/>
                    {payment.template && <span className="text-sm text-gray-500">{payment.template}</span>}
                  </TableCell>
                )}
                {columns.find(col => col.id === 'recipient')?.visible && (
                  <TableCell className="whitespace-nowrap">
                    {payment.recipient.startsWith('View') ? (
                      <span className="text-blue-500 cursor-pointer">{payment.recipient}</span>
                    ) : (
                      payment.recipient
                    )}
                  </TableCell>
                )}
                {columns.find(col => col.id === 'amount')?.visible && (
                  <TableCell className="text-right whitespace-nowrap">
                    {formatAmount(payment.amount)}
                  </TableCell>
                )}
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
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.max(prev - 1, 1));
                }}
                aria-disabled={currentPage === 1}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(page);
                  }}
                  isActive={currentPage === page}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(prev => Math.min(prev + 1, totalPages));
                }}
                aria-disabled={currentPage === totalPages}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default PaymentApprovalTable;
