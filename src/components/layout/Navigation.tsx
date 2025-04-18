
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Separator } from "@/components/ui/separator";

type NavItem = {
  title: string;
  path: string;
  children?: Array<{
    title: string;
    path: string;
  } | { 
    section: string;
    items: { title: string; path: string }[] 
  }>;
};

const navigationItems: NavItem[] = [
  { 
    title: 'PAYMENTS',
    path: '/payments',
    children: [
      { 
        section: 'TRANSACTIONS',
        items: [
          { title: 'Make a Payment', path: '/payments/new' },
          { title: 'Payment History', path: '/payments/history' },
          { title: 'Recurring Payments', path: '/payments/recurring' },
        ]
      },
      { 
        section: 'TOOLS',
        items: [
          { title: 'ACH Quick Entry', path: '/payments/quick-entry' },
          { title: 'Approval Payments', path: '/payments/approval' },
          { title: 'Create PPD Template', path: '/payments/ppd-template' },
          { title: 'Master Recipient List', path: '/recipients/master' }
        ]
      }
    ]
  },
  { 
    title: 'REPORTS',
    path: '/reports',
    children: [
      { 
        section: 'REPORTING',
        items: [
          { title: 'Transaction Reports', path: '/reports/transactions' },
          { title: 'Payment Reports', path: '/reports/payments' }
        ]
      }
    ]
  },
  { 
    title: 'ADMINISTRATION',
    path: '/settings',
    children: [
      { 
        section: 'SETTINGS',
        items: [
          { title: 'User Management', path: '/settings/users' },
          { title: 'Payment Limits', path: '/settings/limits' },
          { title: 'System Settings', path: '/settings/system' }
        ]
      }
    ]
  }
];

export const Navigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (item: NavItem): boolean => {
    if (currentPath === item.path) return true;
    if (item.children) {
      return item.children.some(child => {
        if ('path' in child) {
          return currentPath === child.path;
        } else if ('items' in child) {
          return child.items.some(item => currentPath === item.path);
        }
        return false;
      });
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
              <div className="absolute left-0 hidden group-hover:block bg-neutral-surface shadow-lg rounded-md z-50 min-w-[300px] border border-neutral-divider animate-fade-in">
                <div className="p-2">
                  {item.children.map((child, index) => {
                    if ('path' in child) {
                      // Handle direct link child
                      return (
                        <Link
                          key={child.title}
                          to={child.path}
                          className="block text-sm text-text-secondary hover:text-primary-main hover:bg-neutral-background py-2 px-4 rounded"
                        >
                          {child.title}
                        </Link>
                      );
                    } else if ('section' in child) {
                      // Handle section with items
                      return (
                        <div key={`section-${index}`} className="mb-2">
                          {index > 0 && <Separator className="my-2" />}
                          <div className="px-4 pt-2 pb-1">
                            <span className="text-xs font-semibold text-text-secondary">{child.section}</span>
                          </div>
                          <div className="space-y-1">
                            {child.items.map((subItem) => (
                              <Link
                                key={subItem.title}
                                to={subItem.path}
                                className="block text-sm text-text-secondary hover:text-primary-main hover:bg-neutral-background py-2 px-4 rounded mx-1"
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
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
