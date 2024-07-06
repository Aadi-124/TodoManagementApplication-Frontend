
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import './forgotpass.css';
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { forgotPasswordAPI } from "../API/APIService";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Send } from "@mui/icons-material";
export default function ForgotPass() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('send OTP');
  const [disabled,setDisabled] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState = { errors }
  } = useForm();


  const onSubmit = () => {
    setLoading(true);
    setText('Sending...');
    setDisabled(true);
    forgotPasswordAPI({ email: getValues("email") })
      .then((response) => {
        console.log(response.status);
        if (response.status == 200) {
          console.log(response.status);
          const user = {
            name: response.data,
            email: getValues("email"),
            otp: null,
            purpose: "forgot"
          }
          navigate(`/forgot-otp`, { state: user });
          
          //   navigate(`/forgot-otp/${getValues("email")}`)
        } else if(response.status == 500){
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
              text:'Check your Internet Connection or try after sometime'
            })
          })()
          setLoading(false);
          setText('Send OTP');
          setDisabled(false);
          
        } else if(response.status == 400) {
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
              title: 'User Not Found',
              text:'No registered user found with this email'
            })
          })()
          setLoading(false);
          setText('Send OTP');
          setDisabled(false);
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
                title: 'Error',
                text:'Something went wrong try after sometime'
              })
            })()
            setLoading(false);
            setText('Send OTP');
            setDisabled(false);
          }
      })
      .catch((error)=>{
        if(error.response.status == 400){
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
              title: 'User Not Found',
              text:'No registered user found with this email'
            })
          })()
          setLoading(false);
          setText('Send OTP');
          setDisabled(false);
        } else if(error.response.status == 500) {
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
              text:'Please Check your Internet Connection!'
            })
          })()
          setLoading(false);
          setText('Send OTP');
          setDisabled(false);
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
                title: 'Error',
                text:'Something went wrong try after sometime'
              })
            })()
            setLoading(false);
            setText('Send OTP');
            setDisabled(false);
          } 

        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: 'top-right',
        //   iconColor: 'white',
        //   customClass: {
        //     popup: 'colored-toast',
        //   },
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        // });
        // (async () => {
        //   await Toast.fire({
        //     icon: 'error',
        //     title: 'Network Error',
        //     text:'Plaease check your Internet Connection!'
        //   })
        // })()
        // setLoading(false);
        // setText('Send OTP');
        // setDisabled(false);


        
        
      })
  }


  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="forgotContainer">

      <div className="headContainer">

        <h1 className="forgotheading">
          Enter your Email
        </h1>
      </div>


        <div className="username" >
          <TextField style={{ "width": "40vh" }} {...register("email")} className="inp" type="email" id="outlined-basic 2" label="Enter Email" variant="outlined" required />
        </div>

        <div className="submitContainer">
          <div>

          <LoadingButton
            color="success"
            type='submit'
            loading={loading}
            loadingPosition="start"
            variant="contained"
            startIcon={<Send />}
            id='regbtn'
            className='inpforpass'
            style={{ "padding": "9.5px 15px" }}
            >
            <span>{text}</span>
          </LoadingButton>
            </div>

            <div>
          {/* <Button style={{"margin":"50px"}} className="inp" type="submit" variant='contained' color='success'>send OTP</Button> */}
          <Button style={{ "padding": "10px 30px" }} id="cancelbtn" onClick={() => { navigate("/login") }} disabled={disabled} variant='contained' color="error">Cancel</Button>
            </div>
        </div>
        </div>
      </form>
    </>
  );
}