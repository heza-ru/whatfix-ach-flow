
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItem = {
  title: string;
  path: string;
  children?: { title: string; path: string }[];
};

const navigationItems: NavItem[] = [
  { 
    title: 'PAYMENTS',
    path: '/payments',
    children: [
      { title: 'Make a Payment', path: '/payments/new' },
      { title: 'Payment History', path: '/payments/history' },
      { title: 'Recurring Payments', path: '/payments/recurring' },
      { title: 'ACH Quick Entry', path: '/payments/quick-entry' },
      { title: 'Approval Payments', path: '/payments/approval' },
      { title: 'Create PPD Template', path: '/payments/ppd-template' },
      { title: 'Master Recipient List', path: '/recipients/master' }
    ]
  },
  { 
    title: 'REPORTS',
    path: '/reports',
    children: [
      { title: 'Transaction Reports', path: '/reports/transactions' },
      { title: 'Payment Reports', path: '/reports/payments' }
    ]
  },
  { 
    title: 'ADMINISTRATION',
    path: '/settings',
    children: [
      { title: 'User Management', path: '/settings/users' },
      { title: 'Payment Limits', path: '/settings/limits' },
      { title: 'System Settings', path: '/settings/system' }
    ]
  }
];

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (item: NavItem): boolean => {
    if (currentPath === item.path) return true;
    if (item.children) {
      return item.children.some(child => currentPath === child.path);
    }
    return false;
  };

  return (
    <nav className="border-b border-neutral-divider bg-neutral-surface">
      <div className="flex">
        {navigationItems.map((item) => (
          <div key={item.title} className="relative group">
            <Link
              to={item.path}
              className={`px-6 py-4 block font-medium text-sm ${
                isActive(item) 
                  ? 'text-primary-main border-b-2 border-primary-main' 
                  : 'text-text-primary hover:text-primary-main'
              }`}
            >
              {item.title} {item.children && <span className="ml-1">▾</span>}
            </Link>
            
            {item.children && (
              <div className="absolute left-0 hidden group-hover:block bg-neutral-surface shadow-lg rounded-b-md min-w-[250px] border border-neutral-divider">
                <div className="p-4">
                  <div className="font-medium text-sm text-text-primary mb-3">{item.title}</div>
                  <div className="space-y-2">
                    {item.children.map((child) => (
                      <Link
                        key={child.title}
                        to={child.path}
                        className="block text-sm text-text-secondary hover:text-primary-main hover:bg-neutral-background py-1"
                      >
                        {child.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
