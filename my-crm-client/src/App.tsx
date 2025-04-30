import { Routes, Route,  } from 'react-router-dom';
import Login from './pages/login';
import Signup from './pages/signup';
import Dashboard from './pages/dashboard'; // Placeholder
import ProtectedRoute from './routes/protectedRoutes';

export default function App() {
  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}


