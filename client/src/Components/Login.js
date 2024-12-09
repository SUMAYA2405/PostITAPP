

import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import Logo from "../Images/logo-t.png";
import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/userSlice";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);
 
  const handleLogin = () => {
    const userData = {
      email:email,
      password:password,
    };
    dispatch(login(userData))
 
  };
  useEffect(() => {
    if (isError) {
      navigate("/login");
    }
    if (isSuccess) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [user, isError, isSuccess]);
  return (
    <Container>
      <Row>
        <Col md="12"></Col>
      </Row>
      <Row>
        <Col md="6">
          <Form className="div-form">
            <div className="appTitle">
              <img src={Logo} />
            </div>
            Login
            <FormGroup>
              <Label for="email" className="smalltext">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                placeholder="Email..."
                type="email"
                onChange={(e) => setemail(e.target.value)}
 
              />
            </FormGroup>
            <FormGroup>
              <Label for="password" className="smalltext">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                onChange={(e) => setpassword(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <div className="side">
                <Input
                  id="remember"
                  name="remember"
                  type="checkbox"
                  className="checkbox"
                />
                <Label for="remember" className="smalltext">
                  Remember Me
                </Label>
              </div>
              <div className="smalltext side">
                <a href="">Forgot Password</a>
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button" onClick={() => handleLogin()}>
                Sign in
              </Button>
            </FormGroup>
            <p className="smalltext">
              No Account? <Link to="/registerUser">Sign Up now.</Link>
            </p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};
 
export default Login;
