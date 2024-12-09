import * as yup from 'yup';
export const userValidationsSchema=yup.object().shape({
    name:yup.string().required("Name is required.."),
    email:yup.string().email("Not valid email format").required("email is requied.."),
    password:yup.string().min(4).max(20).required("password is required.."),
    confirmpassword:yup.string().oneOf([yup.ref('password'),null],"Password not match..").required(),
});