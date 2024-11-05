import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import PaymentsList from './PaymentsList';
import PaymentForm from './PaymentForm';
import type { PaymentRecord } from '../../types';

export default function PaymentsView() {
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);

  const handleAddPayment = (payment: Omit<PaymentRecord, 'id'>) => {
    setPayments([...payments, { ...payment, id: Date.now().toString() }]);
    setIsAddingPayment(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <button
          onClick={() => setIsAddingPayment(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Record Payment
        </button>
      </div>

      {isAddingPayment ? (
        <PaymentForm onSubmit={handleAddPayment} onCancel={() => setIsAddingPayment(false)} />
      ) : (
        <PaymentsList payments={payments} />
      )}
    </div>
  );
}