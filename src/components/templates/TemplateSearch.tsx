
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import InfoTooltip from '../common/InfoTooltip';

interface TemplateSearchProps {
  onSearch: (filters: TemplateSearchFilters) => void;
}

export interface TemplateSearchFilters {
  templateName: string;
  paymentType: string;
  status: string;
}

export const TemplateSearch: React.FC<TemplateSearchProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<TemplateSearchFilters>({
    templateName: '',
    paymentType: 'All Payment Types',
    status: 'All Statuses'
  });

  const [showWildcardTooltip, setShowWildcardTooltip] = useState(true);

  const handleChange = (name: keyof TemplateSearchFilters, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSearch(filters);
  };

  return (
    <div className="bg-white p-4 rounded-md shadow-sm">
      {showWildcardTooltip && (
        <div className="relative bg-bank-primary text-white p-3 mb-4 rounded-sm">
          <Button 
            variant="ghost" 
            size="sm" 
            className="absolute right-1 top-1 text-white hover:bg-bank-primary/80"
            onClick={() => setShowWildcardTooltip(false)}
          >
            <X size={16} />
          </Button>
          <div className="mb-2 font-medium">If you don't know the exact template name, insert an asterisk (*) in place of the missing text.</div>
          <div className="text-sm">
            Example: If the template name is ABC Construction Management, then search abc* (or) *construction
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label htmlFor="templateName" className="block text-sm font-medium text-gray-700 mb-1">
            Template Name
          </label>
          <Input
            id="templateName"
            placeholder="Enter Template Name"
            className="w-full border-gray-300"
            value={filters.templateName}
            onChange={(e) => handleChange('templateName', e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="paymentType" className="block text-sm font-medium text-gray-700 mb-1">
            Payment Type
          </label>
          <Select 
            value={filters.paymentType} 
            onValueChange={(value) => handleChange('paymentType', value)}
          >
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="All Payment Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Payment Types">All Payment Types</SelectItem>
              <SelectItem value="PPD">PPD</SelectItem>
              <SelectItem value="CCD">CCD</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Template Status
          </label>
          <Select 
            value={filters.status} 
            onValueChange={(value) => handleChange('status', value)}
          >
            <SelectTrigger className="w-full border-gray-300">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All Statuses">All Statuses</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="incomplete">Incomplete</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <a href="#" className="text-bank-primary text-sm font-medium">
          ADVANCED SEARCH
        </a>
        <Button onClick={handleSubmit} className="bg-bank-primary hover:bg-bank-primary/90">
          <Search size={16} className="mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default TemplateSearch;
