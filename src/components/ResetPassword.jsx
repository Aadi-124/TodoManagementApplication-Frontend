import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import './resetpass.css';
import { useLocation, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../API/APIService";
import Swal from "sweetalert2";
import { LoadingButton } from "@mui/lab";
import LockResetIcon from '@mui/icons-material/LockReset';

export default function ResetPassword() {

    const [loading,setLoading] = useState(false);
    const [text,setText] = useState('Reset');
    const [disabled,setDisabled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state;
    const [showPassword, setShowPassword] = useState(false);
    const [pass, setPass] = useState(true);
    const [passlen, setPasslen] = useState(true);
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState = { errors }
    } = useForm();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmit = () => {
        if (getValues("pass") == getValues("cpass")) setPass(true); else { setPass(false); return false; }
        if (getValues("pass").length >= 8) setPasslen(true); else {setPasslen(false);  return false;}
        setLoading(true);
        setDisabled(true);
        setText('Resetting...');
        resetPasswordAPI({ username: data.name, password: getValues("pass"), email: data.email })
            .then((response) => {
                if (response.data) {
                    Swal.fire({
                        title: "Success!",
                        text: "Password Reset Successfull",
                        icon: "success"
                    });
                    navigate("/login");
                } else {
                    Swal.fire({
                        title: "Error!",
                        text: "Password Reset Failed!",
                        icon: "error"
                    });
                    setLoading(false);
                    setDisabled(false);
                    setText('Reset');

                }
            })
            .catch((error) => { 
                Swal.fire({
                    title: "Error!",
                    text: "Password Reset Failed!",
                    icon: "error"
                });
                setLoading(false);
                setDisabled(false);
                setText('Reset'); 
            })
    }

    const cancel = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to cancel the Reset Process?",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "NO",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, cancel it!"
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/login");
            }
        });
    }

    return (
        <>
            <div className="mainContainer">

                <h1 className="resetheading">Reset Password</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="resetContainer">
                        <div className="inputcontainer subcontainer">

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

                            {/* PASSWORD */}
                            <TextField className="outlined-basic txt_fields" id='cpass' type="password" {...register("cpass")} label="Confirm Password" variant="outlined" required />
                            {!pass && <label htmlFor="cpass" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*Password Doesn't Match </label>}
                            {!passlen && <label htmlFor="cpass" style={{ "color": "red", "display": "block", "fontFamily": "Roboto" }}>*Passoword is too Short! </label>}
                            <br />
                            <br />
                        </div>
                        <div className="submitcontainer subcontainer">
                            <LoadingButton
                                color="success"
                                type='submit'
                                loading={loading}
                                loadingPosition="start"
                                variant="contained"
                                className='inp'
                                startIcon={<LockResetIcon/>}
                            >
                                <span>{text}</span>
                            </LoadingButton>
                            {/* <Button style={{ "margin": "20px" }} className="inp" type="submit" variant='contained' color='success'>Reset Password</Button> */}
                            <Button disabled={disabled} className="inp" onClick={cancel} variant='contained' color="error">Cancel</Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}