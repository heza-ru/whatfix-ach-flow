
import React, { useState } from 'react';
import { Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import RecipientSearch, { RecipientSearchFilters } from '@/components/recipients/RecipientSearch';
import RecipientList from '@/components/recipients/RecipientList';
import HelpSidebar from '@/components/layout/HelpSidebar';
import { mockRecipients } from '@/utils/mockData';

const RecipientsPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [recipients, setRecipients] = useState(mockRecipients);
  const [filteredRecipients, setFilteredRecipients] = useState(mockRecipients);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleSearch = (filters: RecipientSearchFilters) => {
    let filtered = [...recipients];

    if (filters.recipientName) {
      const searchTerm = filters.recipientName.toLowerCase();
      if (searchTerm.includes('*')) {
        const parts = searchTerm.split('*').filter(part => part !== '');
        filtered = filtered.filter(recipient => {
          const name = recipient.name.toLowerCase();
          return parts.every(part => name.includes(part));
        });
      } else {
        filtered = filtered.filter(recipient => 
          recipient.name.toLowerCase().includes(searchTerm)
        );
      }
    }

    if (filters.status !== 'All Status') {
      filtered = filtered.filter(recipient => recipient.status === filters.status.toLowerCase());
    }

    setFilteredRecipients(filtered);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} recipients matching your criteria.`,
    });
  };

  const handleCreateRecipient = () => {
    // Navigate to create recipient page
    navigate('/recipients/new');
  };

  const handleViewRecipient = (recipientId: string) => {
    // Navigate to view recipient page
    navigate(`/recipients/${recipientId}`);
  };

  const handleDeleteRecipient = (recipientId: string) => {
    // Delete recipient logic
    setRecipients(recipients.filter(recipient => recipient.id !== recipientId));
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
        <h3 className="font-medium mb-1">Wildcard Search</h3>
        <p>Use the asterisk (*) as a wildcard in your search. For example, if you're looking for "ABC Company" but only remember "ABC", you can search for "ABC*".</p>
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

export default RecipientsPage;
