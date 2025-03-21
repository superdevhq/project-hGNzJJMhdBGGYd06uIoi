import { useEffect, useState } from "react";
import DashboardStats from "@/components/Dashboard/DashboardStats";
import { RecentActivity } from "@/components/Dashboard/RecentActivity";
import { SeedDataButton } from "@/components/SeedDataButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "@/services/dashboardService";
import { getActivities } from "@/services/activityService";
import { Activity } from "@/services/activityService";
import { Loader2 } from "lucide-react";

export default function Index() {
  const [stats, setStats] = useState<{
    totalDeals: number;
    totalCompanies: number;
    totalContacts: number;
    dealsWon: number;
    dealsLost: number;
    totalRevenue: number;
  } | null>(null);
  
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const [dashboardStats, recentActivities] = await Promise.all([
          getDashboardStats(),
          getActivities(10)
        ]);
        
        setStats(dashboardStats);
        setActivities(recentActivities);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError("Failed to load dashboard data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const formatActivities = (activities: Activity[]) => {
    return activities.map(activity => ({
      id: activity.id,
      type: activity.type as 'deal_created' | 'deal_updated' | 'company_created' | 'contact_created',
      description: activity.title,
      timestamp: activity.date,
      entityId: activity.deal_id || activity.company_id || activity.contact_id || '',
      entityType: activity.deal_id ? 'deal' : activity.company_id ? 'company' : 'contact'
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-64px)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Error</CardTitle>
            <CardDescription>Something went wrong</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{error}</p>
            <div className="mt-4">
              <SeedDataButton />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {stats && activities.length > 0 ? (
        <>
          <DashboardStats stats={stats} />
          <RecentActivity activities={formatActivities(activities)} />
        </>
      ) : (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Welcome to CRM Hub</CardTitle>
            <CardDescription>Get started by seeding some sample data</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Your database appears to be empty. Click the button below to create sample companies, contacts, deals, and activities.</p>
            <SeedDataButton />
          </CardContent>
        </Card>
      )}
    </div>
  );
}