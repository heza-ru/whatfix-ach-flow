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
    <header className="w-full bg-black text-white">
      <div className="flex justify-between px-4 py-2 items-center">
        <div className="text-sm">
          Last Login: {formattedDate} - {formattedTime} (Pacific Standard Time)
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center">
            <span className="mr-2">Alerts</span>
            <Button variant="outline" size="sm" className="h-7 w-7 rounded-full bg-yellow-500 text-black p-0">
              <span>0</span>
            </Button>
          </div>
          <div className="flex items-center">
            <span className="mr-2">Approvals</span>
            <Button variant="outline" size="sm" className="h-7 w-7 rounded-full bg-green-500 text-black p-0">
              <span>0</span>
            </Button>
          </div>
          <div className="border-l border-gray-600 h-6 mx-2"></div>
          <Link to="/" className="text-white hover:text-gray-300">
            Exit
          </Link>
        </div>
      </div>
      <div className="flex justify-between bg-gray-100 px-6 py-3 text-black">
        <Link to="/" className="flex items-center">
          <div className="flex items-center">
            <span className="text-bank-primary text-2xl font-bold">Whatfix</span>
            <span className="ml-1 text-bank-primary">Portal for SMBC</span>
          </div>
        </Link>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-sm text-gray-500">Welcome,</div>
            <div className="font-semibold">R Owaki</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-8 w-8 bg-bank-primary text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-bank-primary text-white text-sm">RO</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
