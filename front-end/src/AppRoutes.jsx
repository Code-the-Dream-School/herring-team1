import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/auth/Register.jsx';
import HomePage from './components/pages/HomePage.jsx';

function AppRoutes() {
  return (
    <BrowserRouter>
      {/* <Header /> */}
      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default AppRoutes;
