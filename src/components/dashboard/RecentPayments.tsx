
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Payment } from '@/types/payment';
import { Recipient } from '@/types/recipient';

interface RecentPaymentsProps {
  payments: Payment[];
  recipients: Recipient[];
}

const RecentPayments = ({ payments, recipients }: RecentPaymentsProps) => {
  return (
    <Card className="card-transition animate-fade-up" data-testid="recent-payments">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <CardTitle>Recent Payments</CardTitle>
        <Link to="/payments/history" className="text-sm text-bank-primary">
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
                const recipient = recipients.find(r => r.id === payment.recipientId);
                return (
                  <tr key={payment.id}>
                    <td>{payment.id}</td>
                    <td>{recipient?.name || 'Unknown'}</td>
                    <td>{payment.type}</td>
                    <td>${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                        ${payment.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          payment.status === 'complete' ? 'bg-blue-100 text-blue-800' : 
                          'bg-gray-100 text-gray-800'}`
                      }>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </span>
                    </td>
                    <td>{payment.effectiveDate}</td>
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
