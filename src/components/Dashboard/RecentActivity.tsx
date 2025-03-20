
import { Activity } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { Building2, Contact, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RecentActivityProps {
  activities: Activity[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "deal":
        return <PieChart className="h-4 w-4 text-blue-500" />;
      case "company":
        return <Building2 className="h-4 w-4 text-purple-500" />;
      case "contact":
        return <Contact className="h-4 w-4 text-orange-500" />;
      default:
        return <PieChart className="h-4 w-4" />;
    }
  };

  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start">
              <div className="mr-4 mt-0.5 rounded-full border p-2">
                {getActivityIcon(activity.entityType)}
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">
                  {activity.description}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
