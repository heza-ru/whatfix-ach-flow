
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Payment } from '@/types/payment';
import { Recipient } from '@/types/recipient';
import { StatusBadge } from '@/components/common/StatusBadge';

interface RecentPaymentsProps {
  payments: Payment[];
  recipients: Recipient[];
}

const RecentPayments = ({ payments, recipients }: RecentPaymentsProps) => {
  return (
    <Card className="card-transition animate-fade-up" data-testid="recent-payments">
      <CardHeader className="pb-2 flex flex-row items-center justify-between bg-bank-light-gray">
        <CardTitle>Recent Payments</CardTitle>
        <Link to="/payments/history" className="text-sm text-bank-accent hover:underline">
          View All
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full bank-table">
            <thead>
              <tr>
                <th>Payment ID</th>
                <th>Recipient</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => {
                // Find the recipient by name
                const recipientName = recipients.find(r => r.name === payment.recipient)?.name || payment.recipient;
                return (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{recipientName}</td>
                    <td>{payment.type}</td>
                    <td>${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>
                      <StatusBadge status={payment.status} />
                    </td>
                    <td>{payment.paymentDate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
