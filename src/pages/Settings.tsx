
import React, { useState } from 'react';
import { Settings as SettingsIcon, Plus } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import UsersTable from '@/components/settings/UsersTable';
import EditUser from '@/components/settings/EditUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface User {
  lastName: string;
  firstName: string;
  userId: string;
  entitlement: 'Full' | 'None' | 'Custom';
  isApprover: boolean;
  isAdmin: boolean;
  status: 'active' | 'pending' | 'incomplete' | 'error' | 'approved' | 'rejected' | 'draft' | 'complete';
}

const Settings = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setIsEditUserOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<SettingsIcon className="h-6 w-6" />}
          title="User Management"
          subtitle="Manage user access and permissions"
          showPrintButton={false}
          showHelpButton={true}
        />
        
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <div className="flex w-[300px]">
              <Input placeholder="Search users..." className="rounded-r-none" />
              <Button className="rounded-l-none">Search</Button>
            </div>
            
            <Button onClick={() => {
              setSelectedUser(null);
              setIsEditUserOpen(true);
            }}>
              <Plus className="mr-1 h-4 w-4" /> Add User
            </Button>
          </div>

          <div className="bg-white rounded-lg shadow">
            <UsersTable onEditUser={handleEditUser} />
          </div>
        </div>
      </main>

      <EditUser 
        open={isEditUserOpen}
        onClose={() => {
          setIsEditUserOpen(false);
          setSelectedUser(null);
        }}
        user={selectedUser}
      />
    </div>
  );
};

export default Settings;
