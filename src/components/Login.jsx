import { useState } from "react";
import { useNavigate, useNavigation } from "react-router-dom";
import Auth from "../security/AuthContext";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import './login.css';
import Swal from 'sweetalert2';
import { BasicAuthentication, loginAPI } from "../API/APIService";
import VpnKeySharpIcon from '@mui/icons-material/VpnKeySharp';
import { LoadingButton } from "@mui/lab";
import Link from '@mui/material/Link';
import { RepeatOneSharp } from "@mui/icons-material";


function ShowSuccess(istrue) {



    if (istrue) {
        return <h1>Authentication Successfull!</h1>
    }
    return null;
}


function ShowError(istrue) {
    if (istrue) {
        return <h1>Authentication Failed!</h1>
    }
    return null;
}


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const Authentication = Auth();

    function handleUserName(event) {
        setUsername(event.target.value);
    }
    function handlePassword(event) {
        setPassword(event.target.value);
    }

    function showMessage(){

        if(Authentication.isAuthenticated){
            console.log("Authenticacated!");
        } else {
            console.log("NOT AUTHENTICATED");
        }

        if (Authentication.isAuthenticated) {
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
            icon: "success",
            title: "Signed in successfully"
            });
            console.log(Authentication.role == "ADMIN" && Authentication.isAuthenticated)
            console.log(Authentication.role == "USER" && Authentication.isAuthenticated);
            if(Authentication.role == "ADMIN" && Authentication.isAuthenticated){
                navigate(`/Sample`);
                return;
            } else if(Authentication.role == "USER" && Authentication.isAuthenticated){
                navigate("/Sample");
                return;
            }

            navigate("/notauthorized");
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
            title: "Incorrect Username or Password"
        });
        setLoading(false);
        setText('Log in');
    }
}
const setContext = (response)=>{
        Authentication.setAuthenticate(response.data.authenticated);
        Authentication.setRole(response.data.role);
        Authentication.setToken(response.data.authToken);
        Authentication.setUserid(response.data.userid);
        Authentication.setUsername(response.data.username);
}


    function Authenticate(){

        if (username == "" && password == "") {
            return;
        }

        setLoading(true);
        setText('Logging in....');

        const uname = username
        const credentials = {
            username: uname,
            password: password
        }




        loginAPI(credentials).then((response)=>{setContext(response)}).catch((error)=>{});
        
        loginAPI(credentials)
            .then((response) => {
                setContext(response);
                console.log(response); 

                if(response.data.authenticated){
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
                                icon: "success",
                                title: "Signed in successfully"
                                });  
                                navigate("/welcome");
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
                                title: "Incorrect Username or Password"
                            });
                            setLoading(false);
                            setText('Log in');

                }
        
            //     if (Authentication.isAuthenticated) {
            //         const Toast = Swal.mixin({
            //         toast: true,
            //         position: "top",
            //         showConfirmButton: false,
            //         timer: 3000,
            //         timerProgressBar: false,
            //         didOpen: (toast) => {
            //             toast.onmouseenter = Swal.stopTimer;
            //             toast.onmouseleave = Swal.resumeTimer;
            //         }
            //     });
            //     Toast.fire({
            //         icon: "success",
            //         title: "Signed in successfully"
            //         });
            //         console.log(Authentication.role == "ADMIN" && Authentication.isAuthenticated)
            //         console.log(Authentication.role == "USER" && Authentication.isAuthenticated);
            //         if(Authentication.role == "ADMIN" && Authentication.isAuthenticated){
            //             navigate(`/Sample`);
            //             return;
            //         } else if(Authentication.role == "USER" && Authentication.isAuthenticated){
            //             navigate("/Sample");
            //             return;
            //         }
        
            //         navigate("/notauthorized");
            // } else {
        
            //     const Toast = Swal.mixin({
            //         toast: true,
            //         position: "top",
            //         showConfirmButton: false,
            //         timer: 3000,
            //         timerProgressBar: false,
            //         didOpen: (toast) => {
            //             toast.onmouseenter = Swal.stopTimer;
            //             toast.onmouseleave = Swal.resumeTimer;
            //         }
            //     });
            //     Toast.fire({
            //         icon: "error",
            //         title: "Incorrect Username or Password"
            //     });
            //     setLoading(false);
            //     setText('Log in');
            // }


                    // console.log(Authentication.role == "ADMIN" && Authentication.isAuthenticated)
                    // console.log(Authentication.role == "USER" && Authentication.isAuthenticated);
                    // if(Authentication.role == "ADMIN" && Authentication.isAuthenticated){
                    //     navigate(`/Sample`);
                    //     return;
                    // } else if(Authentication.role == "USER" && Authentication.isAuthenticated){
                    //     navigate("/Sample");
                    //     return;
                    // }
                    // navigate("/welcome");
            })
            .catch((error) => {
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
                    title: "Incorrect Username or Password"
                });
                setLoading(false);
                setText('Log in');
            })
    }






    const forgotpassword = () =>{
        Authentication.setProcess(true);
        navigate('/forgotpassword');
    }

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Login');

    return (
        <form onSubmit={() => { event.preventDefault() }}>
            <div style={{ height: '100vh' }} className="outerdiv">
                <div className="login_container">
                    <div >
                        <h1 className="heading">
                            Login
                        </h1>
                    </div>



                    {success && <div><h1>Authentication Successfull!</h1> </div>}
                    {error && <div> <h1>Authentication Failed!</h1></div>}



                    <div className="username">
                        <TextField className="inptxt" id="outlined-basic 2" label="User Name" variant="outlined" onChange={handleUserName} value={username} required />
                    </div>
                    <div className="password">
                        <TextField className="inptxt" id="outlined-basic" type="password" label="Password" variant="outlined" onChange={handlePassword} value={password} required />

                    </div>
                    <div>
                        <LoadingButton
                            color="primary"
                            type='submit'
                            onClick={Authenticate}
                            loading={loading}
                            loadingPosition="start"
                            variant="contained"
                            startIcon={<VpnKeySharpIcon />}
                            id='regbtn'
                        >
                            <span>{text}</span>
                        </LoadingButton>

                        {/* <Button className="inp" variant='contained' color='primary' onClick={Authenticate} type="submit">Login</Button> */}
                    </div>

                    <div>
                        <Link style={{ "margin": "30px", "cursor": "pointer" }} className="formlinks" onClick={forgotpassword}>Forgot Password?</Link>
                        <Link style={{ "margin": "30px", "cursor": "pointer" }} className="formlinks" onClick={() => { navigate("/register") }}> Register </Link>
                    </div>


                </div>
            </div>
        </form>
    );
}






export default Login;