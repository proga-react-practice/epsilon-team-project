import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/home_page/homepage';
import Freelancers from './Pages/Vova';
import Customers from './Pages/Maks';
import NotFoundPage from './components/404/404'; 
import { DEFAULT_ROUTE, HOME_ROUTE, FREELANCERS_ROUTE, CUSTOMERS_ROUTE } from "./routes";
import DefaultLayout from "./layout/layout"; 

const Router = () => {
  return (
    <Routes>
      <Route path={DEFAULT_ROUTE} element={<DefaultLayout />}>
        <Route index element={<Navigate to={HOME_ROUTE} replace />} />
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={FREELANCERS_ROUTE} element={<Freelancers />} />
        <Route path={CUSTOMERS_ROUTE} element={<Customers />} />
        <Route path="*" element={<NotFoundPage />} /> 
      </Route>
    </Routes>
  );
}

export default Router;
