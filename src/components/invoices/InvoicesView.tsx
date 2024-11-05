import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import InvoicesList from './InvoicesList';
import InvoiceForm from './InvoiceForm';
import type { Invoice } from '../../types';

export default function InvoicesView() {
  const [isCreatingInvoice, setIsCreatingInvoice] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  const handleCreateInvoice = (invoice: Omit<Invoice, 'id'>) => {
    setInvoices([...invoices, { ...invoice, id: Date.now().toString() }]);
    setIsCreatingInvoice(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
        <button
          onClick={() => setIsCreatingInvoice(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Invoice
        </button>
      </div>

      {isCreatingInvoice ? (
        <InvoiceForm onSubmit={handleCreateInvoice} onCancel={() => setIsCreatingInvoice(false)} />
      ) : (
        <InvoicesList invoices={invoices} />
      )}
    </div>
  );
}