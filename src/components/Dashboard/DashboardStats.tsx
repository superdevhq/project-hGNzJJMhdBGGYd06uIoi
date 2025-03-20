
import { DashboardStats as DashboardStatsType } from "@/types";
import { formatCurrency } from "@/data/mockData";
import { Building2, Contact, DollarSign, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStatsProps {
  stats: DashboardStatsType;
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  const statCards = [
    {
      title: "Total Revenue",
      value: formatCurrency(stats.totalRevenue),
      icon: <DollarSign className="h-5 w-5 text-emerald-500" />,
      description: "Total value of all deals",
      color: "bg-emerald-50 dark:bg-emerald-950",
    },
    {
      title: "Total Deals",
      value: stats.totalDeals,
      icon: <PieChart className="h-5 w-5 text-blue-500" />,
      description: `${stats.dealsWon} won · ${stats.dealsLost} lost`,
      color: "bg-blue-50 dark:bg-blue-950",
    },
    {
      title: "Companies",
      value: stats.totalCompanies,
      icon: <Building2 className="h-5 w-5 text-purple-500" />,
      description: "Active companies",
      color: "bg-purple-50 dark:bg-purple-950",
    },
    {
      title: "Contacts",
      value: stats.totalContacts,
      icon: <Contact className="h-5 w-5 text-orange-500" />,
      description: "Active contacts",
      color: "bg-orange-50 dark:bg-orange-950",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {statCards.map((card, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
            <div className={`rounded-full p-2 ${card.color}`}>{card.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
            <p className="text-xs text-muted-foreground">{card.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
