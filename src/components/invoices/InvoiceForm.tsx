import React, { useState } from 'react';
import { Plus, Minus, X } from 'lucide-react';
import type { Invoice, InvoiceItem } from '../../types';

interface InvoiceFormProps {
  onSubmit: (invoice: Omit<Invoice, 'id'>) => void;
  onCancel: () => void;
  initialData?: Invoice;
}

export default function InvoiceForm({ onSubmit, onCancel, initialData }: InvoiceFormProps) {
  const [formData, setFormData] = useState<Omit<Invoice, 'id'>>({
    invoiceNumber: initialData?.invoiceNumber || generateInvoiceNumber(),
    customerId: initialData?.customerId || '',
    issueDate: initialData?.issueDate || new Date().toISOString().split('T')[0],
    dueDate: initialData?.dueDate || '',
    items: initialData?.items || [],
    subtotal: initialData?.subtotal || 0,
    totalSST: initialData?.totalSST || 0,
    totalDiscount: initialData?.totalDiscount || 0,
    total: initialData?.total || 0,
    status: initialData?.status || 'draft',
    notes: initialData?.notes || '',
    paymentTerms: initialData?.paymentTerms || '',
  });

  const handleAddItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      productId: '',
      description: '',
      quantity: 1,
      unitPrice: 0,
      sstRate: 0,
      total: 0,
    };
    setFormData({
      ...formData,
      items: [...formData.items, newItem],
    });
  };

  const handleRemoveItem = (itemId: string) => {
    setFormData({
      ...formData,
      items: formData.items.filter(item => item.id !== itemId),
    });
  };

  const handleItemChange = (itemId: string, changes: Partial<InvoiceItem>) => {
    setFormData({
      ...formData,
      items: formData.items.map(item => 
        item.id === itemId ? { ...item, ...changes } : item
      ),
    });
  };

  const calculateTotals = () => {
    const subtotal = formData.items.reduce((sum, item) => sum + item.total, 0);
    const totalSST = formData.items.reduce((sum, item) => 
      sum + (item.total * item.sstRate / 100), 0
    );
    const totalDiscount = formData.items.reduce((sum, item) => 
      sum + (item.discount || 0), 0
    );
    const total = subtotal + totalSST - totalDiscount;

    setFormData(prev => ({
      ...prev,
      subtotal,
      totalSST,
      totalDiscount,
      total,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculateTotals();
    onSubmit(formData);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {initialData ? 'Edit Invoice' : 'Create New Invoice'}
        </h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Invoice Number
            </label>
            <input
              type="text"
              required
              value={formData.invoiceNumber}
              readOnly
              className="mt-1 block w-full bg-gray-50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Issue Date
            </label>
            <input
              type="date"
              required
              value={formData.issueDate}
              onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
              className="mt-1 block w-full"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Items
          </label>
          <div className="space-y-4">
            {formData.items.map((item) => (
              <div key={item.id} className="flex items-start space-x-4">
                <div className="flex-1 grid grid-cols-6 gap-4">
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Description"
                      value={item.description}
                      onChange={(e) => handleItemChange(item.id, { description: e.target.value })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      placeholder="Quantity"
                      value={item.quantity}
                      onChange={(e) => handleItemChange(item.id, { 
                        quantity: parseInt(e.target.value),
                        total: parseInt(e.target.value) * item.unitPrice
                      })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Unit Price"
                      value={item.unitPrice}
                      onChange={(e) => handleItemChange(item.id, { 
                        unitPrice: parseFloat(e.target.value),
                        total: item.quantity * parseFloat(e.target.value)
                      })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.1"
                      placeholder="SST Rate %"
                      value={item.sstRate}
                      onChange={(e) => handleItemChange(item.id, { sstRate: parseFloat(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <input
                      type="number"
                      step="0.01"
                      placeholder="Total"
                      value={item.total}
                      readOnly
                      className="w-full bg-gray-50"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-600 hover:text-red-900"
                >
                  <Minus className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddItem}
            className="mt-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="mt-1 block w-full"
              placeholder="Additional notes..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Terms
            </label>
            <textarea
              value={formData.paymentTerms}
              onChange={(e) => setFormData({ ...formData, paymentTerms: e.target.value })}
              rows={3}
              className="mt-1 block w-full"
              placeholder="Payment terms and conditions..."
            />
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-500">Subtotal:</span>
              <span className="text-gray-900">RM {formData.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-500">Total SST:</span>
              <span className="text-gray-900">RM {formData.totalSST.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="font-medium text-gray-500">Total Discount:</span>
              <span className="text-gray-900">RM {formData.totalDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span className="text-gray-900">Total:</span>
              <span className="text-gray-900">RM {formData.total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {initialData ? 'Update Invoice' : 'Create Invoice'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

function generateInvoiceNumber() {
  const prefix = 'INV';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `${prefix}${timestamp}${random}`;
}