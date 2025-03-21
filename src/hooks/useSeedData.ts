
import { useState } from "react";
import { createCompany } from "@/services/companyService";
import { createContact } from "@/services/contactService";
import { createDeal } from "@/services/dealService";
import { createActivity } from "@/services/activityService";

export function useSeedData() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const seedData = async () => {
    setIsSeeding(true);
    setError(null);
    setSuccess(false);

    try {
      // Create companies
      const acme = await createCompany({
        name: "Acme Corporation",
        industry: "Technology",
        size: "Enterprise",
        website: "https://acme.example.com",
        description: "A leading technology company specializing in innovative solutions."
      });

      const globex = await createCompany({
        name: "Globex Corporation",
        industry: "Manufacturing",
        size: "Medium",
        website: "https://globex.example.com",
        description: "A manufacturing company focused on sustainable products."
      });

      const stark = await createCompany({
        name: "Stark Industries",
        industry: "Defense",
        size: "Large",
        website: "https://stark.example.com",
        description: "A defense contractor with a focus on cutting-edge technology."
      });

      // Create contacts
      const johnDoe = await createContact({
        first_name: "John",
        last_name: "Doe",
        email: "john.doe@acme.example.com",
        phone: "+1 (555) 123-4567",
        job_title: "CTO",
        company_id: acme.id
      });

      const janeSmith = await createContact({
        first_name: "Jane",
        last_name: "Smith",
        email: "jane.smith@globex.example.com",
        phone: "+1 (555) 987-6543",
        job_title: "CEO",
        company_id: globex.id
      });

      const tonyStark = await createContact({
        first_name: "Tony",
        last_name: "Stark",
        email: "tony@stark.example.com",
        phone: "+1 (555) 111-2222",
        job_title: "CEO",
        company_id: stark.id
      });

      // Create deals
      const deal1 = await createDeal({
        name: "Acme Software Implementation",
        value: 50000,
        stage: "proposal",
        close_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
        company_id: acme.id,
        contact_id: johnDoe.id
      });

      const deal2 = await createDeal({
        name: "Globex Manufacturing Contract",
        value: 75000,
        stage: "negotiation",
        close_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
        company_id: globex.id,
        contact_id: janeSmith.id
      });

      const deal3 = await createDeal({
        name: "Stark Industries Partnership",
        value: 150000,
        stage: "qualified",
        close_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 days from now
        company_id: stark.id,
        contact_id: tonyStark.id
      });

      // Create activities
      await createActivity({
        type: "company_created",
        title: "Created Acme Corporation",
        description: "Added new company to the CRM",
        date: new Date().toISOString(),
        company_id: acme.id,
        contact_id: null,
        deal_id: null
      });

      await createActivity({
        type: "contact_created",
        title: "Added John Doe",
        description: "Added new contact at Acme Corporation",
        date: new Date().toISOString(),
        company_id: acme.id,
        contact_id: johnDoe.id,
        deal_id: null
      });

      await createActivity({
        type: "deal_created",
        title: "Created Acme Software Implementation deal",
        description: "New deal worth $50,000",
        date: new Date().toISOString(),
        company_id: acme.id,
        contact_id: johnDoe.id,
        deal_id: deal1.id
      });

      await createActivity({
        type: "company_created",
        title: "Created Globex Corporation",
        description: "Added new company to the CRM",
        date: new Date().toISOString(),
        company_id: globex.id,
        contact_id: null,
        deal_id: null
      });

      await createActivity({
        type: "deal_created",
        title: "Created Globex Manufacturing Contract deal",
        description: "New deal worth $75,000",
        date: new Date().toISOString(),
        company_id: globex.id,
        contact_id: janeSmith.id,
        deal_id: deal2.id
      });

      await createActivity({
        type: "deal_created",
        title: "Created Stark Industries Partnership deal",
        description: "New deal worth $150,000",
        date: new Date().toISOString(),
        company_id: stark.id,
        contact_id: tonyStark.id,
        deal_id: deal3.id
      });

      setSuccess(true);
    } catch (err) {
      console.error("Error seeding data:", err);
      setError(err instanceof Error ? err : new Error("Unknown error occurred while seeding data"));
    } finally {
      setIsSeeding(false);
    }
  };

  return {
    seedData,
    isSeeding,
    error,
    success
  };
}
