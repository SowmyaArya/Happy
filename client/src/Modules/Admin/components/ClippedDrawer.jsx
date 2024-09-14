import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import CategoryIcon from '@mui/icons-material/Category';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CollectionsIcon from '@mui/icons-material/Collections';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FeedbackIcon from '@mui/icons-material/Feedback';
import Logo from '../../../Images/logo.png';
import PaidIcon from '@mui/icons-material/Paid';

const drawerWidth = 240;

export default function ClippedDrawer({ children }) {
  const [openCategory, setOpenCategory] = React.useState(false);
  const [openSubCategory, setOpenSubCategory] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleCategoryClick = () => {
    setOpenCategory(!openCategory);
  };
  const handleSubCategoryClick = () => {
    setOpenSubCategory(!openSubCategory);
  };
  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmed = window.confirm('Are you sure you want to log out?');
    if (confirmed) {
      // Clear the token from localStorage
      localStorage.removeItem('AdminToken');
      
      // Close the menu
      handleMenuClose();
      
      // Navigate to the admin login page
      navigate('/Admin/AdminLogin');
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, background: 'linear-gradient(to left, #009900, #19334d, #19334d)' }}>
        <Toolbar>
       
<img src={Logo} alt="Logo" style={{ width: '8%' }} />

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', overflow: 'hidden' }, // Prevent scrollbar
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'hidden' }}>
          <List style={{marginTop:'30px'}} >
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/dashboard">
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={handleCategoryClick}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Category" />
                {openCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/AddCategory">
                  <ListItemText primary="Add Category" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/ViewCategory">
                  <ListItemText primary="View Category" />
                </ListItemButton>
              </List>
            </Collapse>
            
            <ListItem disablePadding>
              <ListItemButton onClick={handleSubCategoryClick}>
                <ListItemIcon>
                  <CategoryIcon />
                </ListItemIcon>
                <ListItemText primary="Manage SubCategory" />
                {openSubCategory ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openSubCategory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/AddSubCategory">
                  <ListItemText primary="Add SubCategory" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/ViewSubcategory">
                  <ListItemText primary="View SubCategory" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton onClick={handleProductsClick}>
                <ListItemIcon>
                  <PostAddIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Products" />
                {openProducts ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={openProducts} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/AddProduct">
                  <ListItemText primary="Add Products" />
                </ListItemButton>
                <ListItemButton sx={{ pl: 4 }} component={Link} to="/Admin/ViewProduct/">
                  <ListItemText primary="View Products" />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/BookingsTable">
                <ListItemIcon>
                  <LocalShippingIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Orders" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/ManagePayment">
                <ListItemIcon>
                  <PaidIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Payment" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/Feedback">
                <ListItemIcon>
                  <FeedbackIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/BlogForm">
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Blogs" />
              </ListItemButton>
            </ListItem>
            {/* <ListItem disablePadding>
              <ListItemButton component={Link} to="/Admin/generateBill">
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Genrate Bill" />
              </ListItemButton>
            </ListItem> */}
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
