import { BrowserRouter, Routes, Route } from "react-router-dom";
import Freelancers from './Pages/Vova'
function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={< Freelancers/>} />
        <Route path="/vova" element={< Freelancers/>} />
        <Route path="/maks" element={< Freelancers/>} />
        <Route path="/*" element={< Freelancers/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
