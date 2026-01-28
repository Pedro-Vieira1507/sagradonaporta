import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, LogOut, Home, Building2, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const baseMenuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Package, label: 'Produtos', path: '/admin/produtos' },
  { icon: ShoppingCart, label: 'Pedidos', path: '/admin/pedidos' },
];

const superadminMenuItems = [
  { icon: Building2, label: 'Empresas', path: '/admin/empresas' },
  { icon: Users, label: 'Usuários', path: '/admin/usuarios' },
];

export const AdminSidebar = () => {
  const location = useLocation();
  const { signOut, isSuperadmin } = useAuth();

  const menuItems = isSuperadmin 
    ? [...baseMenuItems, ...superadminMenuItems]
    : baseMenuItems;

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border">
      <div className="p-6">
        <h1 className="text-xl font-bold text-primary">Admin Panel</h1>
        {isSuperadmin && (
          <Badge className="mt-2 bg-purple-500 hover:bg-purple-600">
            Superadmin
          </Badge>
        )}
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-4 left-4 right-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-start gap-3"
          asChild
        >
          <Link to="/">
            <Home className="h-5 w-5" />
            Voltar ao Site
          </Link>
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground"
          onClick={signOut}
        >
          <LogOut className="h-5 w-5" />
          Sair
        </Button>
      </div>
    </aside>
  );
};
