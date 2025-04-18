
import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  const formattedTime = currentDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });

  return (
    <header className="w-full bg-neutral-surface text-text-primary">
      <div className="flex justify-between px-4 py-2 items-center bg-brand-accent text-white">
        <div className="text-sm">
          Last Login: {formattedDate} - {formattedTime} (Pacific Standard Time)
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">Alerts</span>
            <Button variant="outline" size="sm" className="h-7 w-7 rounded-full bg-status-warning text-text-primary p-0">
              <span>0</span>
            </Button>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Approvals</span>
            <Button variant="outline" size="sm" className="h-7 w-7 rounded-full bg-status-success text-white p-0">
              <span>0</span>
            </Button>
          </div>
          <div className="border-l border-neutral-divider h-6 mx-2"></div>
          <Link to="/" className="text-white hover:text-neutral-surface">
            Exit
          </Link>
        </div>
      </div>
      <div className="flex justify-between bg-neutral-surface px-6 py-3">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <span className="text-primary-dark text-2xl font-bold">Whatfix</span>
            <span className="ml-1 text-text-primary">Portal for SMBC</span>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-text-secondary text-sm">Welcome,</div>
            <div className="font-semibold text-text-primary">R Owaki</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-8 w-8 bg-primary-dark text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary-dark text-white text-sm">RO</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-surface">
              <DropdownMenuItem className="text-text-primary hover:bg-neutral-background">Profile</DropdownMenuItem>
              <DropdownMenuItem className="text-text-primary hover:bg-neutral-background">Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-text-primary hover:bg-neutral-background">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;

