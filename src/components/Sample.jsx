import { checkAdminAuthority, checkEmail, checkUserAuthority } from "../API/APIService";
import { Button } from "@mui/material";
import Auth from "../security/AuthContext";
import { BarLoader } from 'react-spinners';
import './Sample.css';
import React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import UpdateIcon from '@mui/icons-material/Update';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AddIcon from '@mui/icons-material/Add';
export default function Sample() {

  const [loading, setLoading] = React.useState(false);
  const [updateText,setUpdateText] = React.useState("update");
  function handleClick() {
    setLoading(true);
    setUpdateText("Updating...");
  }
  function handlestop() {
    setLoading(false);
    setUpdateText("Update");
  }




  // const checkAccess = () =>{
  //   checkAuthority(token)
  //   .then((response)=>{
  //     console.log(response);
  //   })
  //   .catch((error)=>{
  //     console.log(error);
  //   })
  // }







  return (
    <>
      <LoadingButton
        type="submit"
        loading={loading}
        onClick={handleClick}
        endIcon={<UpdateIcon />}
        loadingPosition="end"
        variant="contained"
        style={{ fontWeight: "bolder", margin: "30px" }}
        color="success"

      >
        <span>{updateText}</span>
      </LoadingButton>
      <LoadingButton
        type="submit"
        onClick={handlestop}
        variant="contained"
        style={{ fontWeight: "bolder", margin: "30px" }}
        color="success"

      >
        <span>Stop Loading</span>
      </LoadingButton>
    </>
  );
}