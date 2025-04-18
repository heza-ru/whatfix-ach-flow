import React, { useState } from 'react';
import { 
  DollarSign, CreditCard, Users, Settings, Clock, 
  CheckCircle, Activity, FileText
} from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import PaymentTrendsChart from '@/components/dashboard/PaymentTrendsChart';
import PaymentStatusChart from '@/components/dashboard/PaymentStatusChart';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentPayments from '@/components/dashboard/RecentPayments';
import QuickActions from '@/components/dashboard/QuickActions';
import { mockPayments, mockTemplates, mockRecipients } from '@/utils/mockData';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;
  const completedPayments = mockPayments.filter(p => p.status === 'complete').length;
  const totalTemplates = mockTemplates.length;
  const totalRecipients = mockRecipients.length;

  const paymentStatusData = [
    { name: 'Pending', value: pendingPayments, color: '#FFB547' },
    { name: 'Completed', value: completedPayments, color: '#1C7C54' },
    { name: 'Failed', value: mockPayments.filter(p => p.status === 'rejected').length, color: '#D32F2F' }
  ];

  const paymentTrendData = [
    { date: '2025-04-12', amount: 12500 },
    { date: '2025-04-13', amount: 15000 },
    { date: '2025-04-14', amount: 18000 },
    { date: '2025-04-15', amount: 16500 },
    { date: '2025-04-16', amount: 21000 },
    { date: '2025-04-17', amount: 19500 },
    { date: '2025-04-18', amount: 22000 },
  ];

  const statsData = [
    { icon: <DollarSign className="mr-2 text-bank-primary" size={20} />, title: "Pending Payments", value: pendingPayments, subtitle: "Awaiting approval", testId: "pending-payments" },
    { icon: <CheckCircle className="mr-2 text-green-500" size={20} />, title: "Completed Payments", value: completedPayments, subtitle: "Successfully processed", testId: "completed-payments" },
    { icon: <CreditCard className="mr-2 text-blue-500" size={20} />, title: "Templates", value: totalTemplates, subtitle: "Saved templates", testId: "templates" },
    { icon: <Users className="mr-2 text-purple-500" size={20} />, title: "Recipients", value: totalRecipients, subtitle: "Active recipients", testId: "recipients" }
  ];

  const quickActionItems = [
    { to: "/payments/new", icon: <DollarSign className="mr-2" size={16} />, text: "New Payment", primary: true, testId: "new-payment" },
    { to: "/templates", icon: <CreditCard className="mr-2" size={16} />, text: "Create Template", testId: "create-template" },
    { to: "/recipients", icon: <Users className="mr-2" size={16} />, text: "Add Recipient", testId: "add-recipient" },
    { to: "/payments/history", icon: <Clock className="mr-2" size={16} />, text: "Payment History", testId: "payment-history" },
    { to: "/reports/transactions", icon: <Activity className="mr-2" size={16} />, text: "Transaction Reports", testId: "transaction-reports" },
    { to: "/settings", icon: <Settings className="mr-2" size={16} />, text: "Manage Limits", testId: "manage-limits" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-100" data-testid="dashboard-container">
      <Header />
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6" data-testid="dashboard-main">
        <div className="flex items-center justify-between mb-6 animate-fade-up" data-testid="dashboard-header">
          <h1 className="text-2xl font-medium" data-testid="dashboard-title">Dashboard</h1>
          <Button 
            onClick={() => setShowTour(true)} 
            className="bg-bank-primary hover:bg-bank-primary/90 hover-lift"
            data-testid="tour-button"
          >
            Take a Tour
          </Button>
        </div>

        <StatsCards stats={statsData} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6" data-testid="charts-grid">
          <PaymentTrendsChart data={paymentTrendData} />
          <PaymentStatusChart data={paymentStatusData} />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-testid="tables-grid">
          <div className="lg:col-span-2">
            <RecentPayments payments={mockPayments.slice(0, 5)} recipients={mockRecipients} />
          </div>
          <div>
            <QuickActions actions={quickActionItems} />
          </div>
        </div>
      </main>
      
      {showTour && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-up" 
          data-testid="tour-modal"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Welcome to this Portal!</h2>
            <p className="mb-4">Let us guide you through the main features of your banking portal.</p>
            <p className="mb-4">This tour will show you how to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Create and manage ACH payments</li>
              <li>Set up payment templates</li>
              <li>Manage recipient information</li>
              <li>Configure ACH limits and approvals</li>
              <li>And many more....</li>
            </ul>
            <div className="flex justify-end">
              <Button onClick={() => setShowTour(false)}>
                Start Tour
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
