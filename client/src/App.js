import logo from './logo.svg';
import './App.css';
// import Appbar from './Components/Appbar';
import AdminRoute from './Modules/Admin/Routes/AdminRoute';
import UserRoute from './Modules/User/Routes/UserRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
     {/* <Appbar/> */}
     <BrowserRouter>

<Routes>
<Route exact path="/Admin/*"  element={<AdminRoute />}/>
<Route exact path="/*"  element={<UserRoute />}/>

</Routes>
</BrowserRouter>
    </div>
  );
}

export default App;
