
import { useState } from "react";
import { Deal } from "@/types";
import { mockDeals, mockCompanies, mockContacts } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import DealsPipeline from "@/components/Deals/DealsPipeline";
import DealForm from "@/components/Deals/DealForm";

const Deals = () => {
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentDeal, setCurrentDeal] = useState<Deal | undefined>(undefined);

  const handleAddDeal = () => {
    setCurrentDeal(undefined);
    setIsFormOpen(true);
  };

  const handleEditDeal = (deal: Deal) => {
    setCurrentDeal(deal);
    setIsFormOpen(true);
  };

  const handleDeleteDeal = (dealId: string) => {
    setDeals((prev) => prev.filter((deal) => deal.id !== dealId));
    toast({
      title: "Deal deleted",
      description: "The deal has been successfully deleted.",
    });
  };

  const handleSaveDeal = (
    dealData: Omit<Deal, "id" | "createdAt" | "updatedAt">
  ) => {
    if (currentDeal) {
      // Update existing deal
      setDeals((prev) =>
        prev.map((deal) =>
          deal.id === currentDeal.id
            ? {
                ...deal,
                ...dealData,
                updatedAt: new Date().toISOString(),
              }
            : deal
        )
      );
      toast({
        title: "Deal updated",
        description: "The deal has been successfully updated.",
      });
    } else {
      // Add new deal
      const newDeal: Deal = {
        id: `${deals.length + 1}`,
        ...dealData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setDeals((prev) => [...prev, newDeal]);
      toast({
        title: "Deal added",
        description: "The deal has been successfully added.",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deals</h1>
        <p className="text-muted-foreground">
          Manage your sales pipeline and track deals
        </p>
      </div>

      <DealsPipeline
        deals={deals}
        onAddDeal={handleAddDeal}
        onEditDeal={handleEditDeal}
        onDeleteDeal={handleDeleteDeal}
      />

      <DealForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveDeal}
        deal={currentDeal}
        companies={mockCompanies}
        contacts={mockContacts}
      />
    </div>
  );
};

export default Deals;
