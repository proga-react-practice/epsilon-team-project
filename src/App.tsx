import { FC } from "react";
import { BrowserRouter } from "react-router-dom"; 
import Router from "./AppRouter";
import { FreelancerProvider } from './components/context/FreelancerContext';

const App: FC = () => {

return(
  <FreelancerProvider>
    <BrowserRouter> 
       <Router />     
    </BrowserRouter>
  </FreelancerProvider>
  );
};

export default App;
