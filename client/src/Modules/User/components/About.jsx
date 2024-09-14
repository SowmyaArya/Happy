// import React from 'react';
// import { Container, Typography, Box, Grid } from '@mui/material';
// import { styled, keyframes } from '@mui/system'; // Make sure to import keyframes

// const fadeIn = keyframes`
//   from {
//     opacity: 0;
//   }
//   to {
//     opacity: 1;
//   }
// `;

// // Remove slideIn if not used
// // const slideIn = keyframes`
// //   from {
// //     transform: translateY(-50px);
// //   }
// //   to {
// //     transform: translateY(0);
// //   }
// // `;

// const SectionBox = styled(Box)({
//   marginTop: '20px',
//   padding: '20px',
//   backgroundColor: 'rgba(255, 255, 255, 0.8)',
//   borderRadius: '8px',
//   animation: `${fadeIn} 2s ease-in-out`,
// });

// const CategoryCard = styled(Box)({
//   border: '1px solid #ddd',
//   borderRadius: '8px',
//   padding: '15px',
//   textAlign: 'center',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const categories = [
//   { title: 'Bathroom', description: 'Tiles designed for water resistance and easy cleaning, ideal for bathrooms.' },
//   { title: 'Bedroom', description: 'Elegant and comfortable tiles to create a cozy bedroom environment.' },
//   { title: 'Living Room', description: 'Stylish tiles that enhance the aesthetics and comfort of your living space.' },
//   { title: 'Kitchen', description: 'Durable and stain-resistant tiles perfect for high-traffic kitchen areas.' },
//   { title: 'Balcony', description: 'Weather-resistant tiles designed for outdoor use on balconies and terraces.' },
//   { title: 'Elevation Wall', description: 'Decorative tiles for adding a unique touch to elevation walls.' },
//   { title: 'Parking', description: 'Heavy-duty tiles built to withstand the wear and tear of parking areas.' },
// ];

// export default function About() {
//   return (
//     <Container>
//       <Typography variant="h2" component="h1" gutterBottom>
//         About Our Tile Collections
//       </Typography>
//       <SectionBox>
//         <Typography variant="h4" component="h2" gutterBottom>
//           Explore Our Categories
//         </Typography>
//         <Grid container spacing={3}>
//           {categories.map((category, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <CategoryCard>
//                 <Typography variant="h5" component="h3">
//                   {category.title}
//                 </Typography>
//                 <Typography variant="body1">
//                   {category.description}
//                 </Typography>
//               </CategoryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </SectionBox>
//     </Container>
//   );
// }








// import React, { useEffect, useState } from 'react';
// import { Container, Typography, Box, Grid } from '@mui/material';
// import { styled, keyframes } from '@mui/system';
// import axios from 'axios';

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
//   borderRadius: '8px',
//   padding: '15px',
//   textAlign: 'center',
//   boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
//   transition: 'transform 0.3s ease-in-out',
//   '&:hover': {
//     transform: 'scale(1.05)',
//   },
// });

// const CategoryImage = styled('img')({
//   width: '100%',
//   height: '150px',
//   objectFit: 'cover',
//   borderRadius: '8px 8px 0 0',
// });

// export default function About() {
//   const [categories, setCategories] = useState([]);

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('http://localhost:5002/api/Category/Getcategory');
//         console.log(response.data); // Debugging line to check the data structure
//         setCategories(response.data);
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchCategories();
//   }, []);

//   return (
//     <Container>
//       <Typography variant="h2" component="h1" gutterBottom>
//         About Our Tile Collections
//       </Typography>
//       <SectionBox>
//         <Typography variant="h4" component="h2" gutterBottom>
//           Explore Our Categories
//         </Typography>
//         <Grid container spacing={3}>
//           {categories.map((category, index) => (
//             <Grid item xs={12} sm={6} md={4} key={index}>
//               <CategoryCard>
//                 <CategoryImage src={`http://localhost:5002/api/image/${category.category_image}`} alt={category.category_name} />
//                 <Typography variant="h5" component="h3">
//                   {category.category_name}
//                 </Typography>
//                 <Typography variant="body1">
//                   {category.category_description}
//                 </Typography>
//               </CategoryCard>
//             </Grid>
//           ))}
//         </Grid>
//       </SectionBox>
//     </Container>
//   );
// }

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from './Footer';

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
});

const CategoryCard = styled(Box)({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '15px',
  textAlign: 'center',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    cursor: 'pointer',
  },
});

const CategoryImage = styled('img')({
  width: '100%',
  height: '150px',
  objectFit: 'cover',
  borderRadius: '8px 8px 0 0',
});

export default function About() {
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

  return (
    <>
  
    <Container>
      <Typography variant="h4" component="h1" gutterBottom style={{color:'#19334d'}}>
        About Our Tile Collections
      </Typography>
      <SectionBox>
        <Typography variant="h5" component="h2" gutterBottom style={{color:'#19334d',fontWeight:'20px'}} >
          Explore Our Categories
        </Typography>
        <Grid container spacing={3}>
          {categories.map((category, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <CategoryCard onClick={() => handleCategoryClick(category)}>
                <CategoryImage src={`http://localhost:5002/api/image/${category.category_image}`} alt={category.category_name} />
                <Typography variant="h5" component="h3">
                  {category.category_name}
                </Typography>
                <Typography variant="body1">
                  {category.category_description}
                </Typography>
              </CategoryCard>
            </Grid>
          ))}
        </Grid>
      </SectionBox>
     
    </Container>
    <Footer />
    </>
  );
}
