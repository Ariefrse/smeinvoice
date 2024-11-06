
import { useNavigate, useLocation } from 'react-router-dom';
import { Settings, Users, FileText, BarChart3, Package, CreditCard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const menuItems = [
  { id: 'company', path: '/company', icon: Settings, label: 'Company Profile' },
  { id: 'customers', path: '/customers', icon: Users, label: 'Customers' },
  { id: 'products', path: '/products', icon: Package, label: 'Products' },
  { id: 'invoices', path: '/invoices', icon: FileText, label: 'Invoices' },
  { id: 'payments', path: '/payments', icon: CreditCard, label: 'Payments' },
  { id: 'reports', path: '/reports', icon: BarChart3, label: 'Reports' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full px-3 py-4 overflow-y-auto flex flex-col">
        <div className="mb-8 px-4">
          <h2 className="text-2xl font-bold text-gray-800">InvoiceHub</h2>
        </div>
        <ul className="space-y-2 flex-grow">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => navigate(item.path)}
                className={`flex items-center w-full p-2 rounded-lg hover:bg-gray-100 group ${
                  location.pathname === item.path ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                }`}
              >
                <item.icon className={`w-5 h-5 transition duration-75 ${
                  location.pathname === item.path ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'
                }`} />
                <span className="ml-3">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={handleSignOut}
          className="flex items-center w-full p-2 mt-4 rounded-lg text-gray-700 hover:bg-gray-100 group"
        >
          <LogOut className="w-5 h-5 text-gray-500 group-hover:text-gray-900" />
          <span className="ml-3">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}
