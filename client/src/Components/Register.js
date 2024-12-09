import { Button, Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import { userValidationsSchema } from "../Validations/UserValidations";
//import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { useSelector ,useDispatch } from "react-redux";
import { yupResolver } from '@hookform/resolvers/yup';
import Logo from "../Images/logo-t.png";
import { useState } from "react";
import {addUser ,deleteUSer, updateUser} from "../Features/userSlice";
import { registerUser } from "../Features/userSlice";
import{useNavigate} from "react-router-dom";



const Register = () => {


  const userList = useSelector((state) => state.users.value);
  const [name,setName]=useState("");
  const [email,setemail]=useState("");
  const [password,setpassword]=useState("");
  const [confirmpassword,setconfirmpassword]=useState("");

  

  const {
    register, handleSubmit:submitForm,trigger,setValue, formState: { errors }
  } = useForm({
    resolver: yupResolver(userValidationsSchema)
  });
  
  const dispatch=useDispatch();
  const navigate=useNavigate();

 /* const handleDelete=(email)=>{
    dispatch(deleteUSer(email));
  }
  const handleUdate=(email)=>{
    const userData={
      name:name,
      email:email,
      password:password
    };
    dispatch(updateUser(userData));
  }*/
  const handleSubmit = (data) => {
    try{
      console.log("Validation all  good", data);

      const userData={
        name:data.name,
        email:data.email,
        password:data.password
      };

      dispatch(registerUser(userData));
      navigate("/login");//when complete register will go to login 
      console.log("Form Data" ,userData);
      

    }
    catch(error){
      console.log("Error",error)
    }

    

  }

  return (
    <div>
      <Container fluid>
        <Row className="formrow">
          <Col className="columndiv1" lg='6'>
            <Form className="div-form" onSubmit={submitForm(handleSubmit)}>
              <div className="appTitle">
                <img src={Logo} alt=" Logo" />
              </div>
              <div className="form-group">
                <FormGroup>
                <Input 
                id="name"
                type="text"
                  className="form-control"
                  name="name"
                  placeholder="Enter your name.."
                  {
                    ...register("name")
                    }
                    onChange={(e) => {
                      setValue("name", e.target.value);
                      trigger("name");
                    }
                    }
  
                
                  
                ></Input></FormGroup>
                <p className="error" >{errors.name?.message}</p>
                </div>
              <div className="form-group">
                <Input type="email"
                  className="form-control"
                  name="email"
                  placeholder="Enter your email.."
                  {
                    ...register("email")
                    }
                    onChange={(e) => {
                      setValue("email", e.target.value);
                      trigger("email");
                    }
                    }
  
                ></Input><p className="error" >{errors.email?.message}</p>

              </div>

              <div className="form-group">
                <Input type="password"
                  className="form-control"
                  name="password"
                  placeholder="Enetr your password"
                  {
                    ...register("password")
                    }
                    onChange={(e) => {
                      setValue("password", e.target.value);
                      trigger("password");
                    }
                    }
  
                ></Input>
                <p className="error" >{errors.password?.message}</p>

              </div>

              <div className="form-group">
                <Input type="password"
                  className="form-control"
                  name="confirmpassword"
                  placeholder="Confirm your password.."
                  {
                    ...register("confirmpassword")
                    }
                    onChange={(e) => {
                      setValue("confirmpassword", e.target.value);
                      trigger("confirmpassword");
                    }
                    }
  
                ></Input><p className="error" >{errors.confirmpassword?.message}</p>

              </div>
              <div><Button className="button" color="primary"
              > Register</Button></div>
            </Form>



          </Col>
        </Row>
       {/* <Row>
          <Col md={6}> List of User
            <table>
              <tbody>{userList.map((users) => (
                <tr key={users.email}>
                  <td>{users.name}</td>
                  <td>{users.email}</td>
                  <td>{users.password}</td>
                  <td><Button onClick={()=>handleDelete(users.email)}>Delete</Button></td>
                  <td><Button onClick={()=>handleUdate(users.email)}>Update</Button></td>

                </tr>
               

              ))}
               
              
              
              
              
              </tbody>
            </table>


          </Col>
        </Row>*/}

      </Container>
    </div>
  );
};

export default Register;

