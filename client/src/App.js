
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

// Admin Route
import User from "./components/admin/user/User";
import Adduser from "./components/admin/user/Adduser";
import Edituser from "./components/admin/user/Edituser";
import Service from "./components/admin/service/Service";
import Addservice from "./components/admin/service/Addservice";
import Category from "./components/admin/servicecategory/Category";
import Addcategory from "./components/admin/servicecategory/Addcategory";
import Editcategory from "./components/admin/servicecategory/Editcategory";
import Editservice from "./components/admin/service/Editservice";
import Addreview from "./components/admin/review/Addreview";
import EditReview from "./components/admin/review/EditReview";
import Review from "./components/admin/review/Review";
import GalleryDashboard from "./components/admin/gallery/GalleryDashboard";
import AddGallery from "./components/admin/gallery/AddGallery";
import CategoryTwo from "./components/admin/servicecategorytwo/CategoryTwo";
import AddcategoryTwo from "./components/admin/servicecategorytwo/AddcategoryTwo";
import Editcategorytwo from "./components/admin/servicecategorytwo/Editcategorytwo";


// Client Route
import Registration from "./components/client/user/Registration";
import Header from "./components/client/header/Header";
import Home from "./components/client/home/Home";
import Contact from "./components/client/contact/Contact";
import About from "./components/client/about/About";
import Gallery from "./components/client/Gallery/Gallery";
import Login from "./components/client/user/Login";
import ClientReview from "./components/client/review/ClientReview";
import ServiceClient from "./components/client/service/ServiceClient";



function App() {

  const [isadmin, setisAdmin] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      setisAdmin(false)
    } else {
      const token = localStorage.getItem("token")
      const decoded = jwt_decode(token);
      const { isAdmin } = decoded
      if (isAdmin) {
        setisAdmin(true)
      }
      else {
        setisAdmin(false)
      }
    }
  }, [])



  return (
    <>
      <Router>
        <Header />
        <Routes>
          {/* Client Route */}

          <Route path='/' element={<Home />} />
          <Route path='/contact-us' element={<Contact />} />
          <Route path='/about-us' element={<About />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/login' element={<Login />} />
          <Route path='/registration' element={<Registration />} />
          <Route path='/review' element={<ClientReview />} />
          <Route path='/service' element={<ServiceClient />} />

          {/* Admin */}
          {
            isadmin && (
              <>
                <Route path='/admin/user' element={<User />} />
                <Route path='/admin/adduser' element={<Adduser />} />
                <Route path='/admin/editUser/:id' element={<Edituser />} />
                <Route path='/admin/service' element={<Service />} />
                <Route path='/admin/addservice' element={<Addservice />} />
                <Route path='/admin/category' element={<Category />} />
                <Route path='/admin/addcategory' element={<Addcategory />} />
                <Route path='/admin/editcategory/:id' element={<Editcategory />} />
                <Route path='/admin/editservice/:id' element={<Editservice />} />
                <Route path='/admin/review' element={<Review />} />
                <Route path='/admin/review/:id' element={<EditReview />} />
                <Route path='/admin/addreview' element={<Addreview />} />
                <Route path='/admin/gallery' element={<GalleryDashboard />} />
                <Route path='/admin/addimage' element={<AddGallery />} />
                <Route path='/admin/category-two' element={<CategoryTwo />} />
                <Route path='/admin/addcategory-two' element={<AddcategoryTwo />} />
                <Route path='/admin/editcategory-two/:id' element={<Editcategorytwo />} />
              </>
            )
          }
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
