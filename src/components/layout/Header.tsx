
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
    <header className="w-full fixed top-0 z-50">
      <div className="flex justify-between px-4 py-2 items-center bg-black text-white">
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
      <div className="flex justify-between items-center bg-gray-100 px-6 py-3 text-black">
        <div className="w-32">
          <img src="/lovable-uploads/f6f21794-b47d-4f0a-9981-e5aa42bb5d07.png" alt="Whatfix Logo" className="h-8 object-contain" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-bank-primary">Whatfix Portal for</span>
          <img src="/lovable-uploads/87315a42-2560-4d30-b971-189ba94815c1.png" alt="SMBC Logo" className="h-8 object-contain" />
        </div>
        <div className="flex items-center">
          <div className="text-right mr-4">
            <div className="text-sm text-gray-500">Welcome,</div>
            <div className="font-semibold">Sanjna C</div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="rounded-full p-0 h-8 w-8 bg-bank-primary text-white">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-bank-primary text-white text-sm">SC</AvatarFallback>
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
