
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Activity = Tables<"activities">;

export async function getActivities(limit = 10): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*, companies(*), contacts(*), deals(*)")
    .order("date", { ascending: false })
    .limit(limit);

  if (error) {
    console.error("Error fetching activities:", error);
    throw error;
  }

  return data || [];
}

export async function getActivityById(id: string): Promise<Activity | null> {
  const { data, error } = await supabase
    .from("activities")
    .select("*, companies(*), contacts(*), deals(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching activity with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function getActivitiesByCompanyId(companyId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*, contacts(*), deals(*)")
    .eq("company_id", companyId)
    .order("date", { ascending: false });

  if (error) {
    console.error(`Error fetching activities for company ${companyId}:`, error);
    throw error;
  }

  return data || [];
}

export async function getActivitiesByContactId(contactId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*, companies(*), deals(*)")
    .eq("contact_id", contactId)
    .order("date", { ascending: false });

  if (error) {
    console.error(`Error fetching activities for contact ${contactId}:`, error);
    throw error;
  }

  return data || [];
}

export async function getActivitiesByDealId(dealId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from("activities")
    .select("*, companies(*), contacts(*)")
    .eq("deal_id", dealId)
    .order("date", { ascending: false });

  if (error) {
    console.error(`Error fetching activities for deal ${dealId}:`, error);
    throw error;
  }

  return data || [];
}

export async function createActivity(activity: Omit<Activity, "id" | "created_at" | "updated_at">): Promise<Activity> {
  const { data, error } = await supabase
    .from("activities")
    .insert([activity])
    .select()
    .single();

  if (error) {
    console.error("Error creating activity:", error);
    throw error;
  }

  return data;
}

export async function updateActivity(id: string, activity: Partial<Omit<Activity, "id" | "created_at" | "updated_at">>): Promise<Activity> {
  const { data, error } = await supabase
    .from("activities")
    .update(activity)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating activity with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteActivity(id: string): Promise<void> {
  const { error } = await supabase
    .from("activities")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting activity with id ${id}:`, error);
    throw error;
  }
}
