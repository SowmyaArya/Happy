

// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Box, Grid } from '@mui/material';
// import { styled, keyframes } from '@mui/system';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// // import Footer from './Footer';

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// const SectionBox = styled(Box)({
//   marginTop: '20px',
//   padding: '20px',
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   borderRadius: '8px',
//   animation: `${fadeIn} 2s ease-in-out`,
// });

// const CategoryCard = styled(Box)({
//   border: '1px solid #ddd',
//   borderRadius: '50%',
//   width: '200px', // Fixed width
//   height: '200px', // Fixed height
//   padding: '15px',
//   textAlign: 'center',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   transition: 'transform 0.3s ease-in-out',
//   display: 'flex',
//   flexDirection: 'column',
//   justifyContent: 'center',
//   alignItems: 'center',
//   '&:hover': {
//     transform: 'scale(1.05)',
//     cursor: 'pointer',
//   },
// });

// const CategoryImage = styled('img')({
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   borderRadius: '50%',
//   marginBottom: '10px',
// });

// export default function Viewcat() {
//   const [categories, setCategories] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/Category/GetCategory');
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleCategoryClick = (category) => {
//     navigate(`/SubcategoryPage/${category._id}`);
//   };

//   return (
//     <>
//       <Container>
//         <Typography variant="h2" component="h1" gutterBottom>
//           About Our Tile Collections
//         </Typography>
//         <SectionBox>
//           <Typography variant="h4" component="h2" gutterBottom>
//             Explore Our Categories
//           </Typography>
//           <Grid container spacing={3} justifyContent="center">
//             {categories.map((category, index) => (
//               <Grid item key={index}>
//                 <CategoryCard onClick={() => handleCategoryClick(category)}>
//                   <CategoryImage src={`http://localhost:5002/api/image/${category.category_image}`} alt={category.category_name} />
//                   <Typography variant="h5" component="h3">
//                     {category.category_name}
//                   </Typography>
//                   <Typography variant="body1">
//                     {category.category_description}
//                   </Typography>
//                 </CategoryCard>
//               </Grid>
//             ))}
//           </Grid>
//         </SectionBox>
//       </Container>
//       {/* <Footer /> */}
//     </>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const SectionBox = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  borderRadius: '8px',
  animation: `${fadeIn} 2s ease-in-out`,
  textAlign: 'center',
});

const CategoryCard = styled(Card)({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '50%',
  width: '150px',
  height: '150px',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
  margin: '0 auto',
});

const CategoryImage = styled(CardMedia)({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: '50%',
});

const CategoryName = styled(Typography)({
  marginTop: '10px',
  fontWeight: 'bold',
});

const CategoryProductCount = styled(Typography)({
  color: '#777',
});

export default function Viewcat() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5002/api/Category/GetCategory');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/SubcategoryPage/${category._id}`);
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          About Our Tile Collections
        </Typography>
        <SectionBox>
          {/* <Typography variant="h4" component="h2" gutterBottom>
            Browse By Space
          </Typography> */}
          <Typography variant="body1" paragraph style={{fontSize:'25px'}}>
            Discover the perfect blend of style and functionality as you explore our versatile range, ensuring that each tile tells a unique story for every room.
          </Typography>
          {categories.length > 0 ? (
            <Slider {...settings}>
              {categories.map((category, index) => (
                <Box key={index} onClick={() => handleCategoryClick(category)}>
                  <CategoryCard>
                    <CategoryImage
                      component="img"
                      image={`http://localhost:5002/api/image/${category.category_image}`}
                      alt={category.category_name}
                    />
                  </CategoryCard>
                  <CategoryName variant="h6">
                    {category.category_name}
                  </CategoryName>
                  {/* <CategoryProductCount variant="body2">
                    {`${category.product_count} PRODUCTS`}
                  </CategoryProductCount> */}
                </Box>
              ))}
            </Slider>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Loading...
            </Typography>
          )}
        </SectionBox>
      </Container>
    </>
  );
}
