
import React from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Check
} from 'lucide-react';
import { Recipient } from '@/types/recipient';
import StatusBadge from '../common/StatusBadge';
import { Button } from '@/components/ui/button';
import { StatusType } from '@/types/status';

interface RecipientListProps {
  recipients: Recipient[];
  onViewRecipient: (recipientId: string) => void;
  onDeleteRecipient: (recipientId: string) => void;
}

export const RecipientList: React.FC<RecipientListProps> = ({
  recipients,
  onViewRecipient,
  onDeleteRecipient
}) => {
  const [sortField, setSortField] = React.useState<keyof Recipient>('name');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Recipient) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: keyof Recipient) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  // Sort recipients based on current sort field and direction
  const sortedRecipients = [...recipients].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];
    
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection === 'asc' 
        ? valueA.localeCompare(valueB) 
        : valueB.localeCompare(valueA);
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
                Name {getSortIcon('name')}
              </div>
            </th>
            <th 
              className="cursor-pointer text-left" 
              onClick={() => handleSort('status')}
            >
              <div className="flex items-center">
                Status {getSortIcon('status')}
              </div>
            </th>
            <th className="text-left">ACH Domestic</th>
            <th></th> {/* Delete button column */}
          </tr>
        </thead>
        <tbody>
          {sortedRecipients.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                No recipients found. Create a new recipient to get started.
              </td>
            </tr>
          ) : (
            sortedRecipients.map((recipient) => (
              <tr key={recipient.id} className="cursor-pointer hover:bg-gray-50" onClick={() => onViewRecipient(recipient.id)}>
                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                  <input type="checkbox" className="rounded" />
                </td>
                <td>
                  <div className="font-medium">{recipient.name}</div>
                </td>
                <td>
                  <StatusBadge status={(recipient.status as StatusType) || 'pending'} />
                </td>
                <td>
                  <div className="flex justify-center">
                    {recipient.achEnabled ? (
                      <div className="bg-green-100 rounded-full p-1">
                        <Check size={20} className="text-green-600" />
                      </div>
                    ) : null}
                  </div>
                </td>
                <td className="text-center" onClick={(e) => e.stopPropagation()}>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => onDeleteRecipient(recipient.id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <div className="p-4 border-t flex items-center justify-between">
        <div className="text-sm text-gray-500">
          Showing 1-{Math.min(recipients.length, 10)} of {recipients.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled={recipients.length <= 10}>
            <ChevronLeft size={14} />
          </Button>
          <Button variant="outline" size="sm" disabled={recipients.length <= 10}>
            <ChevronRight size={14} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecipientList;
