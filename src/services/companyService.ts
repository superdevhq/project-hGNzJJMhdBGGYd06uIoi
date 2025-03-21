
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Company = Tables<"companies">;

export async function getCompanies(): Promise<Company[]> {
  // This will automatically filter by the current user due to RLS policies
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
  // This will automatically filter by the current user due to RLS policies
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

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at" | "user_id">): Promise<Company> {
  // Get the current user
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    throw new Error("User must be logged in to create a company");
  }
  
  // Add the user_id to the company data
  const companyWithUserId = {
    ...company,
    user_id: user.id
  };
  
  const { data, error } = await supabase
    .from("companies")
    .insert([companyWithUserId])
    .select()
    .single();

  if (error) {
    console.error("Error creating company:", error);
    throw error;
  }

  return data;
}

export async function updateCompany(id: string, company: Partial<Omit<Company, "id" | "created_at" | "updated_at" | "user_id">>): Promise<Company> {
  // RLS will ensure users can only update their own companies
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
  // RLS will ensure users can only delete their own companies
  const { error } = await supabase
    .from("companies")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting company with id ${id}:`, error);
    throw error;
  }
}
