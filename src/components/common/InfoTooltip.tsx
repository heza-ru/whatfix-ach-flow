
import React from 'react';
import { Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type InfoTooltipProps = {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ 
  content, 
  position = 'top' 
}) => {
  // Map our position prop to Radix UI's side prop
  const side = position;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="inline-flex">
            <Info size={16} className="text-bank-primary cursor-help" />
          </span>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default InfoTooltip;
