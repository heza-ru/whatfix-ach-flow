
import React from 'react';
import { BarChart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';

const TransactionReports = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-background">
      <Header />
      <Navigation />
      <main className="flex-1 p-6">
        <PageHeader
          icon={<BarChart />}
          title="TRANSACTION REPORTS"
          subtitle="View and analyze transaction data"
          showPrintButton={true}
          showHelpButton={true}
        />
        <div className="bg-neutral-surface rounded-lg shadow p-6 mt-6">
          <p className="text-text-secondary">Transaction reports content will be displayed here.</p>
        </div>
      </main>
    </div>
  );
};

export default TransactionReports;
