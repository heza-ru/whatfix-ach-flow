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
      { title: 'ACH Quick Entry', path: '/payments/quick-entry' }
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
    <nav className="border-b border-gray-300">
      <div className="flex">
        {navigationItems.map((item) => (
          <div key={item.title} className="relative group">
            <Link
              to={item.path}
              className={`px-6 py-4 block font-medium text-sm ${
                isActive(item) 
                  ? 'text-bank-primary border-b-2 border-bank-primary' 
                  : 'text-gray-700 hover:text-bank-primary'
              }`}
            >
              {item.title} {item.children && <span className="ml-1">▾</span>}
            </Link>
            
            {item.children && (
              <div className="absolute left-0 hidden z-10 group-hover:block bg-white shadow-lg rounded-b-md min-w-[200px]">
                {item.children.map((child) => (
                  <Link
                    key={child.title}
                    to={child.path}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {child.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
