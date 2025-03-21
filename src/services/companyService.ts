
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Company = Tables<"companies">;

export async function getCompanies(): Promise<Company[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }

  return data || [];
}

export async function getCompanyById(id: string): Promise<Company | null> {
  const { data, error } = await supabase
    .from("companies")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching company with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">): Promise<Company> {
  const { data, error } = await supabase
    .from("companies")
    .insert([company])
    .select()
    .single();

  if (error) {
    console.error("Error creating company:", error);
    throw error;
  }

  return data;
}

export async function updateCompany(id: string, company: Partial<Omit<Company, "id" | "created_at" | "updated_at">>): Promise<Company> {
  const { data, error } = await supabase
    .from("companies")
    .update(company)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating company with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteCompany(id: string): Promise<void> {
  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting company with id ${id}:`, error);
    throw error;
  }
}
