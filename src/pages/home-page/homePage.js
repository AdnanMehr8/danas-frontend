
// import React, { useState } from 'react';
// import { Box, CssBaseline, Drawer, List, ListItem, ListItemText, AppBar, Toolbar, Typography } from '@mui/material';
// import CategoryProductList from '../../components/CategoryProductList';


// // Mock Components for the content area
// const HomeComponent = () => <Typography variant="h4">Home Content</Typography>;
// const BatchRecordsComponent = () => <Typography variant="h4">Batch Records Content</Typography>;
// const ReportsComponent = () => <Typography variant="h4">Reports Content</Typography>;

// const Home = () => {
//   const [selectedComponent, setSelectedComponent] = useState(<HomeComponent />);

//   // Sidebar items
//   const sidebarItems = [
//     { text: 'Items-Categories', component: <CategoryProductList /> },
//     { text: 'Batch Records', component: <BatchRecordsComponent /> },
//     { text: 'Reports', component: <ReportsComponent /> },
//   ];

//   const handleListItemClick = (component) => {
//     setSelectedComponent(component);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
//         <Toolbar>
//           <Typography variant="h6" noWrap component="div">
//             Batch Manufacturing Dashboard
//           </Typography>
//         </Toolbar>
//       </AppBar>
//       <Drawer
//         variant="permanent"
//         sx={{
//           width: 240,
//           flexShrink: 0,
//           [`& .MuiDrawer-paper`]: { width: 240, boxSizing: 'border-box' },
//         }}
//       >
//         <Toolbar />
//         <Box sx={{ overflow: 'auto' }}>
//           <List>
//             {sidebarItems.map((item, index) => (
//               <ListItem button key={index} onClick={() => handleListItemClick(item.component)}>
//                 <ListItemText primary={item.text} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>
//       <Box
//         component="main"
//         sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, ml: '240px' }}
//       >
//         <Toolbar />
//         {selectedComponent}
//       </Box>
//     </Box>
//   );
// };

// export default Home;
import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';
import CategoryProductList from '../../components/CategoryProductList';
import DraggableList from '../../components/practiceDrag';
import EquipmentTable from '../../components/Machines';
import Categories from '../../components/Categories';

// Mock Components for the content area
const HomeComponent = () => <Typography variant="h4">Home Content</Typography>;
const BatchRecordsComponent = () => <Typography variant="h4">Batch Records Content</Typography>;
const ReportsComponent = () => <Typography variant="h4">Reports Content</Typography>;

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState(<HomeComponent />);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);

  // Sidebar items
  const sidebarItems = [
    { text: 'Categories', component: <Categories /> },
    { text: 'Products', component: <CategoryProductList /> },
    { text: 'Processes', component: <DraggableList /> },
    { text: 'Machines', component: <EquipmentTable /> },
    { text: 'Batch Records', component: <BatchRecordsComponent /> },
    { text: 'Reports', component: <ReportsComponent /> },
  ];

  const handleListItemClick = (component) => {
    setSelectedComponent(component);
    if (!drawerOpen) setDrawerOpen(true); // Open drawer when selecting an item
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => setDrawerOpen(!drawerOpen)}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Batch Manufacturing Dashboard
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuClick}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? '240px' : '0',
          flexShrink: 0,
          transition: 'width .3s',
          overflowX: 'hidden',
        }}
      >
        <Toolbar />
        <Box sx={{ overflowY: 'auto', width: drawerOpen ? '240px' : '0' }}>
          <List>
            {sidebarItems.map((item, index) => (
              <ListItem button key={index} onClick={() => handleListItemClick(item.component)}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
          transition: 'margin-left .3s',
          ml: drawerOpen ? '0' : '0', // Adjust margin based on drawer state
          
        }}
      >
        <Toolbar />
        {selectedComponent}
      </Box>
    </Box>
  );
};

export default Home;
