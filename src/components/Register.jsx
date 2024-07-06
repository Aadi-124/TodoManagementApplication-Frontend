
import * as React from 'react';
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import './Register.css';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OTPAPI, adminOTP, checkEmail } from '../API/APIService';
import Swal from 'sweetalert2';
import HowToRegIcon from '@mui/icons-material/HowToReg';
// import './dayjs/locale/{localeUsed}';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';
import './Todos.css';
import Auth from '../security/AuthContext';



export default function Register() {


  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [Text,setText] = useState('Register');
  const [pass, setPass] = useState(true);
  const [passlen,setPasslen] = useState(true);
  const [name, setName] = useState(true);
  const [phone, setPhone] = useState(true);
  const [dob, setDob] = useState(true);
  const [role,setRole] = useState('');
  const Authentication = Auth();


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState = { errors }
  } = useForm();

  const handleRole = (event) =>{
    setRole(event.target.value);
  }

  const onSubmit = () => {
    console.log("Submitted!");
    if (getValues("name").length <= 20 && getValues("name").length >= 3) setName(true); else {setName(false); return false;}
    if (getValues("phone").length == 10) setPhone(true); else {setPhone(false);  return false;}
    if (getValues("pass").length >= 8) setPasslen(true); else {setPasslen(false);  return false;}
    if (getValues("pass") == getValues("cpass")) setPass(true); else {setPass(false);  return false;}
    let date = getValues("dob").split("/");
    if (new Date().getFullYear() - date[2] >= 18) setDob(true); else {setDob(false);  return false;}
    setLoading(true);
    setText('Registering...');
    
    console.log("Submitted! After Error");
    console.log("name && phone && pass && dob = "+name && phone && pass && dob);
    // if(name && phone && pass && dob){

      Authentication.setProcess(true);
      checkEmail(getValues('email'))
      .then((response)=>{
        if(!response.data){
          if(getValues('role') == "ADMIN"){
            const credentials = {code:"827580"}
              adminOTP(credentials).then((response)=>{
                console.log(response);
                if(response.data){
                  const user = {
                    name:getValues("name"),
                    password:getValues("pass"),
                    role:getValues("role"),
                    email:getValues("email"),
                    phone:getValues("phone"),
                    dob:getValues("dob"),
                    profilepic:getValues("profilepic"),
                    otp:null,
                    adminReg:true,
                    userReg:false
                  }
                    navigate('/adminregistrationotp',{state:user});
                 
                    return;
                } else {
                  const Toast = Swal.mixin({
                    toast: true,
                    position: "top",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: false,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: " Netwrok Error Please try after some time!"
                });
                  setLoading(false);
                  setText("Register");
                console.log("Failed!");
                  return;
                }

              })
              .catch((error)=>{
                console.log(error)
                const Toast = Swal.mixin({
                  toast: true,
                  position: "top",
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: false,
                  didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                  }
              });
              Toast.fire({
                  icon: "error",
                  title: " SERVER ERROR!"
              });
                navigate('/notauthorized');
                return;
              })
          } else {

          OTPAPI({email:getValues("email")})
          .then((response)=>{
            console.log(response.data)
            if(response.data){
              const user = {
                name:getValues("name"),
                password:getValues("pass"),
                role:getValues("role"),
                email:getValues("email"),
                phone:getValues("phone"),
                dob:getValues("dob"),
                profilepic:getValues("profilepic"),
                otp:null,
                purpose:"Registration",
                adminReg:false,
                userReg:true
              }
              
              navigate(`/registration-otp`,{state:user});
              return true;
            } else {
              const Toast = Swal.mixin({
                toast: true,
                position: 'top-right',
                iconColor: 'white',
                customClass: {
                  popup: 'colored-toast',
                },
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
              });
      
              (async () => {
                await Toast.fire({
                  icon: 'error',
                  title: 'Network Error',
                  text:'Plaease check your Internet Connection!'
                })
              })()
              setLoading(false);
              setText(Register);
            }
          })
          .catch((error)=>{
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-right',
              iconColor: 'white',
              customClass: {
                popup: 'colored-toast',
              },
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
            });
    
            (async () => {
              await Toast.fire({
                icon: 'error',
                title: 'Network Error',
                text:'Plaease check your Internet Connection!'
              })
            })()
    
    
            setLoading(false);
            setText('Register');
          });
        }
        } else {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast',
            },
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
          });
  
          (async () => {
            await Toast.fire({
              icon: 'error',
              title: 'Registration Error',
              text:'User is already registered with this email try another one!'
            })
          })()
          setLoading(false);
          setText('Register');
        }
      })
      .catch((error)=>{
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-right',
          iconColor: 'white',
          customClass: {
            popup: 'colored-toast',
          },
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        (async () => {
          await Toast.fire({
            icon: 'error',
            title: 'Registration Error',
            text:'Some Error Occured! Please try after sometime'
          })
        })()
        setLoading(false);
        setText('Register');
      });
      
    // } else {
      
    //   const Toast = Swal.mixin({
    //     toast: true,
    //     position: 'top-right',
    //     iconColor: 'white',
    //     customClass: {
    //       popup: 'colored-toast',
    //     },
    //     showConfirmButton: false,
    //     timer: 3000,
    //     timerProgressBar: true,
    //   });

    //   (async () => {
    //     await Toast.fire({
    //       icon: 'error',
    //       title: 'Registration Error',
    //       text:'Some Error Occured! Please try after sometime'
    //     })
    //   })()
    //   setLoading(false);
    //   setText('Register');

    // }
    
  }

  const run = () =>{
    console.log(getValues("dob"))
  }

  const [loading, setLoading] = useState(false);

  return (
    <>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
    <div className='formcontainer'>

          <div id='Regheading'>

            {/* Heading */}
            <p className='heading'>Register</p>

          </div>
        <div className="Regcontainer">

          <div className='subcontainer'>

            <div>


              {/* NAME */}
              <TextField className="outlined-basic txt_fields" id='name' type="text" {...register("name")} label="Name" variant="outlined" required />
              {!name && <label htmlFor="name" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*User Name must in between 3 to 20 letters</label>}
              <br />
              <br />
            </div>
            <div>


              {/* ROLE */}
              <Box className="txt_fields">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    {...register("role")}
                    label="Role"
                    onChange={handleRole}
                    value={role}
                    required
                  >
                    <MenuItem value={"ADMIN"}>ADMIN</MenuItem>
                    <MenuItem value={"USER"}>USER</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <br />
            </div>
            <div>

              {/* PASSWORD */}
              <FormControl className="txt_fields" variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  {...register("pass")}
                  required
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <br />
              <br />
            </div>

            {/* PASSWORD */}
            <div>
              <TextField className="outlined-basic txt_fields" id='cpass' type="password" {...register("cpass")} label="Confirm Password" variant="outlined" required />
              {!pass && <label htmlFor="cpass" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*Password Doesn't Match </label>}
              {!passlen && <label htmlFor="cpass" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*Passoword is too Short! </label>}
              <br />
              <br />
            </div>
          </div>

          <div className='subcontainer'>

            {/* EMAIL */}
            <div>
              <TextField className="outlined-basic txt_fields" type="email" {...register("email")} label="Email" variant="outlined" required />
              <br />
              <br />
            </div>

            {/* PHONE */}
            <div>
              <TextField className="outlined-basic txt_fields" id='phone' type="number" {...register("phone")} label="Phone" variant="outlined" required />
              {!phone && <label htmlFor="phone" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*Incorrect Phone Number </label>}
              <br />
              <br />
            </div>


            {/* DOB */}
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField id='date' className='txt_fields' format='DD/MM/YYYY' {...register("dob")} label="Date Of Birth" required/>
                </DemoContainer>
              </LocalizationProvider>
              {!dob && <label htmlFor="date" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*User Should be Above 18 </label>}
              <br />
            </div>

            {/* PROFILE PIC */}
            <div>
              <TextField className="outlined-basic txt_fields" type="text" {...register("profilepic")} label="ProfilePic" variant="outlined"required />
              <br />
              <br />
            </div>
        </div>

          </div>

          <div id='Regsubmit'>
            {/* SUBMIT BUTTON! */}
                    <LoadingButton
                  color="primary"
                  type='submit'
                  loading={loading}
                  loadingPosition="start"
                  variant="contained"
                  id='regbtn'
                  startIcon={<HowToRegIcon/>}
                >
                  <span>{Text}</span>
                </LoadingButton>
   
            {/* <Button variant="contained" id='regbtn' type="submit">Register</Button> */}
           
          </div>

    </div>
      </form>






    </>
  );


}