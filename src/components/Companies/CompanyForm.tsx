
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Company } from "@/services/companyService";

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Omit<Company, "id" | "created_at" | "updated_at" | "user_id">) => void;
  company?: Company;
}

const CompanyForm = ({
  isOpen,
  onClose,
  onSave,
  company,
}: CompanyFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    industry: "",
    website: "",
    location: "",
    size: "",
    description: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name || "",
        industry: company.industry || "",
        website: company.website || "",
        location: company.location || "",
        size: company.size || "",
        description: company.description || "",
      });
    } else {
      setFormData({
        name: "",
        industry: "",
        website: "",
        location: "",
        size: "",
        description: "",
      });
    }
  }, [company, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {company ? "Edit Company" : "Add New Company"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Company Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="industry">Industry</Label>
              <Input
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="size">Company Size</Label>
              <Input
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                placeholder="e.g. Small, Medium, Enterprise"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Brief description of the company"
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

export default CompanyForm;
