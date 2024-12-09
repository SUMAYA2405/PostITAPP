// import { useSelector ,useDispatch} from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useEffect ,useState} from "react";
// import { Button, Col, Container, Form, FormGroup, Input, Row ,Label} from "reactstrap";
// import User from "../Components/User";
// import { BrowserRouter as Router, useNavigate } from "react-router-dom";
// import { updateUserProfile } from "../Features/userSlice";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { userSchemaValidation } from "../Validations/UserValidations";

// const Profile = () => {
  
//   const user = useSelector((state) => state.users.user);

//   const [userName, setUserName] = useState(user.name);
//   const [pwd, setPwd] = useState(user.password);
//   const [confirmPassword, setConfirmPassword] = useState(user.password);
//   const [profilePic, setProfilePic] = useState(user.profilePic);

//   const  navigate=useNavigate();
//   const dispatch=useDispatch();
//   const {
//     register,
//     handleSubmit, 
//     formState: { errors },
//   } = useForm({
//     resolver: yupResolver(userSchemaValidation), 
//   });

//   const handleUpdate=(event)=>{
//     event.preventDefault();

//   const userData = {
//       email: user.email, // Retrieve email from the Redux store
//       name: userName, // Get the updated name from the state variable
//       password: pwd, // Get the updated password from the state variable
//       profilePic: profilePic,
//     };
//     console.log(userData);
//     dispatch(updateUserProfile(userData));
//     alert("Profile Updated.");
//     // Navigate back to the profile page after the update is completed
//     navigate("/profile");

//   }

//   const handleFileChange = (event) => {
//     // Use e.target.files[0] to get the file itself
//     const uploadFile = event.target.files[0];
//     if (!uploadFile) alert("No file uploaded");
//     else setProfilePic(event.target.files[0]);
//   };

//   //const email=useSelector((state)=>state.users.user.email);
//    useEffect(()=>{
//      if(!user.email){
//        navigate("/login");
//      }
//    }, [user.email,navigate]);

//   return (
//     <Container fluid>
//   <Row>
//             <Col md={4}>
//               Update Profile
//               <Form onSubmit={handleUpdate}>
//                 <input type="file" name="profilePic" />
//                 <div className="appTitle"></div>
//                 Update Profile
//                 <br />
//                 <input type="file" name="profilePic" onChange={handleFileChange} />
//                 <FormGroup>
//                   <Label for="name">Name</Label>
//                   <Input id="name" name="name" placeholder="Name..." type="text" 
//                   value={userName}
//                   {...register("name", {
//                     onChange: (e) => {
//                       setUserName(e.target.value);
//                     },})}
//                   />
//                 </FormGroup>
                
//                 <FormGroup>
//                   <Label for="password">Password</Label>
//                   <Input
//                     id="password"
//                     name="password"
//                     placeholder="Password..."
//                     type="password"
//                     value={pwd}
//                     {...register("password", {
//                       onChange: (e) => {
//                         setPwd(e.target.value);
//                       },
//                     })}
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Label for="confirmPassword">Confirm Password</Label>
//                   <Input
//                     id="confirmPassword "
//                     name="confirmPassword"
//                     placeholder="Confirm Password..."
//                     type="password"
//                     value={confirmPassword}
//                     {...register("confirmPassword", {
//                       onChange: (e) => {
//                         setConfirmPassword(e.target.value);
//                       },
//                     })}
//                   />
//                 </FormGroup>
//                 <FormGroup>
//                   <Button color="primary" className="button">
//                     Update Profile
//                   </Button>
//                 </FormGroup>
//               </Form>
//             </Col>
//           </Row>
//         </Container>
    

//   );
// };

// export default Profile;
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
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import User from "./User";
import { updateUserProfile } from "../Features/userSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userValidationsSchema } from "../Validations/UserValidations";

const Profile = () => {
  const user = useSelector((state) => state.users.user);

  const [userName, setUserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit, // Submit the form when this is called
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userValidationsSchema), 
  });

  const handleUpdate = (event) => {
    event.preventDefault();

   
    const userData = {
      email: user.email, 
      name: userName,
      password: pwd, 
      profilePic: profilePic,
    };
    console.log(userData);
    
    dispatch(updateUserProfile(userData));
    alert("Profile Updated.");
    // Navigate back to the profile page after the update is completed
    navigate("/");
  };

  // Function to handle file input change
  const handleFileChange = (event) => {
    // Use e.target.files[0] to get the file itself
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };

  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  return (
    <Container fluid>
      <Row>
        <Col md={3}>
          <User />
        </Col>
        <Col md={4}>
          <Form onSubmit={handleUpdate}>
            Upload Photo
            <br />
            <input type="file" name="profilePic" onChange={handleFileChange} />
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Name..."
                type="text"
                value={userName}
                {...register("name", {
                  onChange: (e) => {
                    setUserName(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                id="password"
                name="password"
                placeholder="Password..."
                type="password"
                value={pwd}
                {...register("password", {
                  onChange: (e) => {
                    setPwd(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password..."
                type="password"
                value={confirmPassword}
                {...register("confirmPassword", {
                  onChange: (e) => {
                    setConfirmPassword(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button" type="submit">
                Update Profile
              </Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
