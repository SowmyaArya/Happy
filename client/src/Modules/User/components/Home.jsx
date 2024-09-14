import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import Slider from 'react-slick';
import Filter from './FilterSidebar';
import Footer from './Footer';
import Viewcat from './Viewcat';
import ViewBlog from './ViewBlog';
import ViewProducts from './ViewProducts';
import { Link } from 'react-router-dom';

// Import images
import image4 from '../../../Images/wallp1.jpg';
import image2 from '../../../Images/wallp1.jpg';
import image3 from '../../../Images/wallp1.jpg';
import image1 from '../../../Images/wallp1.jpg';

// Define keyframes for animations
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateY(-50px);
  }
  to {
    transform: translateY(0);
  }
`;

const expandIn = keyframes`
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
`;

// Styled components
const BackgroundSlider = styled(Slider)({
  height: '70vh',
  '& .slick-slide': {
    height: '100%',
  },
  // Ensure the slider itself takes up full height
  display: 'flex',
  alignItems: 'center',
});

const BackgroundSlide = styled(Box)(({ image }) => ({
  backgroundImage: `url(${image})`,
  backgroundSize: 'cover', // Ensure the image covers the entire box
  backgroundPosition: 'center', // Center the image
  height: '100%', // Make sure the slide takes full height of the slider
  width: '100%',
  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '20px',
  boxSizing: 'border-box',
  animation: `${fadeIn} 2s ease-in-out`,
}));

const StyledTypography = styled(Typography)({
  animation: `${slideIn} 1s ease-in-out`,
  fontFamily: "'Lobster', cursive",
});

const ContentBox = styled(Box)({
  marginTop: '20px',
  animation: `${expandIn} 1s ease-in-out`,
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
});

const StyledButton = styled(Button)({
  marginTop: '250px',
  background: 'linear-gradient(to left,  #9999ff,  #000066)',
  color: 'white',
  '&:hover': {
    backgroundColor: '#E64A19',
  },
});

const gradientStyle = {
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: '60px',
  fontWeight: 'bold',
  color: 'white'
};
const gradientStyle1 = {
  WebkitBackgroundClip: 'text',
  color: 'transparent',
  fontSize: '25px',
  fontWeight: 'bold',
  color: 'white',
};


const carouselImages = [image1, image2, image3,image4];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000
};

export default function Home() {
  return (
    <>
      <BackgroundSlider {...settings}>
        {carouselImages.map((image, index) => (
          <BackgroundSlide key={index} image={image}>
            <Container maxWidth="lg">
              <StyledTypography variant="h1" component="h1" gutterBottom>
                <span style={gradientStyle}>Welcome to Happy Floors</span>
              </StyledTypography>
              <StyledTypography variant="h4" component="h2" style={{color:'white'}}>
                <span style={gradientStyle1}>Discover our exquisite collection of tiles.</span>
              </StyledTypography>
              <Link to="/about" style={{ textDecoration: 'none'}}>
                <StyledButton>Explore Now</StyledButton>
              </Link>
            </Container>
          </BackgroundSlide>
        ))}
      </BackgroundSlider>
      <Container>
        <ContentBox>
          {/* <Typography variant="h3" component="h3" gutterBottom>
            Categories
          </Typography> */}
          <Viewcat />
        </ContentBox>
      </Container>
      <Container>
        <ContentBox>
          {/* <Typography variant="h3" component="h3" gutterBottom>
            Blogs
          </Typography> */}
          <ViewBlog />
        </ContentBox>
      </Container>
      <Container>
        <ContentBox>
          <Typography variant="h3" component="h3" gutterBottom>
            Products
          </Typography>
          <ViewProducts />
        </ContentBox>
      </Container>
      <Footer />
    </>
  );
}
