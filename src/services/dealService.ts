
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Deal = Tables<"deals">;

export async function getDeals(): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*, companies(*), contacts(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching deals:", error);
    throw error;
  }

  return data || [];
}

export async function getDealById(id: string): Promise<Deal | null> {
  const { data, error } = await supabase
    .from("deals")
    .select("*, companies(*), contacts(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching deal with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function getDealsByCompanyId(companyId: string): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*, contacts(*)")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching deals for company ${companyId}:`, error);
    throw error;
  }

  return data || [];
}

export async function getDealsByContactId(contactId: string): Promise<Deal[]> {
  const { data, error } = await supabase
    .from("deals")
    .select("*, companies(*)")
    .eq("contact_id", contactId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching deals for contact ${contactId}:`, error);
    throw error;
  }

  return data || [];
}

export async function createDeal(deal: Omit<Deal, "id" | "created_at" | "updated_at">): Promise<Deal> {
  const { data, error } = await supabase
    .from("deals")
    .insert([deal])
    .select()
    .single();

  if (error) {
    console.error("Error creating deal:", error);
    throw error;
  }

  return data;
}

export async function updateDeal(id: string, deal: Partial<Omit<Deal, "id" | "created_at" | "updated_at">>): Promise<Deal> {
  const { data, error } = await supabase
    .from("deals")
    .update(deal)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating deal with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteDeal(id: string): Promise<void> {
  const { error } = await supabase
    .from("deals")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting deal with id ${id}:`, error);
    throw error;
  }
}
