import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./AppRouter";
import { FreelancerProvider } from "./components/context/FreelancerContext";
import { CustomerProvider } from "./components/context/CustomerContext";
const App: FC = () => {
  return (
    <CustomerProvider>
      <FreelancerProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </FreelancerProvider>
    </CustomerProvider>
  );
};

export default App;
