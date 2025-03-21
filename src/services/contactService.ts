
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";

export type Contact = Tables<"contacts">;

export async function getContacts(): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*, companies(*)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contacts:", error);
    throw error;
  }

  return data || [];
}

export async function getContactById(id: string): Promise<Contact | null> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*, companies(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching contact with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function getContactsByCompanyId(companyId: string): Promise<Contact[]> {
  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(`Error fetching contacts for company ${companyId}:`, error);
    throw error;
  }

  return data || [];
}

export async function createContact(contact: Omit<Contact, "id" | "created_at" | "updated_at">): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .insert([contact])
    .select()
    .single();

  if (error) {
    console.error("Error creating contact:", error);
    throw error;
  }

  return data;
}

export async function updateContact(id: string, contact: Partial<Omit<Contact, "id" | "created_at" | "updated_at">>): Promise<Contact> {
  const { data, error } = await supabase
    .from("contacts")
    .update(contact)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(`Error updating contact with id ${id}:`, error);
    throw error;
  }

  return data;
}

export async function deleteContact(id: string): Promise<void> {
  const { error } = await supabase
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(`Error deleting contact with id ${id}:`, error);
    throw error;
  }
}
