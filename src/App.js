// import { Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;

  return (
    <div className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
