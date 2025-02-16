import { Routes, Route } from 'react-router-dom';
import Home from './page/jsx/home.jsx';
import Login from './page/jsx/login.jsx';
import Signup from './page/jsx/signup.jsx';
function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
      </Routes>
  );
}

export default App;