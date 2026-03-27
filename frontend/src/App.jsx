import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import AdminLayout from './layouts/AdminLayout';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Subscriptions from './pages/Subscriptions';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import VideoManagement from './pages/VideoManagement';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User Facing Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movie/:id" element={<MovieDetails />} />
          <Route path="support" element={<div style={{ paddingTop: '8rem', textAlign: 'center', fontSize: '2rem', color: '#fff' }}>Support Page Coming Soon</div>} />
          <Route path="subscriptions" element={<Subscriptions />} />
        </Route>

        {/* Admin Facing Routes - Protected */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="videos" element={<VideoManagement />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
