
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Users } from 'lucide-react';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import RecipientList from '@/components/recipients/RecipientList';
import RecipientSearch from '@/components/recipients/RecipientSearch';
import CreateRecipientModal from '@/components/recipients/CreateRecipientModal';
import HelpSidebar from '@/components/layout/HelpSidebar';
import { mockRecipients } from '@/utils/recipientMockData';
import { Recipient } from '@/types/recipient';

const MasterRecipientList = () => {
  const { toast } = useToast();
  const [recipients, setRecipients] = useState<Recipient[]>(mockRecipients);
  const [filteredRecipients, setFilteredRecipients] = useState<Recipient[]>(mockRecipients);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleSearch = (filters: any) => {
    let filtered = [...recipients];

    if (filters.recipientName) {
      const searchTerm = filters.recipientName.toLowerCase();
      filtered = filtered.filter(recipient => 
        recipient.name.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.status && filters.status !== 'All Status') {
      filtered = filtered.filter(recipient => 
        recipient.status?.toLowerCase() === filters.status.toLowerCase()
      );
    }

    setFilteredRecipients(filtered);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} recipients matching your criteria.`,
    });
  };

  const handleCreateRecipient = () => {
    setIsCreateModalOpen(true);
  };

  const handleRecipientCreated = (newRecipient: Recipient) => {
    setRecipients(prev => [...prev, newRecipient]);
    setFilteredRecipients(prev => [...prev, newRecipient]);
    setIsCreateModalOpen(false);
    
    toast({
      title: "Recipient Created",
      description: "The recipient has been successfully created.",
    });
  };

  const handleViewRecipient = (recipientId: string) => {
    // This would navigate to a detail view in a real app
    toast({
      title: "View Recipient",
      description: `Viewing recipient details for ID: ${recipientId}`,
    });
  };

  const handleDeleteRecipient = (recipientId: string) => {
    const updatedRecipients = recipients.filter(recipient => recipient.id !== recipientId);
    setRecipients(updatedRecipients);
    setFilteredRecipients(filteredRecipients.filter(recipient => recipient.id !== recipientId));
    
    toast({
      title: "Recipient Deleted",
      description: "The recipient has been successfully deleted.",
    });
  };

  const helpContent = (
    <div className="text-sm space-y-4">
      <p>The Manage Master Recipient List page allows you to view and manage your recipients.</p>
      <div>
        <h3 className="font-medium mb-1">Search for Recipients</h3>
        <p>Use the search filters at the top to find specific recipients. You can search by recipient name or status.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Create a New Recipient</h3>
        <p>Click the "Create Recipient" button to add a new recipient to your master list.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Manage Recipients</h3>
        <p>Click on a recipient row to view or edit their details. Use the delete button to remove recipients.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<Users />}
          title="MANAGE MASTER RECIPIENT LIST"
          subtitle="Use this page to review recipient details."
          onCreateNew={handleCreateRecipient}
          createButtonText="Create Recipient"
          showPrintButton={true}
          showHelpButton={true}
        />
        
        <div className="p-4 md:p-6 space-y-4">
          <RecipientSearch onSearch={handleSearch} />
          <RecipientList 
            recipients={filteredRecipients}
            onViewRecipient={handleViewRecipient}
            onDeleteRecipient={handleDeleteRecipient}
          />
        </div>
      </main>
      
      <CreateRecipientModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)}
        onRecipientCreated={handleRecipientCreated}
      />
      
      <HelpSidebar
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Recipient Management Help"
        content={helpContent}
      />
      
      <div className="fixed bottom-4 right-4 z-10">
        <button 
          onClick={() => setIsHelpOpen(!isHelpOpen)}
          className="bg-bank-dark hover:bg-bank-dark/90 text-white rounded-full p-4 shadow-lg"
        >
          Help
        </button>
      </div>
    </div>
  );
};

export default MasterRecipientList;
