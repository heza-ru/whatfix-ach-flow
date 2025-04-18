
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, CreditCard, Users, Settings, Clock, CheckCircle, XCircle, AlertCircle, PieChart } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { mockPayments, mockTemplates, mockRecipients } from '@/utils/mockData';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  const startTour = () => {
    setShowTour(true);
  };

  // Stats for dashboard
  const pendingPayments = mockPayments.filter(p => p.status === 'pending').length;
  const completedPayments = mockPayments.filter(p => p.status === 'complete').length;
  const totalTemplates = mockTemplates.length;
  const totalRecipients = mockRecipients.length;

  // Recent payments for dashboard
  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-medium">Dashboard</h1>
          <Button onClick={startTour} className="bg-bank-primary hover:bg-bank-primary/90">
            Take a Tour
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <DollarSign className="mr-2 text-bank-primary" size={20} />
                Pending Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingPayments}</div>
              <div className="text-sm text-gray-500">Awaiting approval</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CheckCircle className="mr-2 text-green-500" size={20} />
                Completed Payments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedPayments}</div>
              <div className="text-sm text-gray-500">Successfully processed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <CreditCard className="mr-2 text-blue-500" size={20} />
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalTemplates}</div>
              <div className="text-sm text-gray-500">Saved templates</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <Users className="mr-2 text-purple-500" size={20} />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalRecipients}</div>
              <div className="text-sm text-gray-500">Active recipients</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="pb-2 flex flex-row items-center justify-between">
                <CardTitle>Recent Payments</CardTitle>
                <Link to="/payments" className="text-sm text-bank-primary">
                  View All
                </Link>
              </CardHeader>
              <CardContent>
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
                    {recentPayments.map(payment => {
                      const recipient = mockRecipients.find(r => r.id === payment.recipientId);
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
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Link to="/payments/new">
                  <Button className="w-full justify-start bg-bank-primary hover:bg-bank-primary/90">
                    <DollarSign className="mr-2" size={16} />
                    New Payment
                  </Button>
                </Link>
                <Link to="/templates/new">
                  <Button variant="outline" className="w-full justify-start">
                    <CreditCard className="mr-2" size={16} />
                    Create Template
                  </Button>
                </Link>
                <Link to="/recipients/new">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="mr-2" size={16} />
                    Add Recipient
                  </Button>
                </Link>
                <Link to="/payments/history">
                  <Button variant="outline" className="w-full justify-start">
                    <Clock className="mr-2" size={16} />
                    Payment History
                  </Button>
                </Link>
                <Link to="/settings/limits">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="mr-2" size={16} />
                    Manage Limits
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {showTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md">
            <h2 className="text-xl font-bold mb-4">Welcome to Whatfix Bank!</h2>
            <p className="mb-4">Let us guide you through the main features of your banking portal.</p>
            <p className="mb-4">This tour will show you how to:</p>
            <ul className="list-disc pl-5 mb-4 space-y-1">
              <li>Create and manage ACH payments</li>
              <li>Set up payment templates</li>
              <li>Manage recipient information</li>
              <li>Configure ACH limits and approvals</li>
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
