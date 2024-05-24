import { FC } from "react";
import { BrowserRouter } from "react-router-dom";
import Router from "./AppRouter";
import { FreelancerProvider } from "./components/context/FreelancerContext";
import { CustomerProvider } from "./components/context/CustomerContext";
import { ProposalProvider } from "./components/context/PropsalContext";
import { ThemeProvider } from "./components/context/ThemeContext";
const App: FC = () => {
  return (
    <ThemeProvider>
      <ProposalProvider>
        <CustomerProvider>
          <FreelancerProvider>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </FreelancerProvider>
        </CustomerProvider>
      </ProposalProvider>
    </ThemeProvider>
  );
};

export default App;
