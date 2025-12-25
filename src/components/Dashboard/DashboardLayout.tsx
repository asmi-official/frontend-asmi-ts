import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Home as HomeIcon,
  Inventory2 as ArchiveXIcon,
  Inventory as InventoryIcon,
  // AttachMoney as BanknoteIcon,
  Settings as SettingsIcon,
  AccountCircle as UserCircleIcon,
  Logout as LogOutIcon,
  ExpandMore as ChevronDownIcon,
  AllInbox as PackageIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Folder as FolderIcon,
  QrCode as QrCodeScannerIcon,
  Construction as ConstructionIcon,
} from '@mui/icons-material';

import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  IconButton,
  Typography,
  Avatar,
} from '@mui/material';

type MenuItem = {
  text: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
};

const menuItems: MenuItem[] = [
  { text: 'Dashboard', icon: <HomeIcon />, path: '/dashboard' },
  { text: 'Stok Produk', icon: <ArchiveXIcon />, path: '/product' },
  { text: 'Order', icon: <InventoryIcon />, path: '/product' },
  // { text: 'Keuangan', icon: <BanknoteIcon />, path: '/keuangan' },
  { text: 'Generate QR', icon: <QrCodeScannerIcon />, path: '/messege' },
  { text: 'Gdrive', icon: <FolderIcon />, path: '/' },
  { text: 'Config Marketplace', icon: <ConstructionIcon />, path: '/' },
  {
    text: 'Setting',
    icon: <SettingsIcon />,
    children: [
      { text: 'Profil', icon: <UserCircleIcon />, path: '/profil' },
      { text: 'Logout', icon: <LogOutIcon />, path: '/logout' },
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
      navigate(item.path);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 240 : 60,
            boxSizing: 'border-box',
            bgcolor: '#7C2D3E',
            color: 'white',
            borderRight: '1px solid rgba(255,255,255,0.2)',
            transition: 'width 0.3s',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: drawerOpen ? 'space-between' : 'center',
            p: 2,
            height: 64,
          }}
        >
          {drawerOpen && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PackageIcon fontSize="large" />
              <Box>
                <Typography variant="h6" fontWeight="bold">
                  MY<span style={{ color: '#FFD700' }}>APPS</span>
                </Typography>
                <Typography variant="caption">Professional</Typography>
              </Box>
            </Box>
          )}
          <IconButton onClick={() => setDrawerOpen(!drawerOpen)} sx={{ color: 'white' }}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>

        {drawerOpen && (
          <Box sx={{ p: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                p: 1,
                bgcolor: 'rgba(255,255,255,0.1)',
                borderRadius: 2,
              }}
            >
              <Avatar sx={{ bgcolor: 'secondary.main' }}>
                <UserCircleIcon />
              </Avatar>
              <Box>
                <Typography variant="body2" fontWeight="bold">
                  {userName}
                </Typography>
                <Typography variant="caption" color="yellow">
                  Administrator
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        <List>
          {menuItems.map((item) => (
            <Box key={item.text}>
              <ListItemButton
                onClick={() => handleMenuClick(item)}
                selected={activeMenu === item.text && !item.children}
                sx={{ color: 'white' }} // icon ikut warna putih
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit', // icon ikut warna parent
                    minWidth: drawerOpen ? 40 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {drawerOpen && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      color: 'white', // teks putih
                      fontWeight: 'bold', // font tebal
                      variant: 'body1', // atau body2 sesuai kebutuhan
                    }}
                  />
                )}
                {item.children && drawerOpen && (
                  <ChevronDownIcon
                    sx={{
                      color: 'inherit', // panah ikut putih
                      transform: openMenus[item.text] ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: '0.3s',
                    }}
                  />
                )}
              </ListItemButton>

              {item.children && (
                <Collapse in={openMenus[item.text] && drawerOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.text}
                        sx={{ pl: 4, color: 'white' }}
                        selected={activeMenu === child.text}
                        onClick={() => {
                          if (child.path) {
                            setActiveMenu(child.text);
                            navigate(child.path);
                          }
                        }}
                      >
                        <ListItemIcon sx={{ color: 'inherit' }}>{child.icon}</ListItemIcon>
                        <ListItemText
                          primary={child.text}
                          primaryTypographyProps={{
                            color: 'white', // teks putih
                            variant: 'body2', // sesuai kebutuhan
                          }}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Drawer>

      {/* Main content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            height: 64,
            bgcolor: 'background.paper',
            borderBottom: '1px solid rgba(0,0,0,0.1)',
            px: 3,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Selamat Datang Kembali,{' '}
            <span style={{ fontWeight: 'bold', textTransform: 'uppercase', color: 'text.primary' }}>
              {userName}
            </span>
          </Typography>
        </Box>
        <Box sx={{ flex: 1, p: 2, overflow: 'auto' }}>{children}</Box>
      </Box>
    </Box>
  );
}
