import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Scissors, 
  Calendar, 
  Users, 
  DollarSign, 
  BarChart3, 
  Settings, 
  Crown, 
  Menu,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
    color: "text-sidebar-primary"
  },
  {
    title: "Serviços",
    icon: Scissors,
    path: "/services",
    color: "text-sidebar-primary"
  },
  {
    title: "Agendamentos",
    icon: Calendar,
    path: "/appointments",
    color: "text-sidebar-primary"
  },
  {
    title: "Clientes",
    icon: Users,
    path: "/clients",
    color: "text-sidebar-primary"
  },
  {
    title: "Funcionários",
    icon: Crown,
    path: "/staff",
    color: "text-sidebar-primary"
  },
  {
    title: "Financeiro",
    icon: DollarSign,
    path: "/financial",
    color: "text-sidebar-primary"
  },
  {
    title: "Relatórios",
    icon: BarChart3,
    path: "/reports",
    color: "text-sidebar-primary"
  },
  {
    title: "Configurações",
    icon: Settings,
    path: "/settings",
    color: "text-sidebar-primary"
  }
];

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed top-0 left-0 z-50 h-full bg-sidebar border-r border-sidebar-border transition-all duration-300 lg:relative lg:z-auto",
        collapsed ? "w-16" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            {!collapsed && (
              <div>
                <h1 className="text-sidebar-foreground font-bold text-lg">BarberPro</h1>
                <p className="text-sidebar-foreground/70 text-xs">Sistema de Gestão</p>
              </div>
            )}
          </div>
          
          {/* Desktop Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="hidden lg:flex text-sidebar-foreground hover:bg-sidebar-accent/20"
            onClick={() => setCollapsed(!collapsed)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "sidebar-item w-full text-left",
                  isActive && "active",
                  collapsed && "justify-center px-2"
                )}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className={cn("h-5 w-5", item.color)} />
                {!collapsed && (
                  <span className="text-sidebar-foreground">{item.title}</span>
                )}
                {collapsed && isActive && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-sidebar-primary text-sidebar-primary-foreground text-sm rounded shadow-lg whitespace-nowrap">
                    {item.title}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
            <div className="w-8 h-8 bg-gradient-gold rounded-full flex items-center justify-center">
              <span className="text-secondary-foreground font-semibold text-sm">A</span>
            </div>
            {!collapsed && (
              <div>
                <p className="text-sidebar-foreground font-medium text-sm">Admin User</p>
                <p className="text-sidebar-foreground/70 text-xs">admin@barberpro.com</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}