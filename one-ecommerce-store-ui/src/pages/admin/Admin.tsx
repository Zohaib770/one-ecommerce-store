import AdminLayout from '../../components/admin/AdminLayout';
import DashboardStats from '../../components/admin/DashboardStats';
import ProductManagement from '../../components/admin/ProductManagement';
import OrderManagement from '../../components/admin/OrderManagement';
import UserManagement from '../../components/admin/UserManagement';
import SalesChart from '../../components/admin/SalesChart';
import RecentActivity from '../../components/admin/RecentActivity';
import { useAdmin } from '../../context/AdminContext';

const Admin = () => {
  const { activeTab } = useAdmin();

  const renderTabContent = () => {
    switch (activeTab) {
      case 'products':
        return <ProductManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'users':
        return <UserManagement />;
      default:
        return (
          <>
            <DashboardStats />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              <div className="lg:col-span-2">
                <SalesChart />
              </div>
              <div>
                <RecentActivity />
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <AdminLayout>
      {renderTabContent()}
    </AdminLayout>
  );
};

export default Admin;