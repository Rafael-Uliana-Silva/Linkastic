import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../Context/UserContext";
import Login from './components/login/Login';
import Register from './components/login/Register';
import PrivateRoute from './utils/PrivateRoute';
import ProfileMain from './components/profile/ProfileMain'
import ProfileLinks from './components/profile/ProfileLinks';
import ProfileConfig from './components/profile/ProfileConfig';

function App() {
  return (
    <div>
      <GlobalStyle />
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path='/'
              element={<Login />}
            />
            <Route 
              path='/register'
              element={<Register />}
            />
            <Route element={<PrivateRoute />}>
              <Route path='/profile/:id' element={<ProfileMain />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/profile/:id/links' element={<ProfileLinks />} />
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path='/profile/:id/config' element={<ProfileConfig />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App;
