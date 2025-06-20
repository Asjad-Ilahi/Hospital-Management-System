// src/components/Layout/Sidebar/Sidebar.js
import React, { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import ReceiptIcon from '@mui/icons-material/Receipt';
import GroupIcon from '@mui/icons-material/Group';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // For Nurses
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../../Context/UserContext';
import styles from './Sidebar.module.css';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('xs')]: { width: 0 },
  [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function Sidebar({ open, handleDrawerClose, handleDrawerOpen }) {
  const { isLoggedIn, currentUser, signOutUser } = useContext(UserContext);
  const theme = useTheme();
  const location = useLocation();
  const selectedItem = location.pathname.split('/')[1];

  const handleMouseLeavesDrawer = () => {
    handleDrawerClose();
  };

  return (
    <Drawer
      className={styles.sidebar}
      variant="permanent"
      open={open}
      onMouseEnter={handleDrawerOpen}
      onMouseLeave={handleMouseLeavesDrawer}
      PaperProps={{ sx: { backgroundColor: '#31b372', color: 'white' } }}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          <MenuIcon style={{ color: '#fff' }} />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={NavLink}
            to="/"
            style={{ textDecoration: 'none', color: 'white' }}
            selected={!selectedItem}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              "&.Mui-selected": { backgroundColor: "#1b4f32" },
              "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
              <DashboardOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem key="Appointments" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={NavLink}
            to="/appointments"
            style={{ textDecoration: 'none', color: 'white' }}
            selected={selectedItem === "appointments"}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              "&.Mui-selected": { backgroundColor: "#1b4f32" },
              "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
              <CalendarTodayOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Appointments" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem key="Prescriptions" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={NavLink}
            to="/prescriptions"
            style={{ textDecoration: 'none', color: 'white' }}
            selected={selectedItem === "prescriptions"}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              "&.Mui-selected": { backgroundColor: "#1b4f32" },
              "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="Prescriptions" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        {currentUser.userType === "Patient" && (
          <ListItem key="Book A Nurse" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to="/nurses/book"
              style={{ textDecoration: 'none', color: 'white' }}
              selected={selectedItem === "nurses" && location.pathname.includes("book")}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                "&.Mui-selected": { backgroundColor: "#1b4f32" },
                "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                <MedicalServicesIcon />
              </ListItemIcon>
              <ListItemText primary="Book A Nurse" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        )}

        {(currentUser.userType === "Admin" || currentUser.userType === "Doctor") && (
          <ListItem key="Medicines" disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              component={NavLink}
              to="/medicines"
              style={{ textDecoration: 'none', color: 'white' }}
              selected={selectedItem === "medicines"}
              sx={{
                minHeight: 48,
                justifyContent: open ? 'initial' : 'center',
                px: 2.5,
                "&.Mui-selected": { backgroundColor: "#1b4f32" },
                "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
              }}
            >
              <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                <VaccinesIcon />
              </ListItemIcon>
              <ListItemText primary="Medicines" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        )}

        {currentUser.userType === "Admin" && <Divider />}

        {currentUser.userType === "Admin" && (
          <>
            <ListItem key="Users" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to="/users"
                style={{ textDecoration: 'none', color: 'white' }}
                selected={selectedItem === "users"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  "&.Mui-selected": { backgroundColor: "#1b4f32" },
                  "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                  <GroupIcon />
                </ListItemIcon>
                <ListItemText primary="Users" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="Patients" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to="/patients"
                style={{ textDecoration: 'none', color: 'white' }}
                selected={selectedItem === "patients"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  "&.Mui-selected": { backgroundColor: "#1b4f32" },
                  "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                  <AccessibleForwardIcon />
                </ListItemIcon>
                <ListItemText primary="Patients" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="Doctors" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to="/doctors"
                style={{ textDecoration: 'none', color: 'white' }}
                selected={selectedItem === "doctors"}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  "&.Mui-selected": { backgroundColor: "#1b4f32" },
                  "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                  <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Doctors" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>

            <ListItem key="Nurses" disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                component={NavLink}
                to="/nurses"
                style={{ textDecoration: 'none', color: 'white' }}
                selected={selectedItem === "nurses" && !location.pathname.includes("book")}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  "&.Mui-selected": { backgroundColor: "#1b4f32" },
                  "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
                  <MedicalServicesIcon />
                </ListItemIcon>
                <ListItemText primary="Nurses" sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          </>
        )}

       
      </List>

      <Divider />
      <List>
        <ListItem key="Profile" disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            component={NavLink}
            to="/profile"
            style={{ textDecoration: 'none', color: 'white' }}
            selected={selectedItem === "profile"}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
              "&.Mui-selected": { backgroundColor: "#1b4f32" },
              "&.Mui-selected:hover": { backgroundColor: "#1b4f32" },
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>

      <Divider />
      <List>
        <ListItem key="Logout" disablePadding sx={{ display: 'block' }} onClick={signOutUser}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center', color: '#fff' }}>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}