// import React from 'react';
// import ClippedDrawer from '../../Admin/components/ClippedDrawer';
// import { Routes, Route } from 'react-router-dom';
// import AddCategory from '../components/AddCategory';
// import Dashboard from '../components/Dashboard';
// import ViewCategory from '../components/ViewCategory';
// import ViewFeedback from '../components/ViewFeedback';
// import BlogManagementPage from '../components/BlogManagementPage';
// import AddProduct from '../components/AddProduct';
// import AddSubCategory from '../components/AddSubCategory';
// import ViewSubcategory from '../components/ViewSubcategory';
// import ViewProduct from '../components/ViewProduct';
// import BookingsTable from '../components/BookingsTable';
// import BlogForm from '../components/BlogForm';
// import ManagePayment from '../components/ManagePayment';
// import AdminLogin from '../components/AdminLogin';

// export default function AdminRoute() {
//   return (
//     <ClippedDrawer>
//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="Dashboard" element={<Dashboard />} />
//         <Route path="AddCategory" element={<AddCategory />} />
//         <Route path="ViewCategory" element={<ViewCategory />} />
//         <Route path="Feedback" element={<ViewFeedback />} />
//         <Route path="manageblogs" element={<BlogManagementPage />} />
//         <Route path="BlogForm" element={<BlogForm />} />
//         <Route path="ViewSubcategory" element={<ViewSubcategory />} />
//         <Route path="AddProduct" element={<AddProduct />} />
//         <Route path="ViewProduct" element={<ViewProduct />} />
//         <Route path="BookingsTable" element={<BookingsTable />} />
//         <Route path="ManagePayment" element={<ManagePayment />} />
//         {/* <Route path="AdminLogin" element={<AdminLogin />} /> */}
//         {/* <Route path="Addproducts" element={<AddProduct />} /> */}
       
//       </Routes>
//     </ClippedDrawer>
//   );
// }


import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import ClippedDrawer from '../../Admin/components/ClippedDrawer';
import AddCategory from '../components/AddCategory';
import Dashboard from '../components/Dashboard';
import ViewCategory from '../components/ViewCategory';
import ViewFeedback from '../components/ViewFeedback';
import BlogManagementPage from '../components/BlogManagementPage';
import AddProduct from '../components/AddProduct';
import AddSubCategory from '../components/AddSubCategory';
import ViewSubcategory from '../components/ViewSubcategory';
import ViewProduct from '../components/ViewProduct';
import BookingsTable from '../components/BookingsTable';
import BlogForm from '../components/BlogForm';
import ManagePayment from '../components/ManagePayment';
import AdminLogin from '../components/AdminLogin';

export default function AdminRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Check if admin is authenticated by verifying the presence of a token
    const token = localStorage.getItem('AdminToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [location]);

  return (
    isAuthenticated ? (
      <ClippedDrawer>
        <Routes>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/AddCategory" element={<AddCategory />} />
          <Route path="/ViewCategory" element={<ViewCategory />} />
          <Route path="/Feedback" element={<ViewFeedback />} />
          <Route path="/manageblogs" element={<BlogManagementPage />} />
          <Route path="/BlogForm" element={<BlogForm />} />
          <Route path="/ViewSubcategory" element={<ViewSubcategory />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/AddSubCategory" element={<AddSubCategory />} />
          <Route path="/AddProduct" element={<AddProduct />} />
          <Route path="/ViewProduct" element={<ViewProduct />} />
          <Route path="/BookingsTable" element={<BookingsTable />} />
          <Route path="/ManagePayment" element={<ManagePayment />} />
          <Route path="*" element={<Navigate to="/Admin/" />} />
        </Routes>
      </ClippedDrawer>
    ) : (
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        {/* <Route path="*" element={<Navigate to="/Admin/Dashboard" />} /> */}
      </Routes>
    )
  );
}
