import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Profile from './pages/Profile';
import Communities from './pages/Communities';
import CommunityPage from './pages/CommunityPage';
import Feed from './pages/Feed';
import ForgotPassword from './pages/ForgotPassword';
import VerifyEmail from './pages/VerifyEmail';
import { ThemeProvider } from './context/ThemeContext';
import GlobalThemeToggle from './components/GlobalThemeToggle';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <GlobalThemeToggle />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/communities" element={<Communities />} />
          <Route path="/community/:id" element={<CommunityPage />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
        <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      </Router>
    </ThemeProvider>
  );
}

export default App;
