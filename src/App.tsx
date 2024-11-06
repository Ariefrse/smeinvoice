import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import CompanyProfile from './components/CompanyProfile';
import CustomersView from './components/customers/CustomersView';
import ProductsView from './components/products/ProductsView';
import InvoicesView from './components/invoices/InvoicesView';
import PaymentsView from './components/payments/PaymentsView';
import ReportsView from './components/reports/ReportsView';
import { LoginPage } from './components/auth/LoginPage';
import { LoadingSpinner } from './components/auth/LoadingSpinner';
import { useAuth } from './context/AuthContext';

function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-6 py-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  // Show loading spinner while auth state is being determined
  if (loading) {
    return <LoadingSpinner />;
  }
  
  // Only redirect if we're sure there's no user (loading is false)
  if (user) {
    return <Navigate to="/" replace />;
  }
  
  return <ProtectedLayout>{children}</ProtectedLayout>;
}

function App() {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      <Route 
        path="/login" 
        element={
          loading ? (
            <LoadingSpinner />
          ) : user ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          )
        } 
      />
      <Route path="/" element={
        <ProtectedRoute>
          <CompanyProfile />
        </ProtectedRoute>
      } />
      <Route path="/company" element={
        <ProtectedRoute>
          <CompanyProfile />
        </ProtectedRoute>
      } />
      <Route path="/customers" element={
        <ProtectedRoute>
          <CustomersView />
        </ProtectedRoute>
      } />
      <Route path="/products" element={
        <ProtectedRoute>
          <ProductsView />
        </ProtectedRoute>
      } />
      <Route path="/invoices" element={
        <ProtectedRoute>
          <InvoicesView />
        </ProtectedRoute>
      } />
      <Route path="/payments" element={
        <ProtectedRoute>
          <PaymentsView />
        </ProtectedRoute>
      } />
      <Route path="/reports" element={
        <ProtectedRoute>
          <ReportsView />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;
