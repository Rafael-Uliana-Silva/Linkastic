import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { UserProvider } from "./Context/UserContext.tsx";
import Login from './Components/login/Login.tsx';
import Register from './Components/login/Register.tsx';
import Share from './Components/share/Share.tsx';
import Esqueceu from './Components/login/Esqueceu.tsx';
import Reset from './Components/login/Reset.tsx';
import ErrorPage from './Components/error/ErrorPage.tsx';
import PrivateRoute from './Utils/PrivateRoute.tsx';
import ProfileMain from './Components/profile/ProfileMain.tsx';
import ProfileLinks from './Components/profile/ProfileLinks.tsx';
import ProfileConfig from './Components/profile/ProfileConfig.tsx';
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
        <Route path='/user/profile/:username' element={<Share />}/>
        <Route path='*' element={<ErrorPage />}/>
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
