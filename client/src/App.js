import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Assets from './Assets/Assets.js';
import Login from './Login.js';

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/assets' element={<Assets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
