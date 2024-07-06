
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '@fontsource/roboto/300.css';
import { Button } from '@mui/material';
import { deleteTodoAPI,getUserTodo,retrieveTodos} from '../API/APIService';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Btn.css';
import { setIsDoneAPI } from '../API/APIService';
import Swal from 'sweetalert2';
import Auth from '../security/AuthContext';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import './Sample.css';
import Box from '@mui/material/Box';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import OfflinePinIcon from '@mui/icons-material/OfflinePin';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));


const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



export default function CustomizedTables() {

  const [todos, setTodos] = useState([]);

  const navigate = useNavigate();
  const Authentication = Auth();
  const token = Authentication.token;

  const setIsDone = (id) => {
    setIsDoneAPI(token,id)
      .then(() => {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Task Completed!"
        });
        refresh();
      }).catch(() => {

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "Error",
          title: "Some Error Occured!"
        });
        refresh();
      })
  }

  useEffect(() => refresh(), [])
  function refresh() {
    retrieveTodos(token)
      .then((response) => {
        console.log(response.data);
        setTodos(response.data) })
      .catch((error) => {})
      .finally(() => {})
  }

  const deleteTodo = (todoid) => {
    const todo = {
      id:todoid,
      description:null
    }
    deleteTodoAPI(token,todo).then((response)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "success",
        title: "Deleted Successfully!"
      });
      refresh();
    })
    .catch((error)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Some Error Occured!"
      });
      refresh();
    });
    refresh();
    refresh();
    refresh();
  }



  const updateTodo = (todoid,tododescription,todotargeteddate) => {
    const data = {
      id:todoid,
      description:tododescription,
      targetedDate:todotargeteddate,
      showalltodo:true
    }

    navigate(`/updatetodo/`,{ state: data });
  }

  const setDone = (todoid)=>{
    const todo = {
      id:todoid
    }
    setIsDoneAPI(token,todo).then((response)=>{
      if(response.data){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-right",
          showConfirmButton: false,
          timer: 2000,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Task Completed!"
        });
        refresh();
      }
    })
    .catch((error)=>{
      const Toast = Swal.mixin({
        toast: true,
        position: "top-right",
        showConfirmButton: false,
        timer: 2000,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: "Couldn't mark as Done!"
      });
      refresh();
    });
  }



  return (
    <>

<center>
      <br /><br /><br />  
        <h1 className='heading'>TODOs</h1>

        <Box className="cardcontainer">



              {todos.map((todo) => (


                
<CardContent  className='cards'  key={todo.id}>
      <Typography color="red"  fontWeight={'bolder'} gutterBottom>
      Targeted Date : {todo.targetedDate}
      </Typography>
      <Typography variant="h5" fontSize={'15px'} component="div">
      Todo ID: {todo.id}
      </Typography>
      <Typography variant="h5" fontSize={'15px'} component="div">
      User ID: {todo.userid}
      </Typography>
      <Typography variant="h5" fontSize={'15px'} component="div">
      User Specific ID: {todo.userspecifictodoid}
      </Typography>

{
  todo.isDone && 
  <Typography style={{"color":"green","font-weight":"bolder","font-size":"20px"}}>
    <div>
    Done <OfflinePinIcon/>
    </div>
      </Typography>
}

{
  !todo.isDone && 
  <Typography style={{"color":"red","font-weight":"bolder","font-size":"20px"}}>
    Done <UnpublishedIcon/>
      </Typography>
}


      
      <Typography variant="body2">
        <div style={{"height":"70px"}}>
      <p>{todo.description}
    </p></div>
      <Button variant='contained' color='error' onClick={() => deleteTodo(todo.id)} style={{ fontWeight: 'bolder', margin: '5px' }}>Delete</Button>
      <Button variant='contained' color='warning' onClick={() => updateTodo(todo.id,todo.description,todo.targetedDate)} style={{ fontWeight: 'bolder', margin: '5px', backgroundColor: "rgb(220, 143, 0)" }}>Update</Button>
      {!todo.isDone && <Button variant='contained' color='success' onClick={()=>{setDone(todo.id)}} style={{ fontWeight: 'bolder', margin: '5px' }}>Done</Button>}   
      </Typography>
    </CardContent>
                // <StyledTableRow key={todo.id}>
                //   <StyledTableCell component="th" align='center' scope="row">{todo.userspecifictodoid}</StyledTableCell>
                //   <StyledTableCell align="center">{todo.description}</StyledTableCell>
                //   <StyledTableCell align="center">{todo.isDone && 'Done'}{!todo.isDone && 'Not Done'}</StyledTableCell>
                //   <StyledTableCell align="center">{todo.targetedDate}</StyledTableCell>
                //   <StyledTableCell align="left">
                //     <Button variant='contained' color='error' onClick={() => deleteTodo(todo.id)} style={{ fontWeight: 'bolder', margin: '5px' }}>Delete</Button>
                //     <Button variant='contained' color='warning' onClick={() => updateTodo(todo.id,todo.description,todo.targetedDate)} style={{ fontWeight: 'bolder', margin: '5px', backgroundColor: "rgb(220, 143, 0)" }}>Update</Button>
                //     {!todo.isDone && <Button variant='contained' color='success' onClick={()=>{setDone(todo.id)}} style={{ fontWeight: 'bolder', margin: '5px' }}>Done</Button>}
                //   </StyledTableCell>
                // </StyledTableRow>
                ))}
      </Box>
      <br />
          <br />
          <br />
          <br />
          <br />
          <br />
      </center>




      {/* <Button onClick={refresh} variant='contained' color='secondary' style={{ fontWeight: 'bolder', margin: '30px' }}>Refresh Todos</Button>
      <center>
        <h1>TODOs</h1>

        <TableContainer>
          <Table sx={{ width: "100%", overflowX: 'auto' }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align='center' style={{ fontSize: "30px", fontFamily: "monospace", width: '10%' }}  >ID</StyledTableCell>
                <StyledTableCell align='center' style={{ fontSize: "30px", fontFamily: "monospace", width: '10%' }}  >User ID</StyledTableCell>
                <StyledTableCell align='center' style={{ fontSize: "30px", fontFamily: "monospace", width: '10%' }}  >Todo No.</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "30px" }} width={'20%'} >Description</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "30px" }} width={'20%'} >isDone</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "30px" }} width={'20%'} >Targated Date</StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "30px" }} width={'30%'} >Functionality</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <StyledTableRow key={todo.id}>
                  <StyledTableCell component="th" align='center' scope="row">{todo.id}</StyledTableCell>
                  <StyledTableCell component="th" align='center' scope="row">{todo.userid}</StyledTableCell>
                  <StyledTableCell component="th" align='center' scope="row">{todo.userspecifictodoid}</StyledTableCell>
                  <StyledTableCell align="center">{todo.description}</StyledTableCell>
                  <StyledTableCell align="center">{todo.isDone && 'Done'}{!todo.isDone && 'Not Done'}</StyledTableCell>
                  <StyledTableCell align="center">{todo.targetedDate}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Button variant='contained' color='error' onClick={() => deleteTodo(todo.id)} style={{ fontWeight: 'bolder', margin: '5px' }}>Delete</Button>
                    <Button variant='contained' color='warning' onClick={() => updateTodo(todo.id,todo.description,todo.targetedDate)} style={{ fontWeight: 'bolder', margin: '5px', backgroundColor: "rgb(220, 143, 0)" }}>Update</Button>
                    {!todo.isDone && <Button variant='contained' color='success' onClick={()=>{setDone(todo.id)}} style={{ fontWeight: 'bolder', margin: '5px' }}>Done</Button>}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <br />
          <Button variant='contained' className='addbtn' color='primary' onClick={() => navigate("/addtodo")}>Add todo</Button>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </TableContainer>
      </center> */}
    </>
  );
}   