// import * as React from 'react';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import Link from '@mui/material/Link';
// import IconButton from '@mui/material/IconButton';
// import Grid from '@mui/material/Grid';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import InstagramIcon from '@mui/icons-material/Instagram';
// import GitHubIcon from '@mui/icons-material/GitHub';

// const footerStyle = {
//   backgroundColor: '#282c34',
//   color: 'white',
//   padding: '2rem 0',
//   textAlign: 'center',
// };

// const sectionStyle = {
//   marginBottom: '1rem',
//   display:'block'
// };

// const socialIconStyle = {
//   color: 'white',
//   '&:hover': {
//     color: '#ffbb33', // Highlight color on hover
//   },
// };

// const Footer = () => {
//   return (
//     <Box component="footer" sx={footerStyle}>
//       <Container maxWidth="lg">
//         <Grid container spacing={4}>
//           {/* Company Info Section */}
//           <Grid item xs={12} md={4}>
//             <Box sx={sectionStyle}>
//               <Typography variant="h6" gutterBottom>
//                 HAPPY FLOORS
//               </Typography>
//               <Typography variant="body2" paragraph>
//                 Mangalore
//               </Typography>
//               <Typography variant="body2">
//                 Email: <Link href="mailto:info@yourcompany.com" color="inherit">Happyfloors@yourcompany.com</Link>
//               </Typography>
//               <Typography variant="body2">
//                 Phone: <Link href="tel:+1234567890" color="inherit">+91 9876543210</Link>
//               </Typography>
//             </Box>
//           </Grid>

//           {/* Navigation Links Section */}
//           <Grid item xs={12} md={4}>
//             <Box sx={sectionStyle}>
//               <Typography variant="body1" gutterBottom>
//                 <Link href="/" color="inherit" sx={{ display: 'block', mb: 1 }}>
//                   Home
//                 </Link>
//                 <Link href="/About" color="inherit" sx={{ display: 'block', mb: 1 }}>
//                   About
//                 </Link>
//                 <Link href="/ViewProducts" color="inherit" sx={{ display: 'block', mb: 1 }}>
//                   Products
//                 </Link>
//                 <Link href="/Blogform" color="inherit" sx={{ display: 'block', mb: 1 }}>
//                   Blog
//                 </Link>
//               </Typography>
//             </Box>
//           </Grid>

//           {/* Social Media Icons Section */}
//           <Grid item xs={12} md={4}>
//             <Box sx={sectionStyle}>
//               <Typography variant="body1" gutterBottom>
//                 Follow us
//               </Typography>
//               <Box sx={{ display: 'flex', justifyContent: 'center' }}>
//                 <IconButton href="https://facebook.com" target="_blank" sx={socialIconStyle}>
//                   <FacebookIcon />
//                 </IconButton>
//                 <IconButton href="https://twitter.com" target="_blank" sx={socialIconStyle}>
//                   <TwitterIcon />
//                 </IconButton>
//                 <IconButton href="https://instagram.com" target="_blank" sx={socialIconStyle}>
//                   <InstagramIcon />
//                 </IconButton>
//                 <IconButton href="https://github.com" target="_blank" sx={socialIconStyle}>
//                   <GitHubIcon />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Copyright Section */}
//         <Box sx={{ mt: 4 }}>
//           <Typography variant="body2">
//             &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
//           </Typography>
//         </Box>
//       </Container>
//     </Box>
//   );
// };

// export default Footer;


import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArticleIcon from '@mui/icons-material/Article';

const footerStyle = {
  backgroundColor: '#19334d',
  color: 'white',
  padding: '2rem 0',
  textAlign: 'center',
};

const sectionStyle = {
  marginBottom: '1rem',
  display:'block'
};

const socialIconStyle = {
  color: 'white',
  '&:hover': {
    color: '#ffbb33', // Highlight color on hover
  },
};

const linkStyle = {
  display: 'flex',
  alignItems: 'center',
  margin: '0 1rem',
  textDecoration: 'none',
  color: 'inherit',
};

const iconStyle = {
  marginRight: '0.5rem',
};

const Footer = () => {
  return (
    <Box component="footer" sx={footerStyle}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info Section */}
          <Grid item xs={12} md={4}>
            <Box sx={sectionStyle}>
              <Typography variant="h6" gutterBottom>
              HAPPY FLOORS
              </Typography>
              <Typography variant="body2" paragraph>
               Mangalore 
              </Typography>
              <Typography variant="body2">
                Email: <Link href="mailto:info@yourcompany.com" color="inherit">Happyfloors@yourcompany.com</Link>
              </Typography>
              <Typography variant="body2">
                Phone: <Link href="tel:+1234567890" color="inherit">+91 9876543210</Link>
              </Typography>
            </Box>
          </Grid>

          {/* Navigation Links Section */}
          <Grid item xs={12} md={5}>
            <Box sx={sectionStyle}>
              <Typography variant="body1" gutterBottom>
                <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/" sx={linkStyle}>
                    <HomeIcon sx={iconStyle} /> Home
                  </Link>
                  <Link href="/About" sx={linkStyle}>
                    <InfoIcon sx={iconStyle} /> About
                  </Link>
                  <Link href="/ViewProducts" sx={linkStyle}>
                    <ShoppingCartIcon sx={iconStyle} /> Products
                  </Link>
                  <Link href="/Blogform" sx={linkStyle}>
                    <ArticleIcon sx={iconStyle} /> Blog
                  </Link>
                </Box>
              </Typography>
            </Box>
          </Grid>

          {/* Social Media Icons Section */}
          <Grid item xs={12} md={3}>
            <Box sx={sectionStyle}>
              <Typography variant="body1" gutterBottom>
                Follow us
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <IconButton href="https://facebook.com" target="_blank" sx={socialIconStyle}>
                  <FacebookIcon />
                </IconButton>
                <IconButton href="https://twitter.com" target="_blank" sx={socialIconStyle}>
                  <TwitterIcon />
                </IconButton>
                <IconButton href="https://instagram.com" target="_blank" sx={socialIconStyle}>
                  <InstagramIcon />
                </IconButton>
                <IconButton href="https://github.com" target="_blank" sx={socialIconStyle}>
                  <GitHubIcon />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
