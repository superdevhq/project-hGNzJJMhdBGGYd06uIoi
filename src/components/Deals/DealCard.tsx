
import { Deal } from "@/types";
import { formatCurrency, getCompanyName, getContactName } from "@/data/mockData";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface DealCardProps {
  deal: Deal;
  onEdit: (deal: Deal) => void;
  onDelete: (dealId: string) => void;
}

const DealCard = ({ deal, onEdit, onDelete }: DealCardProps) => {
  const getStageBadgeVariant = (stage: Deal["stage"]) => {
    switch (stage) {
      case "lead":
        return "secondary";
      case "qualified":
        return "outline";
      case "proposal":
        return "default";
      case "negotiation":
        return "secondary";
      case "closed-won":
        return "default";
      case "closed-lost":
        return "destructive";
      default:
        return "outline";
    }
  };

  const formatStageLabel = (stage: string) => {
    return stage
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <h3 className="font-semibold leading-none tracking-tight">
            {deal.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getCompanyName(deal.companyId)}
          </p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(deal)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(deal.id)}
              className="text-destructive focus:text-destructive"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="mb-4 flex items-center justify-between">
          <Badge variant={getStageBadgeVariant(deal.stage)}>
            {formatStageLabel(deal.stage)}
          </Badge>
          <span className="font-medium">{formatCurrency(deal.value)}</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="text-muted-foreground">
            Contact: {getContactName(deal.contactId)}
          </div>
          {deal.description && (
            <p className="line-clamp-2 text-muted-foreground">
              {deal.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        Closing: {format(new Date(deal.closingDate), "MMM d, yyyy")}
      </CardFooter>
    </Card>
  );
};

export default DealCard;
