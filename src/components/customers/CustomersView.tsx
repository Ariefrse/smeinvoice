import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import CustomersList from './CustomersList';
import CustomerForm from './CustomerForm';
import { getCustomers, createCustomer, deleteCustomer } from '../../lib/api/customers';
import type { Customer } from '@prisma/client';

export default function CustomersView() {
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);

  async function loadCustomers() {
    try {
      const data = await getCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error loading customers:', error);
    } finally {
      setLoading(false);
    }
  }

  const handleAddCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await createCustomer(customerData);
      await loadCustomers();
      setIsAddingCustomer(false);
    } catch (error) {
      console.error('Error creating customer:', error);
      alert('Failed to create customer');
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    if (!confirm('Are you sure you want to delete this customer?')) return;
    
    try {
      await deleteCustomer(id);
      await loadCustomers();
    } catch (error) {
      console.error('Error deleting customer:', error);
      alert('Failed to delete customer');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
        <button
          onClick={() => setIsAddingCustomer(true)}
          className="btn-primary"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Customer
        </button>
      </div>

      {isAddingCustomer ? (
        <CustomerForm onSubmit={handleAddCustomer} onCancel={() => setIsAddingCustomer(false)} />
      ) : (
        <CustomersList customers={customers} onDelete={handleDeleteCustomer} />
      )}
    </div>
  );
}