
import { useState } from "react";
import { Company } from "@/types";
import { mockCompanies } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import CompanyList from "@/components/Companies/CompanyList";
import CompanyForm from "@/components/Companies/CompanyForm";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>(mockCompanies);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>(
    undefined
  );

  const handleAddCompany = () => {
    setCurrentCompany(undefined);
    setIsFormOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setCurrentCompany(company);
    setIsFormOpen(true);
  };

  const handleDeleteCompany = (companyId: string) => {
    setCompanies((prev) => prev.filter((company) => company.id !== companyId));
    toast({
      title: "Company deleted",
      description: "The company has been successfully deleted.",
    });
  };

  const handleSaveCompany = (
    companyData: Omit<Company, "id" | "createdAt" | "updatedAt">
  ) => {
    if (currentCompany) {
      // Update existing company
      setCompanies((prev) =>
        prev.map((company) =>
          company.id === currentCompany.id
            ? {
                ...company,
                ...companyData,
                updatedAt: new Date().toISOString(),
              }
            : company
        )
      );
      toast({
        title: "Company updated",
        description: "The company has been successfully updated.",
      });
    } else {
      // Add new company
      const newCompany: Company = {
        id: `${companies.length + 1}`,
        ...companyData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setCompanies((prev) => [...prev, newCompany]);
      toast({
        title: "Company added",
        description: "The company has been successfully added.",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
        <p className="text-muted-foreground">
          Manage your company relationships
        </p>
      </div>

      <CompanyList
        companies={companies}
        onAddCompany={handleAddCompany}
        onEditCompany={handleEditCompany}
        onDeleteCompany={handleDeleteCompany}
      />

      <CompanyForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveCompany}
        company={currentCompany}
      />
    </div>
  );
};

export default Companies;
