import './App.css';
import HomeComponent from './components/HomeComponent';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter as Router, Routes, Route, useNavigate, Outlet, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<HomeComponent />} />
            <Route path="/home/boards/:boardId" element={<HomeComponent />} />
          </Route>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </Router>
  );
}

function PrivateRoutes() {
    const token = localStorage.getItem("token");

    return (
        isValidToken(token) ? <Outlet/> : <Navigate to='/'/>
    )
}

function isValidToken(token) {
  if(!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));

    //convert into ms
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

function NotFound () {
  const navigate = useNavigate();
  return (
	<div>
	  <h1>404: Page not found</h1>
	  <button onClick={() => navigate("/")}>Go to Login Page</button>
	</div>
  );
};

export default App;
