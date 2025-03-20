
import { useState, useEffect } from "react";
import { Company } from "@/types";
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

interface CompanyFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (company: Omit<Company, "id" | "createdAt" | "updatedAt">) => void;
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
    employees: 0,
    revenue: "",
  });

  useEffect(() => {
    if (company) {
      setFormData({
        name: company.name,
        industry: company.industry,
        website: company.website,
        location: company.location,
        employees: company.employees,
        revenue: company.revenue,
      });
    } else {
      setFormData({
        name: "",
        industry: "",
        website: "",
        location: "",
        employees: 0,
        revenue: "",
      });
    }
  }, [company, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "employees" ? parseInt(value) || 0 : value,
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
                required
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="employees">Employees</Label>
                <Input
                  id="employees"
                  name="employees"
                  type="number"
                  min="0"
                  value={formData.employees}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="revenue">Annual Revenue</Label>
                <Input
                  id="revenue"
                  name="revenue"
                  value={formData.revenue}
                  onChange={handleChange}
                />
              </div>
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
