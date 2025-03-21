
import { supabase } from "@/integrations/supabase/client";

export interface DashboardStats {
  totalCompanies: number;
  totalContacts: number;
  totalDeals: number;
  totalRevenue: number;
  dealsWon: number;
  dealsLost: number;
}

export async function getDashboardStats(): Promise<DashboardStats> {
  // Get companies count
  const { count: companiesCount, error: companiesError } = await supabase
    .from("companies")
    .select("*", { count: "exact", head: true });

  if (companiesError) {
    console.error("Error fetching companies count:", companiesError);
    throw companiesError;
  }

  // Get contacts count
  const { count: contactsCount, error: contactsError } = await supabase
    .from("contacts")
    .select("*", { count: "exact", head: true });

  if (contactsError) {
    console.error("Error fetching contacts count:", contactsError);
    throw contactsError;
  }

  // Get deals count
  const { count: dealsCount, error: dealsError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true });

  if (dealsError) {
    console.error("Error fetching deals count:", dealsError);
    throw dealsError;
  }

  // Get won deals count
  const { count: dealsWonCount, error: dealsWonError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("stage", "closed-won");

  if (dealsWonError) {
    console.error("Error fetching won deals count:", dealsWonError);
    throw dealsWonError;
  }

  // Get lost deals count
  const { count: dealsLostCount, error: dealsLostError } = await supabase
    .from("deals")
    .select("*", { count: "exact", head: true })
    .eq("stage", "closed-lost");

  if (dealsLostError) {
    console.error("Error fetching lost deals count:", dealsLostError);
    throw dealsLostError;
  }

  // Get total revenue (sum of deal values for won deals)
  const { data: revenueData, error: revenueError } = await supabase
    .from("deals")
    .select("value")
    .eq("stage", "closed-won");

  if (revenueError) {
    console.error("Error fetching revenue data:", revenueError);
    throw revenueError;
  }

  const totalRevenue = revenueData.reduce((sum, deal) => sum + (deal.value || 0), 0);

  return {
    totalCompanies: companiesCount || 0,
    totalContacts: contactsCount || 0,
    totalDeals: dealsCount || 0,
    dealsWon: dealsWonCount || 0,
    dealsLost: dealsLostCount || 0,
    totalRevenue,
  };
}
