
import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import CompanyList from "@/components/Companies/CompanyList";
import CompanyForm from "@/components/Companies/CompanyForm";
import { 
  getCompanies, 
  createCompany, 
  updateCompany, 
  deleteCompany,
  Company
} from "@/services/companyService";
import { Loader2 } from "lucide-react";

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentCompany, setCurrentCompany] = useState<Company | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setIsLoading(true);
        const data = await getCompanies();
        setCompanies(data);
      } catch (err) {
        console.error("Error fetching companies:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch companies"));
        toast({
          title: "Error",
          description: "Failed to load companies. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const handleAddCompany = () => {
    setCurrentCompany(undefined);
    setIsFormOpen(true);
  };

  const handleEditCompany = (company: Company) => {
    setCurrentCompany(company);
    setIsFormOpen(true);
  };

  const handleDeleteCompany = async (companyId: string) => {
    try {
      await deleteCompany(companyId);
      setCompanies((prev) => prev.filter((company) => company.id !== companyId));
      toast({
        title: "Company deleted",
        description: "The company has been successfully deleted.",
      });
    } catch (err) {
      console.error("Error deleting company:", err);
      toast({
        title: "Error",
        description: "Failed to delete company. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSaveCompany = async (
    companyData: Omit<Company, "id" | "created_at" | "updated_at" | "user_id">
  ) => {
    try {
      if (currentCompany) {
        // Update existing company
        const updated = await updateCompany(currentCompany.id, companyData);
        setCompanies((prev) =>
          prev.map((company) =>
            company.id === currentCompany.id ? updated : company
          )
        );
        toast({
          title: "Company updated",
          description: "The company has been successfully updated.",
        });
      } else {
        // Add new company
        const newCompany = await createCompany(companyData);
        setCompanies((prev) => [newCompany, ...prev]);
        toast({
          title: "Company added",
          description: "The company has been successfully added.",
        });
      }
      setIsFormOpen(false);
    } catch (err) {
      console.error("Error saving company:", err);
      toast({
        title: "Error",
        description: "Failed to save company. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2">
        <p className="text-destructive">Failed to load companies</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-sm text-primary underline"
        >
          Try again
        </button>
      </div>
    );
  }

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
