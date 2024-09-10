import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "./Context/UserContext";
import Login from './Components/login/Login';
import Register from './Components/login/Register';
import PrivateRoute from './Utils/PrivateRoute';
import ProfileMain from './Components/profile/ProfileMain'
import ProfileLinks from './Components/profile/ProfileLinks';
import ProfileConfig from './Components/profile/ProfileConfig';

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
              <Route path='/profile/:id/view' element={<ProfileMain />} />
              <Route path='/profile/:id/links' element={<ProfileLinks />} />
              <Route path='/profile/:id/config' element={<ProfileConfig />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App;
