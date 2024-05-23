import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home_page/homepage";
import RegistrationPage from "./Pages/Vova";
import Customers from "./Pages/Maks";
import NotFoundPage from "./components/404/404";
import {
  DEFAULT_ROUTE,
  HOME_ROUTE,
  FREELANCERS_ROUTE,
  CUSTOMERS_REG_ROUTE,
  FREELANCERS_REG_ROUTE,
  CUSTOMERS_LIST_ROUTE,
} from "./routes";
import DefaultLayout from "./components/layout/layout";
import FreelancerListPage from "./Pages/Freelancers";
import CustomersListPage from "./Pages/Customers";
const Router = () => {
  return (
    <Routes>
      <Route path={DEFAULT_ROUTE} element={<DefaultLayout />}>
        <Route index element={<Navigate to={HOME_ROUTE} replace />} />
        <Route path={HOME_ROUTE} element={<Home />} />
        <Route path={FREELANCERS_ROUTE} element={<FreelancerListPage />} />
        <Route path={FREELANCERS_REG_ROUTE} element={<RegistrationPage />} />
        <Route path={CUSTOMERS_REG_ROUTE} element={<Customers />} />
        <Route
          path={CUSTOMERS_LIST_ROUTE}
          element={<CustomersListPage />}
        />{" "}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Router;
