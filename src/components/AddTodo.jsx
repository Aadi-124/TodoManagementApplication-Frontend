import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import { addTodoAPI } from "../API/APIService";
import Auth from "../security/AuthContext";
import { addUserTodo } from "../API/APIService";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import './Todos.css';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import SendIcon from '@mui/icons-material/Send';

import AddCircleIcon from '@mui/icons-material/Add';
import React from "react";

export default function AddTodo() {

    const Authentication = Auth();
    const token = Authentication.token;
    const navigate = useNavigate();
    const { id } = useParams();
    const [description, setDesription] = useState('');
    const [date, setDate] = useState('');
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState = { errors }
    } = useForm();


    const onSubmit = () => {

        setLoading(true);
        const todo = {
            userid: Authentication.userid,
            description: getValues("tododescription"),
            isDone: false,
            targetedDate: getValues("targeteddate"),
            like: 0,
            dislike: 0,
            createdDate: Date.now(),
            userName:Authentication.username
        }

        addUserTodo(token,todo)
            .then(() => {
                Swal.fire({
                    title: 'Todo Added Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((response) => {
                    if (response.isConfirmed) {
                        navigate("/table");
                    }
                })
            })
            .catch(() => {
                setLoading(false);
                Swal.fire({
                    title: 'Todo Not Added!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                }).then((response) => {
                })
            });

        //     addTodoAPI(todo)
        //     .then(()=>{
        //     Swal.fire({
        //         title: 'Todo Added Successfully!',
        //         icon: 'success',
        //         confirmButtonText: 'OK'
        //     }).then((response)=>{
        //         if(response.isConfirmed){
        //             navigate("/table");
        //         }
        //     })
        // })
        //     .catch(()=>{
        //         Swal.fire({
        //             title: 'Updated!',
        //             icon: 'success',
        //             confirmButtonText: 'OK'
        //         }).then((response)=>{
        //             if(response.isConfirmed){
        //                 navigate("/table");
        //             }
        //         })
        //     })



    }

    const handleOnChange = (event) => {
        setDesription(event.target.value);
    }


    const cancel = () => {
        navigate("/table");
    }

    const [loading, setLoading] = React.useState(false);
    function handleClick() {
      setLoading(true);
    }
  


    return (
        <>

            <center>
            <br /><br /><br /><br />
                <h1 className="heading">Add Todos</h1>
            <br /><br /><br /><br />
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="addtodoContainer">

                    <div className="addtodoinpContainer">
                        <TextField style={{"width":"100%"}} label="Description" id="outlined-basic" onChange={handleOnChange}  {...register("tododescription")} variant="outlined" />
                        <LocalizationProvider dateAdapter={AdapterDayjs} style={{"width":"100%"}}>
                            <DemoContainer components={['DateField']}>
                            <DateField id='date' className='txt_fields' format='DD/MM/YYYY' {...register("targeteddate")} label="Targeted Date" required/>
                            
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className="addtodosubContainer">
                    <Button variant="contained" onClick={cancel} style={{ fontWeight: "bolder", margin: "30px" }} color="error">Cancel</Button>
                    {/* <Button variant="contained" type="submit" style={{ fontWeight: "bolder", margin: "30px" }} color="success">Add Todo</Button> */}
                    <LoadingButton
                        type="submit"
                        loading={loading}
                        endIcon={<AddCircleIcon/>}
                        loadingPosition="end"
                        variant="contained"
                        style={{ fontWeight: "bolder", margin: "30px" }}
                        color="success"
                        
                        >
                        <span>Add Todo</span>
                    </LoadingButton>
                    </div>
                    </div>
                </form>
            </center>
        </>
    );
}