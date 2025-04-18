
import React from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

type HelpSidebarProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
};

export const HelpSidebar: React.FC<HelpSidebarProps> = ({
  isOpen,
  onClose,
  title,
  content
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 z-50 h-full w-80 bg-bank-dark text-white shadow-lg animate-fade-in">
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="font-medium">{title}</h2>
        <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-700">
          <X size={18} />
        </Button>
      </div>
      <div className="p-4 overflow-auto max-h-[calc(100vh-4rem)]">
        {content}
      </div>
    </div>
  );
};

export default HelpSidebar;
