
import { useState, useEffect } from "react";
import { Deal, Company, Contact } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DealFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (deal: Omit<Deal, "id" | "createdAt" | "updatedAt">) => void;
  deal?: Deal;
  companies: Company[];
  contacts: Contact[];
}

const DealForm = ({
  isOpen,
  onClose,
  onSave,
  deal,
  companies,
  contacts,
}: DealFormProps) => {
  const [formData, setFormData] = useState<
    Omit<Deal, "id" | "createdAt" | "updatedAt">
  >({
    name: "",
    value: 0,
    stage: "lead",
    companyId: "",
    contactId: "",
    description: "",
    closingDate: new Date().toISOString().split("T")[0],
  });

  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);

  useEffect(() => {
    if (deal) {
      setFormData({
        name: deal.name,
        value: deal.value,
        stage: deal.stage,
        companyId: deal.companyId,
        contactId: deal.contactId,
        description: deal.description,
        closingDate: new Date(deal.closingDate).toISOString().split("T")[0],
      });
      setFilteredContacts(
        contacts.filter((contact) => contact.companyId === deal.companyId)
      );
    } else {
      const defaultCompanyId =
        companies.length > 0 ? companies[0].id : "";
      setFormData({
        name: "",
        value: 0,
        stage: "lead",
        companyId: defaultCompanyId,
        contactId: "",
        description: "",
        closingDate: new Date().toISOString().split("T")[0],
      });
      setFilteredContacts(
        contacts.filter((contact) => contact.companyId === defaultCompanyId)
      );
    }
  }, [deal, companies, contacts, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "value" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    if (name === "companyId") {
      const filteredContacts = contacts.filter(
        (contact) => contact.companyId === value
      );
      setFilteredContacts(filteredContacts);
      setFormData((prev) => ({
        ...prev,
        companyId: value,
        contactId: filteredContacts.length > 0 ? filteredContacts[0].id : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const stages = [
    { value: "lead", label: "Lead" },
    { value: "qualified", label: "Qualified" },
    { value: "proposal", label: "Proposal" },
    { value: "negotiation", label: "Negotiation" },
    { value: "closed-won", label: "Closed Won" },
    { value: "closed-lost", label: "Closed Lost" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{deal ? "Edit Deal" : "Add New Deal"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Deal Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="value">Value</Label>
                <Input
                  id="value"
                  name="value"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.value}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="stage">Stage</Label>
                <Select
                  value={formData.stage}
                  onValueChange={(value) =>
                    handleSelectChange(
                      "stage",
                      value as Deal["stage"]
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a stage" />
                  </SelectTrigger>
                  <SelectContent>
                    {stages.map((stage) => (
                      <SelectItem key={stage.value} value={stage.value}>
                        {stage.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="companyId">Company</Label>
              <Select
                value={formData.companyId}
                onValueChange={(value) => handleSelectChange("companyId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contactId">Contact</Label>
              <Select
                value={formData.contactId}
                onValueChange={(value) => handleSelectChange("contactId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                  {filteredContacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id}>
                      {contact.firstName} {contact.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="closingDate">Closing Date</Label>
              <Input
                id="closingDate"
                name="closingDate"
                type="date"
                value={formData.closingDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DealForm;
