import { Routes, Route } from "react-router-dom";
import Freelancers from './Pages/Vova'
import Customers from './Pages/Maks'

const Router = () => {
  return (
    <Routes> 
    <Route path="/" element={<Freelancers />} /> 
    <Route path="/vova" element={<Freelancers />} />
    <Route path="/maks" element={<Customers />} />
    <Route path="*" element={<Freelancers />} />
    </Routes>
  );
}

export default Router;

