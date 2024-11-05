import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import CompanyProfile from './components/CompanyProfile';
import CustomersView from './components/customers/CustomersView';
import ProductsView from './components/products/ProductsView';
import InvoicesView from './components/invoices/InvoicesView';
import PaymentsView from './components/payments/PaymentsView';

function App() {
  const [currentView, setCurrentView] = useState('customers');

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {currentView === 'company' && <CompanyProfile />}
          {currentView === 'customers' && <CustomersView />}
          {currentView === 'products' && <ProductsView />}
          {currentView === 'invoices' && <InvoicesView />}
          {currentView === 'payments' && <PaymentsView />}
        </div>
      </main>
    </div>
  );
}

export default App;