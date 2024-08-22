import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserProvider } from "../Context/UserContext";
import Login from './components/login/Login';
import Register from './components/login/Register';
import ProfileMain from './components/profile/ProfileMain'
import PrivateRoute from './utils/PrivateRoute';

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
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </div>
  )
}

export default App;
