import React from 'react';
import { Eye, FileEdit, Printer, MoreHorizontal } from 'lucide-react';
import type { Invoice } from '../../types';

interface InvoicesListProps {
  invoices: Invoice[];
}

const statusColors = {
  draft: 'bg-gray-100 text-gray-800',
  issued: 'bg-blue-100 text-blue-800',
  paid: 'bg-green-100 text-green-800',
  overdue: 'bg-red-100 text-red-800',
  cancelled: 'bg-yellow-100 text-yellow-800',
};

export default function InvoicesList({ invoices }: InvoicesListProps) {
  if (invoices.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No invoices created yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {invoices.map((invoice) => (
            <tr key={invoice.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="text-sm font-medium text-gray-900">#{invoice.invoiceNumber}</div>
                <div className="text-sm text-gray-500">{invoice.issueDate}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-900">
                {/* TODO: Replace with actual customer name */}
                Customer Name
              </td>
              <td className="px-6 py-4">
                <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${statusColors[invoice.status]}`}>
                  {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                </span>
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                RM {invoice.total.toFixed(2)}
              </td>
              <td className="px-6 py-4 text-right text-sm text-gray-900">
                {invoice.dueDate}
              </td>
              <td className="px-6 py-4 text-right text-sm font-medium space-x-2">
                <button className="text-blue-600 hover:text-blue-900">
                  <Eye className="w-4 h-4" />
                </button>
                <button className="text-blue-600 hover:text-blue-900">
                  <FileEdit className="w-4 h-4" />
                </button>
                <button className="text-blue-600 hover:text-blue-900">
                  <Printer className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-gray-500">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}