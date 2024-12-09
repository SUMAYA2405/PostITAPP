import { Container, Row } from "reactstrap";
import "./App.css";
import Home from "./Components/Home";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./Components/Header";
import Footer from './Components/Footer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import
import Login from './Components/Login';
import Register from './Components/Register';
import Profile from './Components/Profile';
import { useSelector } from "react-redux";

const App = () => {
  const email=useSelector((state)=>state.users.user.email);
  return (
    <Router> 
      <Container fluid>
        <Row>{email ? (<Header/>):null}</Row>
        
        <Row className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/registerUser" element={<Register />} />
          </Routes>
        </Row>
        <Row><Footer/></Row>
      </Container>
    </Router>
  );
};

export default App;
