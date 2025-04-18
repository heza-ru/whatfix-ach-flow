
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { StatusBadge } from '@/components/common/StatusBadge';

interface User {
  lastName: string;
  firstName: string;
  userId: string;
  entitlement: 'Full' | 'None' | 'Custom';
  isApprover: boolean;
  isAdmin: boolean;
  status: 'active' | 'pending' | 'incomplete' | 'error' | 'approved' | 'rejected' | 'draft' | 'complete';
}

interface UsersTableProps {
  onEditUser: (user: User) => void;
}

const UsersTable: React.FC<UsersTableProps> = ({ onEditUser }) => {
  const users: User[] = [
    {
      lastName: '123',
      firstName: 'test',
      userId: 'CindGoss5675',
      entitlement: 'Full',
      isApprover: true,
      isAdmin: true,
      status: 'active'
    },
    {
      lastName: 'Smith',
      firstName: 'John',
      userId: 'JohnSmith123',
      entitlement: 'Custom',
      isApprover: false,
      isAdmin: false,
      status: 'pending'
    },
    {
      lastName: 'Jones',
      firstName: 'Sarah',
      userId: 'SarahJones456',
      entitlement: 'None',
      isApprover: true,
      isAdmin: false,
      status: 'active'
    }
    // More users can be added here
  ];

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Last Name</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>User ID</TableHead>
            <TableHead>Entitlement</TableHead>
            <TableHead>Approver</TableHead>
            <TableHead>Admin</TableHead>
            <TableHead>User Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.userId}>
              <TableCell>{user.lastName}</TableCell>
              <TableCell>{user.firstName}</TableCell>
              <TableCell>{user.userId}</TableCell>
              <TableCell>{user.entitlement}</TableCell>
              <TableCell>{user.isApprover && "✓"}</TableCell>
              <TableCell>{user.isAdmin && "✓"}</TableCell>
              <TableCell>
                <StatusBadge status={user.status} />
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View User</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEditUser(user)}>
                      Edit User
                    </DropdownMenuItem>
                    <DropdownMenuItem>Copy to Existing User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersTable;
