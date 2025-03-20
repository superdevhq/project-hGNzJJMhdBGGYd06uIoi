
import { Company, Contact, Deal, Activity, DashboardStats } from '../types';

export const mockCompanies: Company[] = [
  {
    id: '1',
    name: 'Acme Corporation',
    industry: 'Technology',
    website: 'https://acme.example.com',
    location: 'San Francisco, CA',
    employees: 250,
    revenue: '$25M',
    createdAt: '2023-01-15T08:30:00Z',
    updatedAt: '2023-06-20T14:45:00Z'
  },
  {
    id: '2',
    name: 'Globex Industries',
    industry: 'Manufacturing',
    website: 'https://globex.example.com',
    location: 'Chicago, IL',
    employees: 500,
    revenue: '$75M',
    createdAt: '2023-02-10T10:15:00Z',
    updatedAt: '2023-07-05T09:30:00Z'
  },
  {
    id: '3',
    name: 'Oceanic Airlines',
    industry: 'Transportation',
    website: 'https://oceanic.example.com',
    location: 'Miami, FL',
    employees: 1200,
    revenue: '$120M',
    createdAt: '2023-03-22T11:45:00Z',
    updatedAt: '2023-08-12T16:20:00Z'
  },
  {
    id: '4',
    name: 'Stark Industries',
    industry: 'Technology',
    website: 'https://stark.example.com',
    location: 'New York, NY',
    employees: 850,
    revenue: '$350M',
    createdAt: '2023-04-05T09:00:00Z',
    updatedAt: '2023-09-01T13:10:00Z'
  },
  {
    id: '5',
    name: 'Umbrella Corporation',
    industry: 'Healthcare',
    website: 'https://umbrella.example.com',
    location: 'Boston, MA',
    employees: 620,
    revenue: '$95M',
    createdAt: '2023-05-18T14:30:00Z',
    updatedAt: '2023-10-15T10:45:00Z'
  }
];

export const mockContacts: Contact[] = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Smith',
    email: 'john.smith@acme.example.com',
    phone: '(555) 123-4567',
    position: 'CTO',
    companyId: '1',
    createdAt: '2023-01-20T09:45:00Z',
    updatedAt: '2023-06-25T11:30:00Z'
  },
  {
    id: '2',
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@globex.example.com',
    phone: '(555) 234-5678',
    position: 'CEO',
    companyId: '2',
    createdAt: '2023-02-15T13:20:00Z',
    updatedAt: '2023-07-10T15:45:00Z'
  },
  {
    id: '3',
    firstName: 'Michael',
    lastName: 'Brown',
    email: 'michael.brown@oceanic.example.com',
    phone: '(555) 345-6789',
    position: 'Sales Director',
    companyId: '3',
    createdAt: '2023-03-25T10:10:00Z',
    updatedAt: '2023-08-15T09:20:00Z'
  },
  {
    id: '4',
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@stark.example.com',
    phone: '(555) 456-7890',
    position: 'Marketing Manager',
    companyId: '4',
    createdAt: '2023-04-10T11:30:00Z',
    updatedAt: '2023-09-05T14:15:00Z'
  },
  {
    id: '5',
    firstName: 'David',
    lastName: 'Wilson',
    email: 'david.wilson@umbrella.example.com',
    phone: '(555) 567-8901',
    position: 'CFO',
    companyId: '5',
    createdAt: '2023-05-20T08:45:00Z',
    updatedAt: '2023-10-18T16:30:00Z'
  },
  {
    id: '6',
    firstName: 'Jessica',
    lastName: 'Miller',
    email: 'jessica.miller@acme.example.com',
    phone: '(555) 678-9012',
    position: 'Product Manager',
    companyId: '1',
    createdAt: '2023-06-05T15:20:00Z',
    updatedAt: '2023-11-01T10:10:00Z'
  }
];

export const mockDeals: Deal[] = [
  {
    id: '1',
    name: 'Enterprise Software Implementation',
    value: 75000,
    stage: 'proposal',
    companyId: '1',
    contactId: '1',
    description: 'Implementation of our enterprise software suite',
    closingDate: '2023-12-15T00:00:00Z',
    createdAt: '2023-06-10T09:30:00Z',
    updatedAt: '2023-11-05T14:20:00Z'
  },
  {
    id: '2',
    name: 'Manufacturing Equipment Upgrade',
    value: 120000,
    stage: 'negotiation',
    companyId: '2',
    contactId: '2',
    description: 'Upgrade of manufacturing equipment and training',
    closingDate: '2023-11-30T00:00:00Z',
    createdAt: '2023-07-15T11:45:00Z',
    updatedAt: '2023-10-20T16:30:00Z'
  },
  {
    id: '3',
    name: 'Fleet Management System',
    value: 95000,
    stage: 'qualified',
    companyId: '3',
    contactId: '3',
    description: 'Implementation of fleet tracking and management system',
    closingDate: '2024-01-20T00:00:00Z',
    createdAt: '2023-08-20T10:15:00Z',
    updatedAt: '2023-10-25T13:40:00Z'
  },
  {
    id: '4',
    name: 'R&D Partnership',
    value: 250000,
    stage: 'closed-won',
    companyId: '4',
    contactId: '4',
    description: 'Joint research and development project',
    closingDate: '2023-10-10T00:00:00Z',
    createdAt: '2023-05-25T14:30:00Z',
    updatedAt: '2023-10-10T09:15:00Z'
  },
  {
    id: '5',
    name: 'Healthcare Software License',
    value: 85000,
    stage: 'lead',
    companyId: '5',
    contactId: '5',
    description: 'Annual license for healthcare management software',
    closingDate: '2024-02-28T00:00:00Z',
    createdAt: '2023-10-01T08:45:00Z',
    updatedAt: '2023-10-30T15:20:00Z'
  },
  {
    id: '6',
    name: 'Cloud Migration Project',
    value: 180000,
    stage: 'closed-lost',
    companyId: '1',
    contactId: '6',
    description: 'Migration of on-premise systems to cloud infrastructure',
    closingDate: '2023-09-30T00:00:00Z',
    createdAt: '2023-04-15T13:10:00Z',
    updatedAt: '2023-09-30T11:45:00Z'
  }
];

export const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'deal_created',
    description: 'New deal created: Enterprise Software Implementation',
    timestamp: '2023-06-10T09:30:00Z',
    entityId: '1',
    entityType: 'deal'
  },
  {
    id: '2',
    type: 'company_created',
    description: 'New company added: Globex Industries',
    timestamp: '2023-02-10T10:15:00Z',
    entityId: '2',
    entityType: 'company'
  },
  {
    id: '3',
    type: 'contact_created',
    description: 'New contact added: Michael Brown',
    timestamp: '2023-03-25T10:10:00Z',
    entityId: '3',
    entityType: 'contact'
  },
  {
    id: '4',
    type: 'deal_updated',
    description: 'Deal status updated to Closed Won: R&D Partnership',
    timestamp: '2023-10-10T09:15:00Z',
    entityId: '4',
    entityType: 'deal'
  },
  {
    id: '5',
    type: 'deal_created',
    description: 'New deal created: Healthcare Software License',
    timestamp: '2023-10-01T08:45:00Z',
    entityId: '5',
    entityType: 'deal'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalDeals: 6,
  totalCompanies: 5,
  totalContacts: 6,
  dealsWon: 1,
  dealsLost: 1,
  totalRevenue: 805000
};

// Helper function to get company name by ID
export const getCompanyName = (companyId: string): string => {
  const company = mockCompanies.find(c => c.id === companyId);
  return company ? company.name : 'Unknown Company';
};

// Helper function to get contact full name by ID
export const getContactName = (contactId: string): string => {
  const contact = mockContacts.find(c => c.id === contactId);
  return contact ? `${contact.firstName} ${contact.lastName}` : 'Unknown Contact';
};

// Helper function to format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};
