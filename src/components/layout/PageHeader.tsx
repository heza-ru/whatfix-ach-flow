
import React, { ReactNode } from 'react';
import { Printer, Plus, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

type PageHeaderProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  onCreateNew?: () => void;
  createButtonText?: string;
  showPrintButton?: boolean;
  showHelpButton?: boolean;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  icon,
  title,
  subtitle,
  onCreateNew,
  createButtonText = "Create",
  showPrintButton = true,
  showHelpButton = true
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between py-6 px-4 md:px-6 border-b border-gray-200 bg-white">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="text-gray-500 mr-4 text-4xl">
          {icon}
        </div>
        <div>
          <h1 className="text-2xl font-medium text-gray-800">{title}</h1>
          <p className="text-gray-500 text-sm">{subtitle}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 self-end md:self-auto">
        {onCreateNew && (
          <Button 
            onClick={onCreateNew} 
            variant="outline" 
            className="flex items-center gap-1 bg-white text-gray-700 border-gray-300"
          >
            <Plus size={16} />
            <span>{createButtonText}</span>
          </Button>
        )}
        
        {showPrintButton && (
          <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
            <Printer size={18} />
            <span className="ml-1">Print</span>
          </Button>
        )}
        
        {showHelpButton && (
          <Button variant="outline" className="bg-white text-gray-700 border-gray-300">
            <HelpCircle size={18} />
            <span className="ml-1">Help</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
