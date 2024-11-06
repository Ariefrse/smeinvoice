import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { getCompany, updateCompany } from '../lib/api/company';
import type { Company } from '@prisma/client';

export default function CompanyProfile() {
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewCompany, setIsNewCompany] = useState(false);

  useEffect(() => {
    async function loadCompany() {
      try {
        const data = await getCompany();
        if (!data) {
          setIsNewCompany(true);
          setCompany({
            name: '',
            id: '',
            registrationNumber: '',
            sstNumber: '',
            address: '',
            email: '',
            phone: '',
            bankName: '',
            accountNumber: '',
            swiftCode: '',
            digitalSignature: null,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        } else {
          setCompany(data);
        }
      } catch (error) {
        console.error('Error loading company:', error);
      } finally {
        setLoading(false);
      }
    }
    loadCompany();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!company) return;

    try {
      const updated = await updateCompany({
        name: company.name,
        registrationNumber: company.registrationNumber,
        sstNumber: company.sstNumber,
        address: company.address,
        email: company.email,
        phone: company.phone,
        bankName: company.bankName,
        accountNumber: company.accountNumber,
        swiftCode: company.swiftCode,
        digitalSignature: company.digitalSignature,
      });
      setCompany(updated);
      setIsNewCompany(false);
      alert(isNewCompany ? 'Company profile created successfully' : 'Company profile updated successfully');
    } catch (error) {
      console.error('Error updating company:', error);
      alert(isNewCompany ? 'Failed to create company profile' : 'Failed to update company profile');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (!company) {
    return <div className="text-center text-red-600">Error loading company profile</div>;
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            {isNewCompany && (
              <p className="text-sm text-amber-600 mt-1">
                Please set up your company profile to continue
              </p>
            )}
          </div>
          <button
            type="submit"
            form="company-form"
            className="btn-primary"
          >
            <Save className="w-4 h-4 mr-2" />
            {isNewCompany ? 'Create Profile' : 'Save Changes'}
          </button>
        </div>

        <form id="company-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Company Name</label>
              <input
                type="text"
                value={company.name}
                onChange={(e) => setCompany({ ...company, name: e.target.value })}
                className="mt-1 block w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Registration Number</label>
              <input
                type="text"
                value={company.registrationNumber}
                onChange={(e) => setCompany({ ...company, registrationNumber: e.target.value })}
                className="mt-1 block w-full"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">SST Registration Number</label>
              <input
                type="text"
                value={company.sstNumber}
                onChange={(e) => setCompany({ ...company, sstNumber: e.target.value })}
                className="mt-1 block w-full"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Business Address</label>
            <textarea
              value={company.address}
              onChange={(e) => setCompany({ ...company, address: e.target.value })}
              rows={3}
              className="mt-1 block w-full"
              required
            />
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={company.email}
                  onChange={(e) => setCompany({ ...company, email: e.target.value })}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  value={company.phone}
                  onChange={(e) => setCompany({ ...company, phone: e.target.value })}
                  className="mt-1 block w-full"
                  required
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Bank Details</h2>
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                <input
                  type="text"
                  value={company.bankName}
                  onChange={(e) => setCompany({ ...company, bankName: e.target.value })}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Account Number</label>
                <input
                  type="text"
                  value={company.accountNumber}
                  onChange={(e) => setCompany({ ...company, accountNumber: e.target.value })}
                  className="mt-1 block w-full"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">SWIFT Code</label>
                <input
                  type="text"
                  value={company.swiftCode || ''}
                  onChange={(e) => setCompany({ ...company, swiftCode: e.target.value })}
                  className="mt-1 block w-full"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}