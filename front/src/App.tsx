import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from "./Context/UserContext";
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import Esqueceu from './Components/login/Esqueceu';
import Reset from './Components/login/Reset';
import PrivateRoute from './Utils/PrivateRoute';
import ProfileMain from './Components/profile/ProfileMain';
import ProfileLinks from './Components/profile/ProfileLinks';
import ProfileConfig from './Components/profile/ProfileConfig';
import { AnimatePresence, motion } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/esqueceu' element={<Esqueceu />} />
        <Route path='/resetPassword/:token' element={<Reset />} />
        <Route element={<PrivateRoute />}>
          <Route 
            path='/profile/:id/view' 
            element={
              <motion.div
                initial={{ x: '-100vw', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100vw', opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 30 
                }}
              >
                <ProfileMain />
              </motion.div>
            }
          />
          <Route 
            path='/profile/:id/links' 
            element={
              <motion.div
                initial={{ x: '-100vw', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100vw', opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 30 
                }}
              >
                <ProfileLinks />
              </motion.div>
            }
          />
          <Route 
            path='/profile/:id/config' 
            element={
              <motion.div
                initial={{ x: '-100vw', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '-100vw', opacity: 1 }}
                transition={{ 
                  duration: 0.5, 
                  type: 'spring', 
                  stiffness: 200,
                  damping: 30 
                }}
              >
                <ProfileConfig />
              </motion.div>
            }
          />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <div>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </UserProvider>
    </div>
  );
}

export default App;
