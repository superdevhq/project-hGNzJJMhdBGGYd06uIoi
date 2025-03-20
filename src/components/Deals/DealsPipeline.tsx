
import { useState } from "react";
import { Deal } from "@/types";
import { Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DealCard from "./DealCard";

interface DealsPipelineProps {
  deals: Deal[];
  onAddDeal: () => void;
  onEditDeal: (deal: Deal) => void;
  onDeleteDeal: (dealId: string) => void;
}

const DealsPipeline = ({
  deals,
  onAddDeal,
  onEditDeal,
  onDeleteDeal,
}: DealsPipelineProps) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDeals = deals.filter((deal) =>
    deal.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stages: Deal["stage"][] = [
    "lead",
    "qualified",
    "proposal",
    "negotiation",
    "closed-won",
    "closed-lost",
  ];

  const stageLabels: Record<Deal["stage"], string> = {
    lead: "Lead",
    qualified: "Qualified",
    proposal: "Proposal",
    negotiation: "Negotiation",
    "closed-won": "Closed Won",
    "closed-lost": "Closed Lost",
  };

  const dealsByStage = stages.reduce(
    (acc, stage) => {
      acc[stage] = filteredDeals.filter((deal) => deal.stage === stage);
      return acc;
    },
    {} as Record<Deal["stage"], Deal[]>
  );

  const calculateStageValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <h2 className="text-2xl font-bold tracking-tight">Deals Pipeline</h2>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search deals..."
              className="w-full pl-8 sm:w-[300px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button onClick={onAddDeal}>
            <Plus className="mr-2 h-4 w-4" />
            Add Deal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stages.map((stage) => (
          <div key={stage} className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{stageLabels[stage]}</h3>
              <span className="text-sm text-muted-foreground">
                {dealsByStage[stage].length} deals
              </span>
            </div>
            <div className="space-y-4">
              {dealsByStage[stage].map((deal) => (
                <DealCard
                  key={deal.id}
                  deal={deal}
                  onEdit={onEditDeal}
                  onDelete={onDeleteDeal}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsPipeline;
