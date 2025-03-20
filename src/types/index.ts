
export interface Company {
  id: string;
  name: string;
  industry: string;
  website: string;
  location: string;
  employees: number;
  revenue: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Deal {
  id: string;
  name: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  companyId: string;
  contactId: string;
  description: string;
  closingDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalDeals: number;
  totalCompanies: number;
  totalContacts: number;
  dealsWon: number;
  dealsLost: number;
  totalRevenue: number;
}

export interface Activity {
  id: string;
  type: 'deal_created' | 'deal_updated' | 'company_created' | 'contact_created';
  description: string;
  timestamp: string;
  entityId: string;
  entityType: 'deal' | 'company' | 'contact';
}
