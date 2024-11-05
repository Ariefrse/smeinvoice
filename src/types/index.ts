export interface Company {
  name: string;
  registrationNumber: string;
  sstNumber: string;
  address: string;
  contact: {
    email: string;
    phone: string;
  };
  bankDetails: {
    bankName: string;
    accountNumber: string;
    swiftCode: string;
  };
  digitalSignature?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff';
  permissions: string[];
}

export interface Customer {
  id: string;
  companyName: string;
  registrationNumber: string;
  contactPerson: string;
  address: string;
  email: string;
  phone: string;
  category: 'regular' | 'one-time';
  creditTerms?: number;
  paymentHistory?: PaymentRecord[];
}

export interface PaymentRecord {
  id: string;
  date: string;
  amount: number;
  method: string;
  reference: string;
}

export interface Product {
  id: string;
  code: string;
  name: string;
  description: string;
  unitPrice: number;
  sstRate: number;
  category: string;
  unit: string;
  stock?: number;
  minimumStock?: number;
}

export interface InvoiceItem {
  id: string;
  productId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  sstRate: number;
  discount?: number;
  total: number;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  customerId: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  totalSST: number;
  totalDiscount: number;
  total: number;
  status: 'draft' | 'issued' | 'paid' | 'overdue' | 'cancelled';
  notes?: string;
  paymentTerms?: string;
}