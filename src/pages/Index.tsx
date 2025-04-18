import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign, CreditCard, Users, Settings, Clock, 
  CheckCircle, XCircle, AlertCircle, PieChart,
  TrendingUp, Activity, FileText
} from 'lucide-react';
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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart as RechartPieChart, Pie, Cell, Tooltip } from 'recharts';
import { mockPayments, mockTemplates, mockRecipients } from '@/utils/mockData';

const Index = () => {
  const [showTour, setShowTour] = useState(false);

  const startTour = () => {
    setShowTour(true);
  };

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

  const recentPayments = mockPayments.slice(0, 5);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1 p-4 md:p-6">
        <div className="flex items-center justify-between mb-6 animate-fade-up">
          <h1 className="text-2xl font-medium">Dashboard</h1>
          <Button onClick={startTour} className="bg-bank-primary hover:bg-bank-primary/90 hover-lift">
            Take a Tour
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <DollarSign className="mr-2 text-bank-primary" size={20} />, title: "Pending Payments", value: pendingPayments, subtitle: "Awaiting approval" },
            { icon: <CheckCircle className="mr-2 text-green-500" size={20} />, title: "Completed Payments", value: completedPayments, subtitle: "Successfully processed" },
            { icon: <CreditCard className="mr-2 text-blue-500" size={20} />, title: "Templates", value: totalTemplates, subtitle: "Saved templates" },
            { icon: <Users className="mr-2 text-purple-500" size={20} />, title: "Recipients", value: totalRecipients, subtitle: "Active recipients" }
          ].map((item, index) => (
            <Card key={index} className="card-transition animate-fade-up" style={{ animationDelay: `${index * 100}ms` }}>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center">
                  {item.icon}
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{item.value}</div>
                <div className="text-sm text-gray-500">{item.subtitle}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="lg:col-span-2 card-transition animate-slide-in">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="mr-2" size={20} />
                Payment Trends
              </CardTitle>
              <CardDescription>Last 7 days payment volume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={paymentTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#B3D458" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#B3D458" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip contentStyle={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: "4px" }} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#B3D458" 
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="card-transition animate-slide-in" style={{ animationDelay: '200ms' }}>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="mr-2" size={20} />
                Payment Status
              </CardTitle>
              <CardDescription>Current payment distribution</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartPieChart margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
                    <Pie
                      data={paymentStatusData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </RechartPieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-2">
                  {paymentStatusData.map((entry, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: entry.color }}></div>
                      <span className="text-sm text-gray-600">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="card-transition animate-fade-up">
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
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="card-transition animate-fade-up" style={{ animationDelay: '300ms' }}>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks you can perform</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { to: "/payments/new", icon: <DollarSign className="mr-2" size={16} />, text: "New Payment", primary: true },
                  { to: "/templates", icon: <CreditCard className="mr-2" size={16} />, text: "Create Template" },
                  { to: "/recipients", icon: <Users className="mr-2" size={16} />, text: "Add Recipient" },
                  { to: "/payments/history", icon: <Clock className="mr-2" size={16} />, text: "Payment History" },
                  { to: "/reports/transactions", icon: <Activity className="mr-2" size={16} />, text: "Transaction Reports" },
                  { to: "/settings", icon: <Settings className="mr-2" size={16} />, text: "Manage Limits" }
                ].map((action, index) => (
                  <Link key={index} to={action.to}>
                    <Button 
                      className={`w-full justify-start hover-lift ${
                        action.primary 
                          ? 'bg-bank-primary hover:bg-bank-primary/90' 
                          : 'variant-outline'
                      }`}
                      variant={action.primary ? 'default' : 'outline'}
                    >
                      {action.icon}
                      {action.text}
                    </Button>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      {showTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-up">
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
