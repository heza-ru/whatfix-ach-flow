
import React from 'react';
import { Info } from 'lucide-react';

type InfoTooltipProps = {
  content: string;
  position?: 'top' | 'right' | 'bottom' | 'left';
};

export const InfoTooltip: React.FC<InfoTooltipProps> = ({ 
  content, 
  position = 'top' 
}) => {
  const positionClass = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2'
  };

  return (
    <div className="tooltip-container inline-block">
      <Info size={16} className="text-bank-primary cursor-help" />
      <div className={`tooltip-content ${positionClass[position]} w-48 text-center`}>
        {content}
      </div>
    </div>
  );
};

export default InfoTooltip;
