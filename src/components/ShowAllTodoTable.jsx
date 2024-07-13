
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
import { deleteTodoAPI, getUserTodo, retrieveTodos } from '../API/APIService';
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
import { BarLoader } from 'react-spinners';
import AddIcon from '@mui/icons-material/Add';

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
    setIsDoneAPI(token, id)
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
        setTodos(response.data)
      })
      .catch((error) => { })
      .finally(() => { })
  }

  const deleteTodo = (todoid) => {
    const todo = {
      id: todoid,
      description: null
    }
    deleteTodoAPI(token, todo).then((response) => {
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
      .catch((error) => {
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



  const updateTodo = (todoid, tododescription, todotargeteddate) => {
    const data = {
      id: todoid,
      description: tododescription,
      targetedDate: todotargeteddate,
      showalltodo: true
    }

    navigate(`/updatetodo/`, { state: data });
  }

  const setDone = (todoid) => {
    const todo = {
      id: todoid
    }
    setIsDoneAPI(token, todo).then((response) => {
      if (response.data) {
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
      .catch((error) => {
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


  const [isLoading, setIsLoading] = useState(true);




  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Hide the loader after a simulated delay
    }, 3000); // Replace 2000 with your expected loading time
  }, []);


  const [backgroundColor, setBackgroundColor] = useState(generateRandomColor());

  function generateRandomColor() {
    // Function to generate a random hex color code (example)
    return "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }







  return (
    <>

      <div>
        {isLoading ? (
          <div className='loader_container'>
            <BarLoader className='loader' height={5} width={300} color={"green"} />
          </div>

        ) : (


          <center>
           
           <div className='todo_add_button button-80' onClick={()=>navigate("/addtodo")}>
        <AddIcon style={{ fontSize: "70px", color:"white" }} />
      </div>


            <br /><br /><br />
            <h1 className='heading'>TODOs</h1>

            <Box className="cardcontainer" >



              {todos.map((todo) => (



                <CardContent className='cards' key={todo.id}>
                  <Typography color="red" fontWeight={'bolder'} gutterBottom>
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
                  <Typography variant="h5" fontSize={'15px'} component="div">
                    User Name: {todo.userName}
                  </Typography>

                  {
                    todo.isDone &&
                    <Typography style={{ "color": "green", "font-weight": "bolder", "font-size": "20px" }}>
                      <div>
                        Done <OfflinePinIcon />
                      </div>
                    </Typography>
                  }

                  {
                    !todo.isDone &&
                    <Typography style={{ "color": "red", "font-weight": "bolder", "font-size": "20px" }}>
                      Done <UnpublishedIcon />
                    </Typography>
                  }



                  <Typography variant="body2">
                    <div style={{ "height": "70px" }}>
                      <p>{todo.description}
                      </p></div>
                    <Button variant='contained' color='error' onClick={() => deleteTodo(todo.id)} style={{ fontWeight: 'bolder', margin: '5px' }}>Delete</Button>
                    <Button variant='contained' color='warning' onClick={() => updateTodo(todo.id, todo.description, todo.targetedDate)} style={{ fontWeight: 'bolder', margin: '5px', backgroundColor: "rgb(220, 143, 0)" }}>Update</Button>
                    {!todo.isDone && <Button variant='contained' color='success' onClick={() => { setDone(todo.id) }} style={{ fontWeight: 'bolder', margin: '5px' }}>Done</Button>}
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



        )}
      </div>
    </>
  );
}   