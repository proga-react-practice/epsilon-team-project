import { Routes, Route } from "react-router-dom";
import Freelancers from './Pages/Vova'
import Customers from './Pages/Maks'
import NotFoundPage from './components/404/404'
import Home from './components/home_page/homepage'

const Router = () => {
  return (
    <Routes> 
    <Route path="/" element={<Home />} /> 
    <Route path="/vova" element={<Freelancers />} />
    <Route path="/maks" element={<Customers />} />
    <Route path="*" element={<NotFoundPage />} />
   </Routes>
  );
}

export default Router;

