
import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import UsersTable from '@/components/settings/UsersTable';
import EditUser from '@/components/settings/EditUser';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const Settings = () => {
  const [isEditUserOpen, setIsEditUserOpen] = useState(false);

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
          </div>

          <div className="bg-white rounded-lg shadow">
            <UsersTable />
          </div>
        </div>
      </main>

      <EditUser 
        open={isEditUserOpen}
        onClose={() => setIsEditUserOpen(false)}
      />
    </div>
  );
};

export default Settings;
