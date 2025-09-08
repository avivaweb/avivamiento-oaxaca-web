import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// CONTEXT PROVIDERS
import { AuthProvider } from '@/contexts/AuthContext';
import { TestimoniesProvider } from '@/contexts/TestimoniesContext';
import { EventsProvider } from '@/contexts/EventsContext';

// UI COMPONENTS
import { Toaster } from '@/components/ui/toaster';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

// PAGE COMPONENTS
import Home from '@/pages/Home';
import About from '@/pages/About';
import Leadership from '@/pages/Leadership';
import Ministries from '@/pages/Ministries';
import Sermons from '@/pages/Sermons';
import Events from '@/pages/Events';
import FamilyGroups from '@/pages/FamilyGroups';
import TheologySchool from '@/pages/TheologySchool';
import Contact from '@/pages/Contact';
import Donations from '@/pages/Donations';
import Testimonios from '@/pages/Testimonios';
import Store from '@/pages/Store';
import PastoralTeamPage from '@/pages/PastoralTeamPage';
import Register from '@/pages/Register';
import AccessDenied from '@/pages/AccessDenied';

// PROTECTED PAGE COMPONENTS
import AddTestimonio from '@/pages/AddTestimonio';
import EjercitoCelular from '@/pages/EjercitoCelular';
import AddCellGroup from '@/pages/AddCellGroup';
import ViewCellGroups from '@/pages/ViewCellGroups';
import Profile from '@/pages/Profile';
import NuevoReporte from '@/pages/NuevoReporte';
import ViewMeetingReports from '@/pages/ViewMeetingReports';
import Dashboard from '@/pages/Dashboard';
import ManageZones from '@/pages/ManageZones';

// ADMIN COMPONENTS
import AdminLayout from '@/pages/admin/AdminLayout';
import AdminDashboard from '@/pages/admin/Dashboard'; // Renamed to avoid conflict
import ManageTestimonies from '@/pages/admin/ManageTestimonies';
import TestimonyForm from '@/pages/admin/TestimonyForm';
import ManageEvents from '@/pages/admin/ManageEvents';
import EventForm from '@/pages/admin/EventForm';


function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <EventsProvider>
          <TestimoniesProvider>
            <div className="min-h-screen bg-blanco-puro text-negro-sagrado">
              <Navbar />
              <main className="pt-16 lg:pt-20">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/quienes-somos" element={<About />} />
                  <Route path="/liderazgo" element={<Leadership />} />
                  <Route path="/equipo-pastoral" element={<PastoralTeamPage />} />
                  <Route path="/ministerios" element={<Ministries />} />
                  <Route path="/sermones" element={<Sermons />} />
                  <Route path="/eventos" element={<Events />} />
                  <Route path="/grupos-familiares" element={<FamilyGroups />} />
                  <Route path="/escuela-teologia" element={<TheologySchool />} />
                  <Route path="/testimonios" element={<Testimonios />} />
                  <Route path="/tienda" element={<Store />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/contacto" element={<Contact />} />
                  <Route path="/donaciones" element={<Donations />} />
                  <Route path="/ejercitocelular" element={<EjercitoCelular />} />
                  <Route path="/access-denied" element={<AccessDenied />} />

                  {/* Admin Routes */}
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<AdminDashboard />} />
                    <Route path="testimonies" element={<ManageTestimonies />} />
                    <Route path="testimonies/new" element={<TestimonyForm />} />
                    <Route path="testimonies/edit/:id" element={<TestimonyForm />} />
                    <Route path="events" element={<ManageEvents />} />
                    <Route path="events/new" element={<EventForm />} />
                    <Route path="events/edit/:id" element={<EventForm />} />
                  </Route>

                  {/* Existing Protected Routes */}
                  <Route
                    path="/add-testimonio"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <AddTestimonio />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/add-cell-group"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <AddCellGroup />
                      </ProtectedRoute>
                    }
                  />
                   <Route
                    path="/nuevo-reporte"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <NuevoReporte />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/view-cell-groups"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <ViewCellGroups />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/view-meeting-reports"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <ViewMeetingReports />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute requiredRoles={['Líder de Célula', 'Pastor de Zona', 'Superusuario']}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/manage-zones"
                    element={
                      <ProtectedRoute requiredRoles={['Superusuario']}>
                        <ManageZones />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
              <Footer />
              <Toaster />
            </div>
          </TestimoniesProvider>
        </EventsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;