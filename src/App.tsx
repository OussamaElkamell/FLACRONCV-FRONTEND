
import { Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import ResumePage from './pages/ResumePage';
import CoverLetterPage from './pages/CoverLetterPage';
import NotFound from './pages/NotFound';
import { Toaster } from 'sonner';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import PaymentSuccessPage from './pages/PaymentSuccessPage';
import PaymentCancelPage from './pages/PaymentCancelPage';
import UserSettingsPage from './pages/UserSettingsPage';
import AdminPage from './pages/AdminPage';
import PlansPage from './pages/PlansPage';

function App() {
  
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={
          <ProtectedRoute>
            <ResumePage />
          </ProtectedRoute>
        } />
        <Route path="/cover-letter" element={
          <ProtectedRoute>
            <CoverLetterPage />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/plans" element={<PlansPage />} />
        <Route path="/payment/success" element={
          <ProtectedRoute>
            <PaymentSuccessPage />
          </ProtectedRoute>
        } />
        <Route path="/payment/cancel" element={
          <ProtectedRoute>
            <PaymentCancelPage />
          </ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute>
            <UserSettingsPage />
          </ProtectedRoute>
        } />
        <Route path="/admin" element={
          <ProtectedRoute adminOnly={true}>
            <AdminPage />
          </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster richColors />
    </div>
  );
}

export default App;
