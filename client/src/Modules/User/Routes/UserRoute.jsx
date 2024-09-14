// import React from 'react'

// import { Routes, Route} from 'react-router-dom';
// import Appbar from '../components/Appbar';
// import Home from '../components/Home';
// import About from '../components/About';
// import ViewProducts from '../components/ViewProducts';
// import Subcategory from '../components/Subcategory';
// import ProductDetail from '../components/ProductDetail';
// import SubcategoryPage from '../components/SubcategoryPage';
// import Register from '../components/Register';
// import Login from '../components/Login';
// import BookingForm from '../components/BookingForm';
// import ViewOrderStatus from '../components/ViewOrderStatus';
// import Blogform from '../components/Blogform';
// import Cart from '../components/Cart';
// import OrderStatus from '../components/OrderStatus';
// import AboutUs from '../components/AboutUs';


// export default function UserRoute() {
//   return (
//     <div>
//       <Appbar/>
//         <Routes>
//         {/* <Route exact path="/" element={<Home />} /> */}
//         <Route exact path="/" element={<Home />} />
//         {/* <Route exact path="/" element={<Filter />} /> */}
//         {/* <Route exact path="/Recipelist" element={<TablePage />} />
//         <Route exact path="/Addrecipe" element={<Addrecipe />} />
//         <Route exact path="/Viewrecipe" element={<Viewrecipe />} />
//         <Route exact path="/Viewrecipetable" element={<Viewrecipetable />} />
//         <Route exact path="/SuggestionBox" element={<SuggestionBox />} />
//         <Route exact path="/Loginform" element={<Loginform />} />
//         <Route exact path="/CategoryList" element={<CategoryList />} />
//         <Route exact path="/RecipeList" element={<RecipeList />} />
//         <Route path="/CategoryRecipe/:categoryId" element={<CategoryRecipes />} />
//         <Route path="/recipe/:recipeId" element={<RecipeDetails />} /> */}
//         <Route exact path="/About" element={<About />} />
//         <Route exact path="/ViewProducts" element={<ViewProducts />} />
//         <Route exact path="/AboutUs" element={<AboutUs />} />
//         <Route exact path="/Subcategory" element={<Subcategory />} />
//         <Route exact path="/Register" element={<Register />} />
//         <Route exact path="/Login" element={<Login />} />
//         <Route exact path="/Blogform" element={<Blogform />} />
//         <Route exact path="/ViewOrderStatus" element={<ViewOrderStatus />} />
//         <Route exact path="/product/:productId" element={<ProductDetail />} />
//         <Route exact path="/SubcategoryPage/:id" element={<SubcategoryPage/>} />
//         <Route path="/SubcategoryPage/:id/products" component={'SubcategoryProducts'} />
//         <Route path="/cart" element={<Cart/>} />
//         {/* <Route exact path="/ViewOrderStatus/:bookingId" element={<ViewOrderStatus />} /> */}
//         <Route path="/ViewOrderStatus/user/:userId" element={<ViewOrderStatus />} />
//         {/* <Route path="/OrderStatus/:userId" element={<OrderStatus />} /> */}
//         {/* <Route path="/OrderStatus/:userId" component={OrderStatus} /> */}
//         <Route path="/OrderStatus/:userId" element={<OrderStatus />} />
//         {/* <Route path="/product/:productId" element={<ProductDetail />} /> */}
//         <Route path="/book/:productId" element={<BookingForm />} />
//         {/* <Route path="/product/:productId" component={ProductDetail} /> */}
//         {/* <Route path="/" component={SubcategoryPage} /> */}
//         {/* <Route path="/products/:categoryId" component={ViewProducts} /> */}
//         {/* <Route exact path="/Feedback" element={< />} /> */}

//         {/* <Route exact path="/BlogManagementPage" element={<BlogManagementPage />} /> */}
      
//       </Routes>
//     </div>
//   )
// }

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Appbar from '../components/Appbar';
import Home from '../components/Home';
import About from '../components/About';
import ViewProducts from '../components/ViewProducts';
import Subcategory from '../components/Subcategory';
import ProductDetail from '../components/ProductDetail';
import SubcategoryPage from '../components/SubcategoryPage';
import Register from '../components/Register';
import Login from '../components/Login';
import BookingForm from '../components/BookingForm';
import ViewOrderStatus from '../components/ViewOrderStatus';
import Blogform from '../components/Blogform';
import Cart from '../components/Cart';
import OrderStatus from '../components/OrderStatus';
import AboutUs from '../components/AboutUs';

export default function UserRoute() {
  const location = useLocation();
  const noAppbarRoutes = ['/Register', '/Login'];

  return (
    <div>
      {!noAppbarRoutes.includes(location.pathname) && <Appbar />}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/About" element={<About />} />
        <Route exact path="/ViewProducts" element={<ViewProducts />} />
        <Route exact path="/AboutUs" element={<AboutUs />} />
        <Route exact path="/Subcategory" element={<Subcategory />} />
        <Route exact path="/Register" element={<Register />} />
        <Route exact path="/Login" element={<Login />} />
        <Route exact path="/Blogform" element={<Blogform />} />
        <Route exact path="/ViewOrderStatus" element={<ViewOrderStatus />} />
        <Route exact path="/product/:productId" element={<ProductDetail />} />
        <Route exact path="/SubcategoryPage/:id" element={<SubcategoryPage />} />
        <Route path="/SubcategoryPage/:id/products" element={<Subcategory />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/ViewOrderStatus/user/:userId" element={<ViewOrderStatus />} />
        <Route path="/OrderStatus/:userId" element={<OrderStatus />} />
        <Route path="/book/:productId" element={<BookingForm />} />
      </Routes>
    </div>
  );
}
