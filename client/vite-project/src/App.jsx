import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Todo from './pages/Todo';
import ProtectedRoute from './components/ProtectedRoute';
import RegisterLinks from './pages/links';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todo" element={
          <ProtectedRoute>
            <Todo />
          </ProtectedRoute>
        } />
        <Route path='/' element={<RegisterLinks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
