import { Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Pages/Home';
import WelcomePage from './Pages/WelcomePage';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserProfile from './Pages/UserProfile';
import UpdatePassword from './Pages/UpdatePassword';
import ForgotPassword from './Pages/ForgotPassword';
import VerifyResetCode from './Pages/VerifyResetCode';
import ChangePassword from './Pages/ChangePassword';
import ProtectedLayout from './Components/utils/ProtectedLayout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className='app'>

<ToastContainer   />
      <Routes>
        {/* مسار الصفحة الرئيسية */}
        <Route path="/" element={<WelcomePage />} />

        {/* مسارات غير محمية */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetCode" element={<VerifyResetCode />} />
        <Route path="/changepassword" element={<ChangePassword />} />

        {/* مسارات محمية */}
        <Route element={<ProtectedLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/updatepassword" element={<UpdatePassword />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
