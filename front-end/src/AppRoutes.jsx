import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/auth/Register.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import Header from './components/layouts/Header.jsx';
import Footer from './components/layouts/Footer.jsx';
import SearchPage from './components/search/SearchPage.jsx';
import TeamPage from './components/pages/TeamPage.jsx';
import Dashboard from './components/navbars/Dashboard.jsx';
import NotFound from './components/pages/NotFound.jsx';

function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
