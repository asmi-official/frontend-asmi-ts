import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HomeIcon,
  ArchiveX,
  Banknote,
  Settings,
  UserCircleIcon,
  LogOut,
  ChevronDown,
  Package,
} from 'lucide-react';
import React from 'react';

type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <HomeIcon size={20} />, path: '/dashboard' },
  { text: 'Stok Produk', icon: <ArchiveX size={20} />, path: '/product' },
  {
    text: 'Keuangan',
    icon: <Banknote size={20} />,
    path: '/keuangan',
  },
  {
    text: 'Pengaturan',
    icon: <Settings size={20} />,
    children: [
      { text: 'Profil', icon: <UserCircleIcon size={18} />, path: '/profil' },
      {
        text: 'Logout',
        icon: <LogOut size={18} />,
        path: '/logout',
      },
    ],
  },
];

type DashboardLayoutProps = {
  children: React.ReactNode;
  userName?: string;
};

export default function DashboardLayout({ children, userName = 'User' }: DashboardLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [activeMenu, setActiveMenu] = useState('Dashboard');
  const navigate = useNavigate();

  const toggleMenu = (text: string) => {
    setOpenMenus((prev) => ({ ...prev, [text]: !prev[text] }));
  };

  const handleMenuClick = (item: MenuItem) => {
    if (item.children) {
      toggleMenu(item.text);
    } else if (item.path) {
      setActiveMenu(item.text);
      navigate(item.path); // <- pindah halaman
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside
        className={`bg-gradient-to-b from-primary via-primary to-neutral shadow-2xl transition-all duration-300 ease-in-out ${
          drawerOpen ? 'w-72' : 'w-20'
        } relative`}
      >
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none"></div>

        {/* Header */}
        <div className="relative flex items-center justify-between p-6 h-20 border-b border-white/10">
          {drawerOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                <Package className="text-white" size={24} />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white block leading-none">
                  MY<span className="text-yellow-300">APPS</span>
                </span>
                <span className="text-xs text-white/60 font-medium">Professional</span>
              </div>
            </div>
          )}
          <button
            className={`p-2 rounded-lg bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all hover:scale-110 border border-white/20 ${
              !drawerOpen ? 'mx-auto' : ''
            }`}
            onClick={() => setDrawerOpen(!drawerOpen)}
          >
            {drawerOpen ? <ChevronLeftIcon size={18} /> : <ChevronRightIcon size={18} />}
          </button>
        </div>

        {/* User Profile Section */}
        {drawerOpen && (
          <div className="relative px-4 py-5 border-b border-white/10">
            <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-yellow-300 to-yellow-500 flex items-center justify-center text-neutral shadow-lg">
                <UserCircleIcon size={28} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{userName}</p>
                <p className="text-xs text-yellow-300 font-semibold uppercase tracking-wider">
                  Administrator
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="relative mt-6 px-4 space-y-2 pb-6">
          {menuItems.map((item) => (
            <div key={item.text}>
              <button
                className={`flex items-center w-full px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden ${
                  activeMenu === item.text && !item.children
                    ? 'bg-white text-primary shadow-xl shadow-black/20'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                } ${!drawerOpen ? 'justify-center' : 'justify-start'}`}
                onClick={() => handleMenuClick(item)}
              >
                {/* Active indicator */}
                {activeMenu === item.text && !item.children && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                )}

                <span
                  className={`${drawerOpen ? 'mr-3' : 'mr-0'} transition-all ${
                    activeMenu === item.text && !item.children ? 'scale-110' : ''
                  }`}
                >
                  {item.icon}
                </span>
                {drawerOpen && (
                  <span className="font-semibold flex-1 text-left text-sm tracking-wide">
                    {item.text}
                  </span>
                )}
                {item.children && drawerOpen && (
                  <span
                    className={`transition-transform duration-300 ${
                      openMenus[item.text] ? 'rotate-180' : ''
                    }`}
                  >
                    <ChevronDown size={16} />
                  </span>
                )}
              </button>

              {item.children && openMenus[item.text] && drawerOpen && (
                <div className="mt-2 ml-6 pl-4 border-l-2 border-white/20 space-y-1">
                  {item.children.map((child) => (
                    <button
                      key={child.text}
                      className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-all text-sm font-medium group ${
                        activeMenu === child.text
                          ? 'bg-white/10 text-white'
                          : 'text-white/70 hover:text-white hover:bg-white/5'
                      }`}
                      onClick={() => {
                        if (child.path) {
                          setActiveMenu(child.text);
                          navigate(child.path);
                        }
                      }}
                    >
                      <span
                        className={`mr-2 transition-all ${
                          activeMenu === child.text ? 'scale-110' : 'opacity-70'
                        }`}
                      >
                        {child.icon}
                      </span>
                      <span>{child.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm">
          <div className="text-gray-500 font-medium text-sm">
            Selamat Datang Kembali,{' '}
            <span className="text-gray-900 font-bold uppercase">{userName}</span>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md border-2 border-white ring-1 ring-gray-100">
              <UserCircle size={24} />
            </div> */}
          </div>
        </header>

        <div className="flex-1 overflow-auto p-2">
          <div className="mx-3">{children}</div>
        </div>
      </main>
    </div>
  );
}
