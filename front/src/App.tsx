import GlobalStyle from './GlobalStyle';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/login/Register';
import ProfileMain from './components/profile/ProfileMain'

function App() {
  return (
    <div>
      <GlobalStyle />
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
          <Route 
            path='/profile'
            element={<ProfileMain />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
