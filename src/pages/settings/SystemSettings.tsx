
import React from 'react';
import { Settings } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';

const SystemSettings = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-background">
      <Header />
      <Navigation />
      <main className="flex-1 p-6">
        <PageHeader
          icon={<Settings />}
          title="SYSTEM SETTINGS"
          subtitle="Configure system-wide settings"
          showPrintButton={true}
          showHelpButton={true}
        />
        <div className="bg-neutral-surface rounded-lg shadow p-6 mt-6">
          <p className="text-text-secondary">System settings content will be displayed here.</p>
        </div>
      </main>
    </div>
  );
};

export default SystemSettings;
