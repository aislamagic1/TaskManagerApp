import './App.css';
import HomeComponent from './components/HomeComponent';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/home" element={<HomeComponent />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
    </Router>
  );
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
