
import { useParams } from "react-router-dom";
import { retrieveTodo, updateTodoAPI } from "../API/APIService";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { DatePicker } from "@mui/x-date-pickers";
import Swal from 'sweetalert2'
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { useLocation } from "react-router-dom";
import './updateTodos.css';
import Auth from "../security/AuthContext";

export default function UpdateTodos(){

    const Authenticaion = Auth();
    const token = Authenticaion.token;
    const location = useLocation();
    const data = location.state;
    // const [value, setV] = useState(dayjs(''));
    const navigate = useNavigate();
    const {id,index} = useParams();
    const [description,setDesription] = useState('');
    const [date,setDate] = useState('');
    // const [todo,setTodo] = useState({});
    const [isDone,setIsDone] = useState(false);
    const{
        register,
        handleSubmit,
        setValue,
        getValues,
        formState = {errors}
    } = useForm();

    useEffect(() => {
            setValue("tododescription",data.description);
    }, [description]);




    
    // useEffect(()=>{
    //     retrieveTodo(id)
    //     .then((response) => 
    //     {
    //         setDesription(response.data.description)
    //         setDate(response.data.date)
    //     })
    //     .catch((error) => {})
    //     .finally(() => {})
    // },[])
    

   

    const onSubmit = ()=>{
       
        // console.log("Submitted Data = "+data);
        // console.log("id = "+id);
        // console.log("data.description = "+getValues("tododescription"));
        // console.log("data.tododate = "+getValues("tododate"));
        // console.log("isDone = "+isDone);
        // console.log("data.toString() = "+data.toString());
        // setTodo({ id:id,
        //     description:getValues("tododescription"),
        //     date:getValues("tododate"),
        //     isDone:false});
            const todo = { 
                id:data.id,
                description:getValues("tododescription"),
                targetedDate:getValues("targeteddate"),
                isDone:false}
                updateTodoAPI(token,todo)
                .then((response)=>{
                    Swal.fire({
                        title: 'Updated!',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((response)=>{
                        if(response.isConfirmed){
                            if(data.showalltodo){navigate("/showalltodo");} else {navigate("/table")}
                            
                        }
                    })
                })
                .catch((error)=>{
                    Swal.fire({
                        title: 'Not Updated!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    }).then((response)=>{
                        if(response.isConfirmed){
                            navigate("/table");
                        }
                    })
                })
                .finally(()=>{})
                 
                // navigate("/table")
            
    }

    const handleOnChange = (event) => {
        setDesription(event.target.value);
    }
 
    
    const cancel = () =>{
        navigate("/table");
    }


    return(
        <>
        <center>
            <br />
            <br />
            <br />
            <br />
            <br />
            <h1 className="heading">Update Todo</h1>
            <br />
            <br />
            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="updatemainContainer">
            <div className="updateinpContainer">

            <TextField id="outlined-basic" onChange={handleOnChange}  style={{"width":"100%"}} {...register("tododescription")} variant="outlined" label="Description"required/>
               <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DateField']}>
                  <DateField id='date' style={{"width":"100%"}} className='txt_fields' format='DD/MM/YYYY' {...register("targeteddate")} label="Targeted Date" required/>  
                </DemoContainer>
              </LocalizationProvider>
            </div>
            <div className="updatesubmitContainer">
                <Button variant="contained" style={{"width":"100%"}} onClick={cancel} color="error">Cancel</Button>
                <Button variant="contained" style={{"width":"100%"}} type="submit" color="success">Update</Button>
            </div>
                </div>
            </form>
        </center>
        </>
    );
}