
import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  MoreVertical 
} from 'lucide-react';
import { Template } from '@/utils/mockData';
import StatusBadge from '../common/StatusBadge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface TemplateListProps {
  templates: Template[];
  onViewTemplate: (templateId: string) => void;
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
}

export const TemplateList: React.FC<TemplateListProps> = ({
  templates,
  onViewTemplate,
  onEditTemplate,
  onDeleteTemplate
}) => {
  const [sortField, setSortField] = React.useState<keyof Template>('name');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Template) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Template) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // Sort templates based on current sort field and direction
  const sortedTemplates = [...templates].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
    }
    
    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
    }
    
    return 0;
  });

  return (
    <div className="bg-white">
      <table className="w-full bank-table">
        <thead>
          <tr>
            <th className="w-10 text-center">
              <input type="checkbox" className="rounded" />
            </th>
            <th 
              className="cursor-pointer text-left" 
              onClick={() => handleSort('name')}
            >
              <div className="flex items-center">
                Template Name {getSortIcon('name')}
                <span className="ml-1 text-xs text-gray-500">Description</span>
              </div>
            </th>
            <th 
              className="cursor-pointer text-left" 
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status {getSortIcon('status')}
                <span className="ml-1 text-xs text-gray-500">Availability</span>
              </div>
            </th>
            <th className="text-left">Co. Account</th>
            <th className="text-left">Type</th>
            <th className="text-left">Recipient</th>
            <th 
              className="cursor-pointer text-right" 
              onClick={() => handleSort('amount')}
            >
              <div className="flex items-center justify-end">
                Amount ($) {getSortIcon('amount')}
              </div>
            </th>
            <th className="text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedTemplates.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-8 text-gray-500">
                No templates found. Create a new template to get started.
              </td>
            </tr>
          ) : (
            sortedTemplates.map((template) => (
              <tr key={template.id}>
                <td className="text-center">
                  <input type="checkbox" className="rounded" />
                </td>
                <td>
                  <div className="font-medium">{template.name}</div>
                  <div className="text-xs text-gray-500">{template.description}</div>
                </td>
                <td>
                  <StatusBadge status={template.status} />
                  <div className="text-xs text-gray-500 mt-1">Active</div>
                </td>
                <td>{template.companyAccount}</td>
                <td>{template.type}</td>
                <td>{template.recipient}</td>
                <td className="text-right">${template.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical size={16} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onViewTemplate(template.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onEditTemplate(template.id)}>
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => onDeleteTemplate(template.id)}>
                        Delete Template
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 1-{Math.min(templates.length, 10)} of {templates.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={templates.length <= 10}>
            <ChevronLeft size={14} />
          </Button>
          <Button variant="outline" size="sm" disabled={templates.length <= 10}>
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TemplateList;
