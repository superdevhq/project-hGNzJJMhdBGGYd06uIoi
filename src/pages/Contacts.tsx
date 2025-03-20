
import { useState } from "react";
import { Contact } from "@/types";
import { mockContacts, mockCompanies } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";
import ContactList from "@/components/Contacts/ContactList";
import ContactForm from "@/components/Contacts/ContactForm";

const Contacts = () => {
  const [contacts, setContacts] = useState<Contact[]>(mockContacts);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState<Contact | undefined>(
    undefined
  );

  const handleAddContact = () => {
    setCurrentContact(undefined);
    setIsFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setCurrentContact(contact);
    setIsFormOpen(true);
  };

  const handleDeleteContact = (contactId: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== contactId));
    toast({
      title: "Contact deleted",
      description: "The contact has been successfully deleted.",
    });
  };

  const handleSaveContact = (
    contactData: Omit<Contact, "id" | "createdAt" | "updatedAt">
  ) => {
    if (currentContact) {
      // Update existing contact
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === currentContact.id
            ? {
                ...contact,
                ...contactData,
                updatedAt: new Date().toISOString(),
              }
            : contact
        )
      );
      toast({
        title: "Contact updated",
        description: "The contact has been successfully updated.",
      });
    } else {
      // Add new contact
      const newContact: Contact = {
        id: `${contacts.length + 1}`,
        ...contactData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      setContacts((prev) => [...prev, newContact]);
      toast({
        title: "Contact added",
        description: "The contact has been successfully added.",
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Contacts</h1>
        <p className="text-muted-foreground">
          Manage your contact relationships
        </p>
      </div>

      <ContactList
        contacts={contacts}
        onAddContact={handleAddContact}
        onEditContact={handleEditContact}
        onDeleteContact={handleDeleteContact}
      />

      <ContactForm
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveContact}
        contact={currentContact}
        companies={mockCompanies}
      />
    </div>
  );
};

export default Contacts;
