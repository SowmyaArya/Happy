// import React from 'react';
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import Tooltip from '@mui/material/Tooltip';
// import MenuItem from '@mui/material/MenuItem';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import Logo from '../../../Images/logo.png';

// function Appbar() {
//   const [anchorElNav, setAnchorElNav] = React.useState(null);
//   const [anchorElUser, setAnchorElUser] = React.useState(null);
//   const [isLoggedIn, setIsLoggedIn] = React.useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   React.useEffect(() => {
//     const token = localStorage.getItem('userToken');
//     setIsLoggedIn(!!token);
//   }, [location]);

//   const handleOpenNavMenu = (event) => {
//     setAnchorElNav(event.currentTarget);
//   };

//   const handleOpenUserMenu = (event) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('userToken'); // Remove userToken from local storage
//     localStorage.removeItem('userId'); // Remove userId from local storage
//     setIsLoggedIn(false);
//     navigate('/'); // Redirect to login page or homepage
//   };

//   const userId = localStorage.getItem('userId'); // Get userId from local storage

//   const pages = [
//     { title: 'Home', path: '/' },
//     { title: 'About us', path: '/AboutUs' },
//     { title: 'Products', path: '/About' },
//     { title: 'Blog', path: '/Blogform' },
//     { title: 'Order Status', path: `/OrderStatus/${userId}` }, // Dynamic link
//   ];

//   const settings = [
//     { title: 'Register', path: '/Register' },
//     { title: 'Logout', path: '/logout' },
//   ];

//   return (
//     <AppBar position="static" sx={{ background: 'linear-gradient(to right, white, white, #805002, #805002)' }}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Typography
//             variant="h6"
//             noWrap
//             component={Link}
//             to="/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontFamily: 'Arial, sans-serif',
//               fontWeight: 'bold',
//               letterSpacing: '.3rem',
//               color: '#805002',
//               textDecoration: 'none',
//             }}
//           >
//             {/* HAPPY FLOORS */}
//           </Typography>
//           <img src={Logo} alt="Logo" style={{ width: '8%' }} />

//           <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="menu"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               sx={{ color: '#805002' }}
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{
//                 display: { xs: 'block', md: 'none' },
//               }}
//             >
//               {pages.map((page) => (
//                 <MenuItem key={page.path} onClick={handleCloseNavMenu}>
//                   <Typography textAlign="center">
//                     <Link to={page.path} style={{ textDecoration: 'none', color: '#805002', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
//                       {page.title}
//                     </Link>
//                   </Typography>
//                 </MenuItem>
//               ))}
//             </Menu>
//           </Box>

//           <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
//             {pages.map((page) => (
//               <Button
//                 key={page.path}
//                 component={Link}
//                 to={page.path}
//                 sx={{ my: 2, color: '#805002', display: 'block', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20px' }}
//               >
//                 {page.title}
//               </Button>
//             ))}
//           </Box>

//           <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
//             <Tooltip title="Cart">
//               <IconButton component={Link} to="/cart" sx={{ p: 0, color: '#805002' }}>
//                 <ShoppingCartIcon />
//               </IconButton>
//             </Tooltip>
//             <Tooltip title="Open settings">
//               <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2, color: 'white' }}>
//                 <MenuIcon />
//               </IconButton>
//             </Tooltip>
//             <Menu
//               sx={{ mt: '45px' }}
//               id="menu-appbar"
//               anchorEl={anchorElUser}
//               anchorOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'right',
//               }}
//               open={Boolean(anchorElUser)}
//               onClose={handleCloseUserMenu}
//             >
//               {settings.map((setting) => (
//                 ((setting.title === 'Register' && !isLoggedIn) || 
//                 (setting.title === 'Logout' && isLoggedIn)
//                 ) && (
//                   <MenuItem
//                     key={setting.path}
//                     onClick={setting.title === 'Logout' ? handleLogout : handleCloseUserMenu}
//                   >
//                     <Typography textAlign="center">
//                       <Link to={setting.path} style={{ textDecoration: 'none', color: '#805002', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
//                         {setting.title}
//                       </Link>
//                     </Typography>
//                   </MenuItem>
//                 )
//               ))}
//             </Menu>
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//   );
// }

// export default Appbar;

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Logo from '../../../Images/logo.png';


function Appbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, [location]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken'); // Remove userToken from local storage
    localStorage.removeItem('userId'); // Remove userId from local storage
    setIsLoggedIn(false);
    navigate('/'); // Redirect to login page or homepage
  };

  const userId = localStorage.getItem('userId'); // Get userId from local storage

  const pages = [
    { title: 'Home', path: '/' },
    { title: 'About us', path: '/AboutUs' },
    { title: 'Products', path: '/About' },
    { title: 'Blog', path: '/Blogform' },
    { title: 'Viewproductss', path: '/ViewProducts' },
    {
      title: 'Order Status',
      path: isLoggedIn ? `/OrderStatus/${userId}` : null, // Conditionally set path based on login status
    },
  ];

  const handleClickPage = (page) => {
    if (page.title === 'Order Status' && !isLoggedIn) {
      alert('Please login to view your order status');
    } else if (page.path) {
      navigate(page.path);
    }
  };

  const settings = [
    { title: 'Register', path: '/Register' },
    { title: 'Logout', path: '/logout' },
  ];

  return (
    <AppBar position="static" sx={{ background: 'linear-gradient(to left ,white,  #000066)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
              letterSpacing: '.3rem',
              color: '#805002',
              textDecoration: 'none',
            }}
          >
            {/* HAPPY FLOORS */}
          </Typography>
          {/* <img src={Logo} alt="Logo" style={{ width: '8%' }} /> */}

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              sx={{ color: '#805002' }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => handleClickPage(page)}>
                  <Typography textAlign="center" style={{ textDecoration: 'none', color: '#805002', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                sx={{ my: 2, color: 'white', display: 'block', fontWeight: 'bold', fontFamily: 'system-ui', fontSize: '20px' }}
                onClick={() => handleClickPage(page)}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center' }}>
            {/* <Tooltip title="Cart">
              <IconButton component={Link} to="/cart" sx={{ p: 0, color: '#805002' }}>
                <ShoppingCartIcon />
              </IconButton>
            </Tooltip> */}
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, ml: 2, color: 'white' }}>
                <MenuIcon />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                ((setting.title === 'Register' && !isLoggedIn) || 
                (setting.title === 'Logout' && isLoggedIn)
                ) && (
                  <MenuItem
                    key={setting.path}
                    onClick={setting.title === 'Logout' ? handleLogout : handleCloseUserMenu}
                  >
                    <Typography textAlign="center">
                      <Link to={setting.path} style={{ textDecoration: 'none', color: '#805002', fontWeight: 'bold', fontFamily: 'Arial, sans-serif' }}>
                        {setting.title}
                      </Link>
                    </Typography>
                  </MenuItem>
                )
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Appbar;
