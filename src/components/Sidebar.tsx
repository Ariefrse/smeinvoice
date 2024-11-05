import React from 'react';
import { Settings, Users, FileText, BarChart3, Package, CreditCard } from 'lucide-react';

const menuItems = [
  { id: 'company', icon: Settings, label: 'Company Profile' },
  { id: 'customers', icon: Users, label: 'Customers' },
  { id: 'products', icon: Package, label: 'Products' },
  { id: 'invoices', icon: FileText, label: 'Invoices' },
  { id: 'payments', icon: CreditCard, label: 'Payments' },
  { id: 'reports', icon: BarChart3, label: 'Reports' },
];

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export default function Sidebar({ currentView, onViewChange }: SidebarProps) {
  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800">InvoiceHub</h2>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 group ${
                  currentView === item.id ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 transition duration-75 ${
                  currentView === item.id ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'
                }`} />
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}