
import { useState } from "react";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import RecentActivity from "@/components/Dashboard/RecentActivity";
import { mockDashboardStats, mockActivities, mockDeals } from "@/data/mockData";
import { Deal } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Index = () => {
  const [stats] = useState(mockDashboardStats);
  const [activities] = useState(mockActivities);

  // Prepare data for the deals by stage chart
  const stageLabels: Record<Deal["stage"], string> = {
    lead: "Lead",
    qualified: "Qualified",
    proposal: "Proposal",
    negotiation: "Negotiation",
    "closed-won": "Closed Won",
    "closed-lost": "Closed Lost",
  };

  const dealsByStage = Object.entries(stageLabels).map(([stage, label]) => {
    const stageDeals = mockDeals.filter((deal) => deal.stage === stage);
    const value = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
    const count = stageDeals.length;

    return {
      name: label,
      value,
      count,
    };
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of your CRM performance and activity
        </p>
      </div>

      <DashboardStats stats={stats} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1 md:col-span-2">
          <CardHeader>
            <CardTitle>Deals by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dealsByStage}>
                  <XAxis dataKey="name" />
                  <YAxis 
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Bar 
                    dataKey="value" 
                    fill="#3b82f6" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <RecentActivity activities={activities} />
      </div>
    </div>
  );
};

export default Index;
