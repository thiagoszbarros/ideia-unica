import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Assets from './Assets/Assets.js';
import Login from './Login.js';
import ProtectedRoutes from './Shared/ProtectedRoutes.js';
import Home from './Home.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path='/assets' element={<Assets />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
