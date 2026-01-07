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
  Tooltip,
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
  { text: 'Order', icon: <InventoryIcon />, path: '/order' },
  // { text: 'Keuangan', icon: <BanknoteIcon />, path: '/keuangan' },
  { text: 'Generate QR', icon: <QrCodeScannerIcon />, path: '/messege' },
  { text: 'Gdrive', icon: <FolderIcon />, path: '/gdrive' },
  { text: 'Config Marketplace', icon: <ConstructionIcon />, path: '/config-marketplace' },
  {
    text: 'Setting',
    icon: <SettingsIcon />,
    children: [
      { text: 'Profil', icon: <UserCircleIcon />, path: '/profile' },
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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? 280 : 72,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerOpen ? 280 : 72,
            boxSizing: 'border-box',
            background: 'linear-gradient(180deg, #7C2D3E 0%, #5f0000 100%)',
            color: 'white',
            borderRight: 'none',
            boxShadow: '4px 0 24px rgba(139, 0, 0, 0.3)',
            transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          },
        }}
      >
        {/* Header Logo */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: drawerOpen ? 'space-between' : 'center',
            p: drawerOpen ? 3 : 2,
            height: 80,
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '1px',
              background:
                'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
            },
          }}
        >
          {drawerOpen && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
              <Box
                sx={{
                  width: 42,
                  height: 42,
                  borderRadius: 2,
                  background: 'rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <PackageIcon sx={{ fontSize: 26, color: 'white' }} />
              </Box>
              <Box>
                <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.5px' }}>
                  ASMI
                  <span style={{ color: '#ff6b6b', marginLeft: 4 }}>SYSTEM</span>
                </Typography>
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  Professional Dashboard
                </Typography>
              </Box>
            </Box>
          )}
          {!drawerOpen && (
            <Box
              sx={{
                width: 42,
                height: 42,
                borderRadius: 2,
                background: 'rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <PackageIcon sx={{ fontSize: 26, color: 'white' }} />
            </Box>
          )}
          <Tooltip title={drawerOpen ? 'Collapse' : 'Expand'} placement="right">
            <IconButton
              onClick={() => setDrawerOpen(!drawerOpen)}
              sx={{
                color: 'white',
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                width: 32,
                height: 32,
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  transform: 'scale(1.1)',
                },
                transition: 'all 0.2s ease-in-out',
              }}
            >
              {drawerOpen ? (
                <ChevronLeftIcon fontSize="small" />
              ) : (
                <ChevronRightIcon fontSize="small" />
              )}
            </IconButton>
          </Tooltip>
        </Box>

        {/* User Profile Card */}
        {drawerOpen && (
          <Box sx={{ p: 3, pb: 2 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                p: 2,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                position: 'relative',
                overflow: 'hidden',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background:
                    'linear-gradient(90deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.6))',
                },
              }}
            >
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 44,
                  height: 44,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <UserCircleIcon sx={{ color: 'white' }} />
              </Avatar>
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="body2"
                  fontWeight={700}
                  sx={{
                    color: 'white',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {userName}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.8)',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                  }}
                >
                  ADMINISTRATOR
                </Typography>
              </Box>
            </Box>
          </Box>
        )}

        {!drawerOpen && (
          <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
            <Tooltip title={`${userName} (Administrator)`} placement="right">
              <Avatar
                sx={{
                  bgcolor: 'rgba(255, 255, 255, 0.2)',
                  width: 40,
                  height: 40,
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                }}
              >
                <UserCircleIcon sx={{ color: 'white' }} />
              </Avatar>
            </Tooltip>
          </Box>
        )}

        {/* Navigation Menu */}
        <List sx={{ px: 2, py: 1 }}>
          {menuItems.map((item) => (
            <Box key={item.text}>
              <Tooltip title={!drawerOpen ? item.text : ''} placement="right">
                <ListItemButton
                  onClick={() => handleMenuClick(item)}
                  selected={activeMenu === item.text && !item.children}
                  sx={{
                    color: 'white',
                    borderRadius: 2,
                    mb: 0.5,
                    px: drawerOpen ? 2 : 1.5,
                    py: 1.2,
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 0,
                      bgcolor: 'white',
                      transition: 'width 0.3s ease',
                    },
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 0.15)',
                      color: 'white',
                      transform: 'translateX(4px)',
                      '&::before': {
                        width: '4px',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                        transform: 'scale(1.1)',
                      },
                    },
                    '&.Mui-selected': {
                      bgcolor: 'rgba(255, 255, 255, 0.25)',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                      '&::before': {
                        width: '4px',
                      },
                      '& .MuiListItemIcon-root': {
                        color: 'white',
                      },
                      '&:hover': {
                        bgcolor: 'rgba(255, 255, 255, 0.3)',
                      },
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      color: 'inherit',
                      minWidth: drawerOpen ? 40 : 'auto',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  {drawerOpen && (
                    <ListItemText
                      primary={item.text}
                      primaryTypographyProps={{
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        letterSpacing: '0.3px',
                        color: 'inherit',
                      }}
                    />
                  )}
                  {item.children && drawerOpen && (
                    <ChevronDownIcon
                      sx={{
                        color: 'inherit',
                        transform: openMenus[item.text] ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        fontSize: 20,
                      }}
                    />
                  )}
                </ListItemButton>
              </Tooltip>

              {/* Submenu */}
              {item.children && (
                <Collapse
                  in={openMenus[item.text] && drawerOpen}
                  timeout={{ enter: 400, exit: 300 }}
                  unmountOnExit
                >
                  <List component="div" disablePadding sx={{ mt: 0.5 }}>
                    {item.children.map((child) => (
                      <ListItemButton
                        key={child.text}
                        sx={{
                          pl: 5,
                          pr: 2,
                          py: 1,
                          color: 'white',
                          borderRadius: 2,
                          mb: 0.5,
                          ml: 1,
                          position: 'relative',
                          transition: 'all 0.2s ease',
                          '&::before': {
                            content: '""',
                            position: 'absolute',
                            left: 20,
                            top: '50%',
                            transform: 'translateY(-50%)',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            transition: 'all 0.2s ease',
                          },
                          '&:hover': {
                            bgcolor: 'rgba(255, 255, 255, 0.1)',
                            color: 'white',
                            transform: 'translateX(4px)',
                            '&::before': {
                              bgcolor: 'white',
                              transform: 'translateY(-50%) scale(1.3)',
                            },
                          },
                          '&.Mui-selected': {
                            bgcolor: 'rgba(255, 255, 255, 0.2)',
                            color: 'white',
                            '&::before': {
                              bgcolor: 'white',
                              transform: 'translateY(-50%) scale(1.3)',
                            },
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.25)',
                            },
                          },
                        }}
                        selected={activeMenu === child.text}
                        onClick={() => {
                          if (child.path) {
                            setActiveMenu(child.text);
                            navigate(child.path);
                          }
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            color: 'inherit',
                            minWidth: 36,
                            transition: 'transform 0.2s ease',
                          }}
                        >
                          {child.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={child.text}
                          primaryTypographyProps={{
                            fontSize: '0.85rem',
                            fontWeight: 500,
                            letterSpacing: '0.2px',
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
        {/* Top Header Bar */}
        <Box
          sx={{
            height: 70,
            background: 'linear-gradient(135deg, #7C2D3E 0%, #a52a2a 100%)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            px: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 4px 12px rgba(139, 0, 0, 0.2)',
            position: 'sticky',
            top: 0,
            zIndex: 100,
          }}
        >
          <Box>
            <Typography variant="body2" sx={{ mb: 0.5, color: 'rgba(255, 255, 255, 0.8)' }}>
              Selamat Datang Kembali,
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.5px',
              }}
            >
              {userName}
            </Typography>
          </Box>
        </Box>

        {/* Main Content Area */}
        <Box
          sx={{
            flex: 1,
            p: 3,
            overflow: 'auto',
            bgcolor: '#f5f7fa',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
