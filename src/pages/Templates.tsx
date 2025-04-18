
import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Navigation from '@/components/layout/Navigation';
import PageHeader from '@/components/layout/PageHeader';
import TemplateSearch, { TemplateSearchFilters } from '@/components/templates/TemplateSearch';
import TemplateList from '@/components/templates/TemplateList';
import HelpSidebar from '@/components/layout/HelpSidebar';
import { mockTemplates } from '@/utils/mockData';

const TemplatesPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [templates, setTemplates] = useState(mockTemplates);
  const [filteredTemplates, setFilteredTemplates] = useState(mockTemplates);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleSearch = (filters: TemplateSearchFilters) => {
    let filtered = [...templates];

    if (filters.templateName) {
      const searchTerm = filters.templateName.toLowerCase();
      if (searchTerm.includes('*')) {
        const parts = searchTerm.split('*').filter(part => part !== '');
        filtered = filtered.filter(template => {
          const name = template.name.toLowerCase();
          return parts.every(part => name.includes(part));
        });
      } else {
        filtered = filtered.filter(template => 
          template.name.toLowerCase().includes(searchTerm)
        );
      }
    }

    if (filters.paymentType !== 'All Payment Types') {
      filtered = filtered.filter(template => template.type === filters.paymentType);
    }

    if (filters.status !== 'All Statuses') {
      filtered = filtered.filter(template => template.status === filters.status.toLowerCase());
    }

    setFilteredTemplates(filtered);
    
    toast({
      title: "Search Results",
      description: `Found ${filtered.length} templates matching your criteria.`,
    });
  };

  const handleCreateTemplate = () => {
    // Navigate to create template page
    navigate('/templates/new');
  };

  const handleViewTemplate = (templateId: string) => {
    // Navigate to view template page
    navigate(`/templates/${templateId}`);
  };

  const handleEditTemplate = (templateId: string) => {
    // Navigate to edit template page
    navigate(`/templates/${templateId}/edit`);
  };

  const handleDeleteTemplate = (templateId: string) => {
    // Delete template logic
    setTemplates(templates.filter(template => template.id !== templateId));
    setFilteredTemplates(filteredTemplates.filter(template => template.id !== templateId));
    
    toast({
      title: "Template Deleted",
      description: "The template has been successfully deleted.",
    });
  };

  const helpContent = (
    <div className="text-sm space-y-4">
      <p>The Template Center allows you to create and manage payment templates.</p>
      <div>
        <h3 className="font-medium mb-1">Search for Templates</h3>
        <p>Use the search filters at the top to find specific templates. You can search by template name, payment type, or status.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Wildcard Search</h3>
        <p>Use the asterisk (*) as a wildcard in your search. For example, if you're looking for "ABC Company" but only remember "ABC", you can search for "ABC*".</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Create a New Template</h3>
        <p>Click the "Create a Template" button to set up a new payment template.</p>
      </div>
      <div>
        <h3 className="font-medium mb-1">Manage Templates</h3>
        <p>Use the Actions menu to view details, edit, or delete templates.</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      <Navigation />
      
      <main className="flex-1">
        <PageHeader
          icon={<CreditCard />}
          title="TEMPLATE CENTER"
          subtitle="Use this page to select template options or review existing templates."
          onCreateNew={handleCreateTemplate}
          createButtonText="Create a Template"
          showPrintButton={true}
          showHelpButton={true}
        />
        
        <div className="p-4 md:p-6 space-y-4">
          <TemplateSearch onSearch={handleSearch} />
          <TemplateList 
            templates={filteredTemplates}
            onViewTemplate={handleViewTemplate}
            onEditTemplate={handleEditTemplate}
            onDeleteTemplate={handleDeleteTemplate}
          />
        </div>
      </main>
      
      <HelpSidebar
        isOpen={isHelpOpen}
        onClose={() => setIsHelpOpen(false)}
        title="Template Center Help"
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

export default TemplatesPage;
