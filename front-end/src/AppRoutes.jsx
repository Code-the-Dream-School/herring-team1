import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Register from './components/auth/Register.jsx';
import HomePage from './components/pages/HomePage.jsx';
import Login from './components/auth/Login.jsx';
import Header from './components/layouts/Header.jsx';
import Footer from './components/layouts/Footer.jsx';
import SearchPage from './components/search/SearchPage.jsx';
import TeamPage from './components/pages/TeamPage.jsx';
import Dashboard from './components/navbars/Dashboard.jsx';
import Auth from './components/auth/Auth.jsx';
import NotFound from './components/pages/NotFound.jsx';
import InfoPage from './components/pages/organization/InfoPage.jsx';
import VolunteerForm from './components/pages/volunteer/VolunteerForm.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import PrivacyPage from './components/pages/PrivacyPage.jsx';
import LegalPage from './components/pages/LegalPage.jsx';

function AppRoutes() {
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<Auth />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/search" element={<SearchPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />{' '}
        <Route path="/organizations/:id" element={<InfoPage />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/create_volunteer" element={<VolunteerForm type="create" />} />
        <Route path="/edit_volunteer" element={<VolunteerForm type="edit" />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/legal" element={<LegalPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default AppRoutes;
